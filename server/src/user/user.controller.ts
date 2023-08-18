import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { injectable, inject } from 'inversify'
import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import fileUpload from 'express-fileupload'

import { LoggerService } from '../logger/logger.service.js'
import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'
import { TYPES } from '../types.js'
import {
  ILoginUserDto,
  IRegisterUserDto,
  IUpdateUserDto,
  IUserController,
  ResponseType
} from './user.controller.interface.js'
import { AppLocalsResponseType, AppResponse } from '../app/app.controller.interface.js'
import { replaceSpacesWithUnderscores } from '../utils.js'

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
  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    this.logger = logger
  }

  async register(
    req: Request<{}, {}, IRegisterUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)
      const errors = validationResult(req)
      // const errors: { formatter: () => void; errors: Record<string, string>[] } = validationResult(req)
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

        const imageDimensions = sizeOf(processedImageFromRequest.data)
        console.log('imageDimensions', imageDimensions)

        const compressedImage = await sharp(processedImageFromRequest.data).toBuffer()

        const imageNameWithoutExtension = processedImageFromRequest.name.split('.').slice(0, -1)
        const imageExtension = processedImageFromRequest.name.split('.').pop()
        const photo = {
          name: processedImageFromRequest.name,
          alternativeText: '',
          caption: '',
          width: imageDimensions.width,
          height: imageDimensions.height,
          hash: processedImageFromRequest.md5,
          ext: imageExtension ?? '',
          mime: processedImageFromRequest.mimetype,
          size: processedImageFromRequest.size / 1000,
          url: `${process.env.SELF}/uploads/${imageNameWithoutExtension}_${processedImageFromRequest.md5}.${imageExtension}`,
          provider: 'database',
          data: compressedImage
        }

        savedImage = await prismaClient.image.create({
          data: photo
        })
      }

      console.log('savedImage', savedImage)

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

      let cartData
      // id: number;
      // furnitureId: number;
      // cartId: number;
      // quintity: number;[]
      let ordersData
      if (cart) {
        const all = await Promise.all([
          prismaClient.cartFurniture.findMany({
            where: {
              cartId: cart.id
            }
          }),
          orders.map(async (order) => {
            const productsInOrder = await prismaClient.orderedFurniture.findMany({
              where: {
                orderId: order.id
              }
            })

            return {
              ...order,
              items: productsInOrder
            }
          })
        ])
        cartData = all[0]
        ordersData = all[1]
      }

      return res.json({
        token: token,
        user: {
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
          cart: cart && cartData ? cartData : []
        }
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

      console.log('req.body', req.body)

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

      let processedImageFromRequest: fileUpload.UploadedFile
      const { image } = req.files || {}
      let savedImage

      if (image) {
        if (Array.isArray(image)) {
          processedImageFromRequest = image[0]
        } else {
          processedImageFromRequest = image
        }

        const imageDimensions = sizeOf(processedImageFromRequest.data)
        const compressedImage = await sharp(processedImageFromRequest.data).toBuffer()

        const imageNameWithoutExtension = processedImageFromRequest.name
          .split('.')
          .slice(0, -1)
          .join('')
        const processedImageNameWithoutExtension =
          replaceSpacesWithUnderscores(imageNameWithoutExtension)
        const imageExtension = processedImageFromRequest.name.split('.').pop()

        const imageToSave = {
          name: processedImageFromRequest.name,
          alternativeText: '',
          caption: '',
          width: imageDimensions.width,
          height: imageDimensions.height,
          hash: processedImageFromRequest.md5,
          ext: imageExtension ?? '',
          mime: processedImageFromRequest.mimetype,
          size: processedImageFromRequest.size / 1000,
          url: `/uploads/${processedImageNameWithoutExtension}_${processedImageFromRequest.md5}.${imageExtension}`,
          provider: 'database',
          data: compressedImage
        }

        const _savedImage = await prismaClient.image.create({
          data: imageToSave
        })

        savedImage = _savedImage
        console.log('savedImage', savedImage)
      }

      if (image !== null && typeof image !== 'undefined' && !Array.isArray(image) && savedImage) {
        set.photoId = savedImage.id
      }

      console.log('set', set)

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

      let cartData
      // id: number;
      // furnitureId: number;
      // cartId: number;
      // quintity: number;[]
      let ordersData
      if (cart) {
        const all = await Promise.all([
          prismaClient.cartFurniture.findMany({
            where: {
              cartId: cart.id
            }
          }),
          orders.map(async (order) => {
            const productsInOrder = await prismaClient.orderedFurniture.findMany({
              where: {
                orderId: order.id
              }
            })

            return {
              ...order,
              items: productsInOrder
            }
          })
        ])
        cartData = all[0]
        ordersData = all[1]
      }

      return res.json({
        user: {
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
          cart: cart && cartData ? cartData : []
        }
      })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }
}
