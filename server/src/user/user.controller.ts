import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import jwt from 'jsonwebtoken'
import { injectable, inject } from 'inversify'
import { User } from '@prisma/client'

import { LoggerService } from '../logger/logger.service.js'
import { ApiError } from '../error/api.error.js'
import { TYPES } from '../types.js'
import {
  AppLocalsResponseType,
  AppResponse,
  IAddCartItemDto,
  ICancelOrderDto,
  ILoginUserDto,
  IRegisterUserDto,
  IRemoveCartItemDto,
  IRequestDto,
  IUpdateUserDto,
  IUserController,
  ResponseType,
  IMakeReviewDto
} from './user.controller.interface.js'
import { ImageService } from '../image.js'
import { PrismaService } from '../prisma.service.js'

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
    @inject(TYPES.ImageService) private imageService: ImageService,
    @inject(TYPES.Prisma) private prisma: PrismaService
  ) {}

  async collectUserData(user: User) {
    const getImage = async (photoId: number | null) => {
      if (!photoId) {
        return
      }
      return await this.prisma.client.image.findFirst({
        where: {
          id: photoId
        }
      })
    }

    const [favorites, cart, orders, image] = await Promise.all([
      this.prisma.client.favoriteFurniture.findMany({
        where: {
          userId: user.id
        }
      }),
      this.prisma.client.cart.findFirst({
        where: {
          userId: user.id
        }
      }),
      this.prisma.client.order.findMany({
        where: {
          userId: user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      getImage(user.photoId)
    ])

    const cartData = cart
      ? await this.prisma.client.cartFurniture.findMany({
          where: {
            cartId: cart.id
          }
        })
      : []

    const ordersData = []

    for (const order of orders) {
      const productsInOrder = await this.prisma.client.orderedFurniture.findMany({
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
        const dto = errors
          .array({ onlyFirstError: true })
          .map((props) => ({ field: props.param, message: props.msg }))

        this.logger.error(`${req.method} [${req.path}], Error: ${dto}`)
        return res.status(400).json({ errors: dto })
      }

      const { userName, email, password } = matchedData(req)

      if (!userName || typeof userName !== 'string') {
        return next(ApiError.badRequest('UserName was not provided'))
      }
      if (!email || typeof email !== 'string') {
        return next(ApiError.badRequest('Email was not provided'))
      }
      if (!password || typeof password !== 'string') {
        return next(ApiError.badRequest('Password was not provided'))
      }

      const candidate = await this.prisma.client.user.findFirst({
        where: {
          OR: [{ email: email }, { userName: userName }]
        }
      })

      if (candidate) {
        return next(ApiError.badRequest('User already exists'))
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      let savedImage
      const { photo } = req.files || {}
      if (photo) {
        savedImage = await this.prisma.client.image.create({
          data: await this.imageService.prepare(Array.isArray(photo) ? photo[0] : photo)
        })
      }

      await this.prisma.client.user.create({
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
      this.logger.error(`${req.method} [${req.path}], Error: ${error}`)
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

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const dto = errors
          .array({ onlyFirstError: true })
          .map((props) => ({ field: props.param, message: props.msg }))

        this.logger.error(`${req.method} [${req.path}], Error: ${dto}`)
        return res.status(400).json({ errors: dto })
      }

      const { email, password } = matchedData(req)

      if (!email || typeof email !== 'string') {
        return res
          .status(400)
          .json({ errors: [{ field: 'email', message: 'Email was not provided' }] })
      }
      if (!password || typeof password !== 'string') {
        return res
          .status(400)
          .json({ errors: [{ field: 'password', message: 'Password was not provided' }] })
      }

      const user = await this.prisma.client.user.findFirst({
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
      // const jwt = this.signJwt({}, "")

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

      const set: Record<string, string | number | boolean> = {}
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
        set.wantsToReceiveEmailUpdates = wantsToReceiveEmailUpdates === '1'
      }

      const { image } = req.files || {}
      let savedImage

      if (image) {
        const _savedImage = await this.prisma.client.image.create({
          data: await this.imageService.prepare(Array.isArray(image) ? image[0] : image)
        })

        savedImage = _savedImage
      }

      if (image !== null && typeof image !== 'undefined' && !Array.isArray(image) && savedImage) {
        set.photoId = savedImage.id
      }

      await this.prisma.client.user.update({
        where: {
          email: res.locals.user.email
        },
        data: set
      })

      return res.json({ success: true }).status(204)
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
        return res.status(500).json({ message: 'Internal server error' })
      }

      const user = await this.prisma.client.user.findFirst({
        where: {
          id
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

  async getFavorites(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const favorites = await this.prisma.client.favoriteFurniture.findMany({
        where: {
          userId: res.locals.user.id
        }
      })
      return res.json({ items: favorites })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async addFavoriteItem(
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { id } = req.body // this is product id
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      const candidate = await this.prisma.client.favoriteFurniture.findFirst({
        where: {
          userId: res.locals.user.id,
          furnitureId: id
        }
      })
      if (candidate) {
        return next(ApiError.badRequest('Item already exists'))
      }
      await this.prisma.client.favoriteFurniture.create({
        data: {
          userId: res.locals.user.id,
          furnitureId: id
        }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async deleteFavouriteItem(
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { id } = req.body // this is product id
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      await this.prisma.client.favoriteFurniture.deleteMany({
        where: {
          furnitureId: id
        }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async addOrder(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const cart = await this.prisma.client.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!cart) {
        return res.status(201).json({ success: true })
      }

      const [currentProductsInCart, userOrder] = await Promise.all([
        this.prisma.client.cartFurniture.findMany({
          where: {
            cartId: cart.id
          }
        }),
        this.prisma.client.order.create({
          data: {
            userId: res.locals.user.id,
            name: 'Order'
          }
        })
      ])

      const productsInOrder = await Promise.all(
        currentProductsInCart.map(async ({ furnitureId, quintity, color }) => {
          return await this.prisma.client.orderedFurniture.create({
            data: {
              furnitureId,
              quintity,
              orderId: userOrder.id,
              color
            }
          })
        })
      )

      await this.prisma.client.cartFurniture.deleteMany({
        where: {
          cartId: cart.id
        }
      })
      // await this.prisma.client.cart.deleteMany({
      //   where: {
      //     userId: res.locals.user.id
      //   }
      // })

      const dto = {
        order: {
          ...userOrder,
          items: productsInOrder
        }
      }

      return res.status(201).json(dto)
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async cancelOrder(
    req: Request<{}, {}, ICancelOrderDto>,
    res: AppResponse,
    next: NextFunction
  ): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { orderId } = req.body

      if (!orderId) {
        return next(ApiError.badRequest('Order id was not provided'))
      }

      await this.prisma.client.order.update({
        where: {
          id: orderId
        },
        data: {
          status: 'CANCELED'
        }
      })

      return res.status(204).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getCartItems(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const userCart = await this.prisma.client.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        return res.json({ items: [] })
      }

      const cartFurniture = this.prisma.client.cartFurniture.findMany({
        where: {
          cartId: userCart.id
        }
      })

      return res.json({ items: cartFurniture })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async addCartItem(
    req: Request<{}, {}, IAddCartItemDto>,
    res: AppResponse,
    next: NextFunction
  ): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const { quintity = 1, productId, color = '' } = req.body

      if (!productId) {
        return next(ApiError.badRequest('Product id was not provided'))
      }
      if (!color) {
        return next(ApiError.badRequest('Color id was not provided'))
      }

      let userCart = await this.prisma.client.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        userCart = await this.prisma.client.cart.create({
          data: {
            userId: res.locals.user.id
          }
        })
      }

      const candidate = await this.prisma.client.cartFurniture.findFirst({
        where: {
          furnitureId: productId,
          color
        }
      })

      if (candidate) {
        await this.prisma.client.cartFurniture.updateMany({
          where: {
            furnitureId: productId,
            color
          },
          data: {
            quintity: candidate.quintity + quintity
          }
        })
      } else {
        await this.prisma.client.cartFurniture.create({
          data: {
            furnitureId: productId,
            quintity: quintity,
            cartId: userCart.id,
            color
          }
        })
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async removeCartItem(
    req: Request<{}, {}, IRemoveCartItemDto>,
    res: AppResponse,
    next: NextFunction
  ): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const { productId, color } = req.body
      if (!productId) {
        return next(ApiError.badRequest('Product id was not provided'))
      }
      if (!color) {
        return next(ApiError.badRequest('Color was not provided'))
      }

      const userCart = await this.prisma.client.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        return res.status(200).json({ success: true })
      }

      await this.prisma.client.cartFurniture.deleteMany({
        where: {
          furnitureId: productId,
          color,
          cartId: userCart.id
        }
      })
      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async makeRequest(req: Request<{}, {}, IRequestDto>, res: AppResponse) {
    this.logger.log(`[${req.method}] ${req.path}`)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const dto = errors
        .array({ onlyFirstError: true })
        .map((props) => ({ field: props.param, message: props.msg }))
      return res.status(400).json({ errors: dto })
    }

    const data: Record<'message', string> = matchedData(req)

    console.log('data.message', data.message)

    return res.status(200).json({ success: true })
  }

  async makeReview(req: Request<{}, {}, IMakeReviewDto>, res: AppResponse, next: NextFunction) {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const { text, score, furnitureId } = req.body
      if (typeof text !== 'string') {
        return next(ApiError.badRequest('Review text was not provided or incorrect'))
      }

      if (typeof score !== 'string') {
        return next(ApiError.badRequest('Review score was not provided or incorrect'))
      }

      if (typeof furnitureId !== 'string') {
        return next(ApiError.badRequest('Furniture id score was not provided or incorrect'))
      }

      const { attachments } = req.files || {}

      console.log('attachments', text, score, furnitureId, parseFloat(score))

      const savedReview = await this.prisma.client.review.create({
        data: {
          text,
          score: parseFloat(score),
          userId: res.locals.user.id,
          furnitureId: parseInt(furnitureId)
        }
      })

      if (attachments) {
        if (Array.isArray(attachments)) {
          attachments.map(async (attachment) => {
            const imageDataToSave = await this.imageService.prepare(attachment)
            await this.prisma.client.image.create({
              data: {
                ...imageDataToSave,
                reviewId: savedReview.id
              }
            })
          })
        } else {
          const imageDataToSave = await this.imageService.prepare(attachments)
          await this.prisma.client.image.create({
            data: {
              ...imageDataToSave,
              reviewId: savedReview.id
            }
          })
        }
      }

      return res.json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }
}
