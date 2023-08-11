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
  AppResponse,
  IAddCartItemDto,
  ICreateFurnitureDto,
  IRemoveCartItemDto
} from './app.controller.interface.js'

@injectable()
export class AppController {
  // private mappedValues: Record<string, string>

  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    // this.mappedValues = values
    this.logger = logger
  }

  async getFilteredFurniture(req: Request, res: Response, next: NextFunction) {
    try {
      const furniture = await prismaClient.furniture.findMany()
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

      return res.json({ items: furniture })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async createFurniture(
    req: Request<{}, {}, ICreateFurnitureDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
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
      if (
        !name ||
        !type ||
        !priceOld ||
        !priceNew ||
        !rating ||
        !sale ||
        !room ||
        !material ||
        !brand
      ) {
        return next(ApiError.badRequest('Incomplete data was provided'))
      }
      if (!colors || !colors.length) {
        return next(ApiError.badRequest('Incomplete data was provided'))
      }
      if (!dimensions || !dimensions.length) {
        return next(ApiError.badRequest('Incomplete data was provided'))
      }

      if (!req.files?.image) {
        return next(ApiError.badRequest('Image was not provided'))
      }

      console.log('req.files?.image', req.files?.image)
      let processedImageFromRequest: fileUpload.UploadedFile

      if (Array.isArray(req.files.image)) {
        processedImageFromRequest = req.files.image[0]
      } else {
        processedImageFromRequest = req.files.image
      }

      const imageDimensions = sizeOf(processedImageFromRequest.data)
      console.log('imageDimensions', imageDimensions)

      const compressedImage = await sharp(processedImageFromRequest.data).toBuffer()

      const imageNameWithoutExtension = processedImageFromRequest.name.split('.').slice(0, -1)
      const imageExtension = processedImageFromRequest.name.split('.').pop()
      const image = {
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

      console.log('image', image)

      const furniture = {
        name,
        type,
        priceNew,
        priceOld,
        colors,
        rating,
        sale,
        room,
        material,
        brand
      }

      console.log('furniture', furniture)

      // const savedImage = await prismaClient.image.create({
      //   data: image
      // })

      // const savedFurniture = await prismaClient.furniture.create({
      //   data: {
      //     ...furniture,
      //     imageId: savedImage.id,
      //   }
      // })

      // await Promise.all(
      //   dimensions.filter((d): d is IFurnitureDimension => Boolean(d)).map(async (d) => {
      //     const dimensionIndatabase = await prismaClient.furnitureDimension.findFirst({
      //       where: {
      //         width: d.width,
      //         height: d.height,
      //         length: d.length,
      //       }
      //     })

      //     if (!dimensionIndatabase) {
      //       prismaClient.furnitureDimension.create({
      //         data: {
      //           furnitureId: savedFurniture.id,
      //           width: d.width,
      //           height: d.height,
      //           length: d.length,
      //         }
      //       })
      //     }
      //   })
      // )

      return res.end()
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getSingleFurniture(
    req: Request<{}, {}, {}, { id?: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
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

  async addFavoriteItem(req: Request<{}, {}, { id?: number }>, res: Response, next: NextFunction) {
    try {
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

      return res.status(200).json({ message: 'Item added to favorites successfully' })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async deleteFavouriteItem(
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }

      await prismaClient.favoriteFurniture.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json({ message: 'Item removed from favorites successfully' })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async getFavorites(req: Request, res: AppResponse, next: NextFunction) {
    try {
      const favorites = await prismaClient.favoriteFurniture.findMany({
        where: {
          userId: res.locals.user?.id
        }
      })
      return res.json({ favorites })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  // :TODO: this should return cart items getting orders
  async getCartItems(req: Request, res: AppResponse, next: NextFunction) {
    try {
      if (!res.locals.user) {
        return
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

  async addCartItem(req: Request<{}, {}, IAddCartItemDto>, res: AppResponse, next: NextFunction) {
    try {
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
      return res.status(200).json({ message: 'Item was successfully added to cart' })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async removeCartItem(
    req: Request<{}, {}, IRemoveCartItemDto>,
    res: AppResponse,
    next: NextFunction
  ) {
    try {
      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const { productId } = req.body
      if (!productId) {
        return next(ApiError.badRequest('Product id was not provided'))
      }

      let userCart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!userCart) {
        return res.status(200).json({ message: 'Nothing to delete from' })
      }

      prismaClient.cartFurniture.deleteMany({
        where: {
          furnitureId: productId,
          cartId: userCart.id
        }
      })
      return res.status(200).json({ message: 'Item was successfully removed fromm cart' })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
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

  async addOrder(req: Request, res: AppResponse, next: NextFunction) {
    try {
      if (!res.locals.user) {
        return next({ status: 500, message: '' })
      }

      const cart = await prismaClient.cart.findFirst({
        where: {
          userId: res.locals.user.id
        }
      })

      if (!cart) {
        return res.status(201).json({ message: 'Order created successfully' })
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
      return res.status(201).json({ message: 'Order created successfully' })
    } catch (err) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${err}`)
      return next(ApiError.internal(err as Error))
    }
  }

  async deleteOrder(req: Request<{}, {}, { id: number }>, res: AppResponse, next: NextFunction) {
    try {
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

      return res.status(200)
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
