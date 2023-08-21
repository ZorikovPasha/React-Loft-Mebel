import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { injectable, inject } from 'inversify'
import fileUpload from 'express-fileupload'

import { LoggerService } from '../logger/logger.service.js'
import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'
import { TYPES } from '../types.js'
import {
  ILoginUserDto,
  IRegisterUserDto,
  IUpdateUserDto,
  IUser,
  IUserController,
  ResponseType
} from './user.controller.interface.js'
import { AppLocalsResponseType, AppResponse } from '../app/app.controller.interface.js'
import { ImageService } from '../image.js'

const generateToken = (id: string, email: string, password: string): string | undefined => {
  const payload = {
    id,
    email,
    password
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return
  }

  return jwt.sign(payload, jwtSecret ?? '', { expiresIn: process.env.JWT_EXPIRATION })
}

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.ImageService) private imageService: ImageService
  ) {
    this.logger = logger
  }

  async collectUserData(user: IUser) {
    const getImage = async (photoId: number | null) => {
      if (!photoId) {
        return
      }
      return await prismaClient.image.findFirst({
        where: {
          id: photoId
        }
      })
    }

    const [favorites, cart, orders, image] = await Promise.all([
      prismaClient.favoriteFurniture.findMany({
        where: {
          userId: user.id
        }
      }),
      prismaClient.cart.findFirst({
        where: {
          userId: user.id
        }
      }),
      prismaClient.order.findMany({
        where: {
          userId: user.id
        }
      }),
      getImage(user.photoId)
    ])

    const cartData = cart
      ? await prismaClient.cartFurniture.findMany({
          where: {
            cartId: cart.id
          }
        })
      : []

    const ordersData = []

    for (const order of orders) {
      const productsInOrder = await prismaClient.orderedFurniture.findMany({
        where: {
          orderId: order.id
        }
      })

      ordersData.push({
        ...order,
        items: productsInOrder
      })
    }

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      street: user.street,
      house: user.house,
      apartment: user.apartment,
      image: image
        ? {
            id: image.id,
            name: image.name,
            alternativeText: image.alternativeText,
            caption: image.caption,
            width: image.width,
            height: image.height,
            hash: image.hash,
            ext: image.ext,
            size: image.size,
            url: image.url,
            mime: image.mime,
            provider: image.provider,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
          }
        : null,
      role: user.role,
      emailConfirmed: user.emailConfirmed,
      wantsToReceiveEmailUpdates: user.wantsToReceiveEmailUpdates,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      favorites: favorites.map((f) => f.furnitureId),
      orders: ordersData ? ordersData : [],
      cart: cartData
    }
  }

  async register(
    req: Request<{}, {}, IRegisterUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { userName, email, password } = req.body

      // TODO: validation result
      if (!userName) {
        return next(ApiError.badRequest('UserName was not provided'))
      }

      if (!email) {
        return next(ApiError.badRequest('Email was not provided'))
      }

      if (!password) {
        return next(ApiError.badRequest('Password was not provided'))
      }
      const candidate = await prismaClient.user.findFirst({
        where: {
          OR: [{ email: email }, { userName: userName }]
        }
      })

      if (candidate) {
        return next(ApiError.badRequest('User already exists'))
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      let savedImage
      if (req.files && req.files.photo) {
        let processedImageFromRequest: fileUpload.UploadedFile

        if (Array.isArray(req.files.photo)) {
          processedImageFromRequest = req.files.photo[0]
        } else {
          processedImageFromRequest = req.files.photo
        }

        savedImage = await prismaClient.image.create({
          data: await this.imageService.prepare(processedImageFromRequest)
        })
      }

      await prismaClient.user.create({
        data: {
          name: '',
          surname: '',
          userName,
          password: hashedPassword,
          phone: '',
          email,
          city: '',
          street: '',
          house: '',
          apartment: '',
          photoId: savedImage?.id
        }
      })
      return res.status(201).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async login(
    req: Request<{}, {}, ILoginUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { email, password } = req.body

      if (!password) {
        return res
          .status(400)
          .json({ errors: [{ field: 'password', message: 'Password was not provided' }] })
      }

      if (!email) {
        return res
          .status(400)
          .json({ errors: [{ field: 'email', message: 'Email was not provided' }] })
      }

      const user = await prismaClient.user.findFirst({
        where: {
          email: email.toLowerCase()
        }
      })

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ field: 'email', message: `User with email ${email} has not found` }] })
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ errors: [{ field: 'password', message: `Provided password is incorrect` }] })
      }

      const token = generateToken(user.id, email, password)

      return res.json({
        token: token,
        user: await this.collectUserData(user)
      })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async updateUserData(
    req: Request<{}, {}, IUpdateUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const {
        name,
        surname,
        phone,
        city,
        street,
        house,
        apartment,
        emailConfirmed,
        wantsToReceiveEmailUpdates
      } = req.body

      // type UserPropertiesNames =
      //   "id"
      //   | "name"
      //   | "surname"
      //   | "userName"
      //   | "password"
      //   | "email"
      //   | "phone"
      //   | "city"
      //   | "street"
      //   | "house"
      //   | "apartment"
      //   | "photoId"
      //   | "role"
      //   | "emailConfirmed"
      //   | "wantsToReceiveEmailUpdates"

      const set: Record<string, string | number | boolean> = {}
      // const set: (Without<UserUpdateInput, UserUncheckedUpdateInput> & UserUncheckedUpdateInput) | (Without<UserUncheckedUpdateInput, UserUpdateInput> & UserUpdateInput) = {}
      if (name !== null && typeof name !== 'undefined') {
        set.name = name
      }
      if (surname !== null && typeof surname !== 'undefined') {
        set.surname = surname
      }
      if (phone !== null && typeof phone !== 'undefined') {
        set.phone = phone
      }
      if (city !== null && typeof city !== 'undefined') {
        set.city = city
      }
      if (street !== null && typeof street !== 'undefined') {
        set.street = street
      }
      if (house !== null && typeof house !== 'undefined') {
        set.house = house
      }
      if (apartment !== null && typeof apartment !== 'undefined') {
        set.apartment = apartment
      }
      if (emailConfirmed !== null && typeof emailConfirmed !== 'undefined') {
        set.emailConfirmed = emailConfirmed
      }
      if (
        wantsToReceiveEmailUpdates !== null &&
        typeof wantsToReceiveEmailUpdates !== 'undefined'
      ) {
        set.wantsToReceiveEmailUpdates = wantsToReceiveEmailUpdates
      }

      const { image } = req.files || {}
      let savedImage

      if (image) {
        const _savedImage = await prismaClient.image.create({
          data: await this.imageService.prepare(Array.isArray(image) ? image[0] : image)
        })

        savedImage = _savedImage
      }

      if (image !== null && typeof image !== 'undefined' && !Array.isArray(image) && savedImage) {
        set.photoId = savedImage.id
      }

      await prismaClient.user.update({
        where: {
          email: res.locals.user.email
        },
        data: set
      })
      return res.status(204).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getUserData(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { id } = res.locals.user || {}

      if (!id) {
        return res.status(500).json({ message: 'Internal' })
      }

      const user = await prismaClient.user.findFirst({
        where: {
          id: id
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'User was not found' })
      }

      return res.json({
        user: await this.collectUserData(user)
      })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }
}
