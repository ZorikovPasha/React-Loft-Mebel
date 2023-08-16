import { NextFunction, Request, Response } from 'express'
import fileUpload from 'express-fileupload'
import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import { injectable, inject } from 'inversify'

import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'
import { LoggerService } from '../logger/logger.service.js'
import { TYPES } from '../types.js'
import {
  AppLocalsResponseType,
  AppResponse,
  IAddCartItemDto,
  ICreateFurnitureDto,
  IFurnitureDimension,
  IRemoveCartItemDto
} from './app.controller.interface.js'
import { ResponseType } from '../user/user.controller.interface.js'
import { deserializeDimensionsFromString, replaceSpacesWithUnderscores } from '../utils.js'

interface IError {
  message: string
  field: string
}

@injectable()
export class AppController {
  // private mappedValues: Record<string, string>

  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    // this.mappedValues = values
    this.logger = logger
  }

  async getFilteredFurniture(req: Request, res: Response, next: NextFunction): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const furniture = await prismaClient.furniture.findMany()

      const dto = await Promise.all(
        furniture.map(async (f) => {
          const [image, dimensions] = await Promise.all([
            prismaClient.image.findFirst({
              where: {
                id: f.imageId
              }
            }),
            prismaClient.furnitureDimension.findFirst({
              where: {
                id: f.id
              }
            })
          ])

          const dto = {
            ...f,
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
            dimensions
          }

          return dto
        })
      )
      // const findCriteria = Object.keys(req.query).reduce((accum, key) => {
      //   if (key === 'color' || key === 'sort') return accum;
      //     return {...accum, [this.mappedValues[key]]: req.query[key]};
      // }, {});

      // switch (req.query.sort) {
      //   case 'asc':
      //     furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: 1 });
      //     break;
      //   case 'desc':
      //     furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: -1 });
      //     break;
      //   case 'pop':
      //     furnitureItems = await Furniture.find(findCriteria).sort({ rating: -1 });
      //     break;
      //   default:
      //     furnitureItems = await Furniture.find(findCriteria);
      //     break;
      //   }

      return res.json({ items: dto })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async createFurniture(
    req: Request<{}, {}, ICreateFurnitureDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const {
        name,
        type,
        priceOld,
        priceNew,
        colors,
        rating,
        sale,
        room,
        material,
        brand,
        dimensions
      } = req.body

      const errors: IError[] = []

      if (!name) {
        errors.push({
          field: 'name',
          message: 'Name was not provided'
        })
      }
      if (!type) {
        errors.push({
          field: 'type',
          message: 'Type was not provided'
        })
      }
      if (!priceOld) {
        errors.push({
          field: 'priceOld',
          message: 'Price without discount was not provided'
        })
      }
      if (!priceNew) {
        errors.push({
          field: 'priceNew',
          message: 'Price with discount was not provided'
        })
      }
      if (!rating) {
        errors.push({
          field: 'rating',
          message: 'Rating was not provided'
        })
      }
      if (!room) {
        errors.push({
          field: 'room',
          message: 'Room was not provided'
        })
      }
      if (!material) {
        errors.push({
          field: 'material',
          message: 'Material was not provided'
        })
      }
      if (!brand) {
        errors.push({
          field: 'brand',
          message: 'Brand was not provided'
        })
      }

      if (!req.files?.image) {
        errors.push({
          field: 'image',
          message: 'Image was not provided'
        })
      }

      if (!colors || typeof colors !== 'string' || !colors.length) {
        errors.push({
          field: 'colors',
          message: 'Colors was not provided or incorrect'
        })
      }

      if (!dimensions || typeof dimensions !== 'string' || !dimensions.length) {
        errors.push({
          field: 'dimensions',
          message: 'Dimensions was not provided or incorrect'
        })
      }

      if (
        errors.length ||
        typeof colors !== 'string' ||
        !name ||
        !type ||
        !priceNew ||
        !priceOld ||
        !rating ||
        !sale ||
        !room ||
        !material ||
        !brand
      ) {
        return res.status(400).json({ errors })
      }

      const { status, data } = deserializeDimensionsFromString(dimensions as string)

      if (!status) {
        errors.push({
          field: 'dimensions',
          message: 'Dimensions are not correct'
        })
      }

      let processedImageFromRequest: fileUpload.UploadedFile
      const { image } = req.files || {}

      if (!image) {
        errors.push({
          field: 'image',
          message: 'Image was not provided'
        })
      }

      if (errors.length) {
        return res.status(400).json({ errors })
      }

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

      const deserializedSale = sale === '1'
      const deserializedColors = colors?.split(';') ?? []

      const furniture = {
        name,
        type,
        priceNew,
        priceOld,
        colors: deserializedColors,
        rating,
        sale: deserializedSale,
        room,
        material,
        brand
      }

      const savedImage = await prismaClient.image.create({
        data: imageToSave
      })

      const savedFurniture = await prismaClient.furniture.create({
        data: {
          ...furniture,
          imageId: savedImage.id
        }
      })

      await Promise.all(
        data
          .filter((d): d is IFurnitureDimension => Boolean(d))
          .map(async (d) => {
            const dimensionIndatabase = await prismaClient.furnitureDimension.findFirst({
              where: {
                width: d.width,
                height: d.height,
                length: d.length
              }
            })

            if (!dimensionIndatabase) {
              await prismaClient.furnitureDimension.create({
                data: {
                  furnitureId: savedFurniture.id,
                  width: d.width,
                  height: d.height,
                  length: d.length
                }
              })
            }
          })
      )

      return res.status(200).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getSingleFurniture(
    req: Request<{}, {}, {}, { id?: string }>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!req.query.id) {
        return next(ApiError.badRequest('Id was not provided'))
      }
      const furnitureItem = await prismaClient.furniture.findFirst({
        where: {
          id: parseInt(req.query.id)
        }
      })
      return res.send(furnitureItem)
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async deleteFurniture(
    req: Request<{ id?: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!req.params.id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      const processedId = parseInt(req.params.id)

      if (Number.isNaN(processedId)) {
        return next(ApiError.badRequest('Incorrect id was provided'))
      }
      await prismaClient.furniture.delete({
        where: {
          id: processedId
        }
      })

      return res.status(200).json({ success: true })
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

      const { id } = req.body
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      await prismaClient.favoriteFurniture.create({
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

      const { id } = req.body
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      await prismaClient.favoriteFurniture.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async getFavorites(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const favorites = await prismaClient.favoriteFurniture.findMany({
        where: {
          userId: res.locals.user?.id
        }
      })
      return res.json({ items: favorites })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  // :TODO: this should return cart items getting orders
  async getCartItems(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const userCart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        return res.json({ items: [] })
      }

      const cartFurniture = prismaClient.cartFurniture.findMany({
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

      const { quintity = 1, productId } = req.body

      if (!productId) {
        return next(ApiError.badRequest('Product id was not provided'))
      }

      let userCart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        userCart = await prismaClient.cart.create({
          data: {
            userId: res.locals.user.id
          }
        })
      }

      await prismaClient.cartFurniture.create({
        data: {
          furnitureId: productId,
          quintity: quintity,
          cartId: userCart.id
        }
      })
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

      const { productId } = req.body
      if (!productId) {
        return next(ApiError.badRequest('Product id was not provided'))
      }

      const userCart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        return res.status(200).json({ success: true })
      }

      await prismaClient.cartFurniture.deleteMany({
        where: {
          furnitureId: productId,
          cartId: userCart.id
        }
      })
      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const orders = await prismaClient.order.findMany({
        where: {
          userId: res.locals.user.id
        }
      })
      return res.json({ items: orders })
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

      const cart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!cart) {
        return res.status(201).json({ success: true })
      }

      const promises = await Promise.all([
        prismaClient.cartFurniture.findMany({
          where: {
            cartId: cart.id
          }
        }),
        prismaClient.order.create({
          data: {
            userId: res.locals.user.id,
            name: 'Order'
          }
        })
      ])
      const currentProductsInCart = promises[0]
      const userOrder = promises[1]

      await Promise.all(
        currentProductsInCart.map(async ({ furnitureId, quintity }) => {
          await prismaClient.orderedFurniture.create({
            data: {
              furnitureId,
              quintity,
              orderId: userOrder.id
            }
          })
        })
      )
      return res.status(201).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async deleteOrder(
    req: Request<{}, {}, { id: number }>,
    res: AppResponse,
    next: NextFunction
  ): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const { id } = req.body

      await prismaClient.order.delete({
        where: {
          id: id,
          userId: res.locals.user.id
        }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }
}

// export const appController = new AppController({
//   room: 'room',
//   material: 'material',
//   type: 'type.value',
//   brand: 'brand'
// }, new LoggerService())
