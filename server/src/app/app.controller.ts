import { NextFunction, Request, Response } from 'express'
import { injectable, inject } from 'inversify'

import { ApiError } from '../error/api.error.js'
import { LoggerService } from '../logger/logger.service.js'
import { TYPES } from '../types.js'
import {
  IAppControllerInterface,
  ICreateFurnitureDto,
  IFurnitureDimension
} from './app.controller.interface.js'
import { ResponseType } from '../user/user.controller.interface.js'
import { deserializeDimensionsFromString } from '../utils.js'
import { ImageService } from '../image.js'
import { PrismaService } from '../prisma.service.js'

interface IError {
  message: string
  field: string
}

@injectable()
export class AppController implements IAppControllerInterface {
  // private mappedValues: Record<string, string>

  constructor(
    @inject(TYPES.ILoggerService) public logger: LoggerService,
    @inject(TYPES.ImageService) public imageService: ImageService,
    @inject(TYPES.Prisma) private prisma: PrismaService
  ) {}

  async getFilteredFurniture(req: Request, res: Response, next: NextFunction): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const furniture = await this.prisma.client.furniture.findMany()

      const dto = await Promise.all(
        furniture.map(async (f) => {
          const [image, dimensions, reviews] = await Promise.all([
            this.prisma.client.image.findFirst({
              where: {
                id: f.imageId
              }
            }),
            this.prisma.client.furnitureDimension.findMany({
              where: {
                id: f.id
              }
            }),
            this.prisma.client.review.findMany({
              where: {
                furnitureId: f.id
              }
            })
          ])

          const _reviews = await Promise.all(
            reviews.map(async (r) => {
              const user = await this.prisma.client.user.findFirst({
                where: {
                  id: r.userId
                }
              })

              const [userAvatar, attachedPictures] = await Promise.all([
                user && user.photoId
                  ? this.prisma.client.image.findFirst({
                      where: {
                        id: user.photoId
                      }
                    })
                  : null,
                this.prisma.client.image.findMany({
                  where: {
                    reviewId: r.id
                  }
                })
              ])

              return {
                id: r.id,
                text: r.text,
                score: r.score,
                furnitureId: r.furnitureId,
                user: user
                  ? {
                      userName: user.userName,
                      image: userAvatar
                    }
                  : {},
                attachedPictures,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt
              }
            })
          )

          return {
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
            dimensions,
            reviews: _reviews
          }
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

      if (!name || typeof name !== 'string') {
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

      const deserializedSale = sale === '1'
      const deserializedColors = colors?.split(';') ?? []

      const savedImage = await this.prisma.client.image.create({
        data: await this.imageService.prepare(Array.isArray(image) ? image[0] : image)
      })

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
        brand,
        imageId: savedImage.id
      }

      const savedFurniture = await this.prisma.client.furniture.create({
        // @ts-expect-error this is okay but should rewrite validation
        data: furniture
      })

      await Promise.all(
        data
          .filter((d): d is IFurnitureDimension => Boolean(d))
          .map(async (d) => {
            const dimensionIndatabase = await this.prisma.client.furnitureDimension.findFirst({
              where: {
                width: d.width,
                height: d.height,
                length: d.length
              }
            })

            if (!dimensionIndatabase) {
              await this.prisma.client.furnitureDimension.create({
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

      const furnitureItem = await this.prisma.client.furniture.findFirst({
        where: {
          id: parseInt(req.query.id)
        }
      })

      if (!furnitureItem) {
        return res.status(404).json({ success: false })
      }

      const [image, dimensions, reviews] = await Promise.all([
        this.prisma.client.image.findFirst({
          where: {
            id: furnitureItem.imageId
          }
        }),
        this.prisma.client.furnitureDimension.findMany({
          where: {
            id: furnitureItem.id
          }
        }),
        this.prisma.client.review.findMany({
          where: {
            furnitureId: furnitureItem.id
          }
        })
      ])

      const _reviews = reviews.map(async (r) => {
        const user = await this.prisma.client.user.findFirst({
          where: {
            id: r.userId
          }
        })

        const [userAvatar, attachedPictures] = await Promise.all([
          user && user.photoId
            ? this.prisma.client.image.findFirst({
                where: {
                  id: user.photoId
                }
              })
            : null,
          this.prisma.client.image.findMany({
            where: {
              reviewId: r.id
            }
          })
        ])

        return {
          id: r.id,
          text: r.text,
          score: r.score,
          furnitureId: r.furnitureId,
          user: user
            ? {
                userName: user.userName,
                image: userAvatar
              }
            : {},
          attachedPictures,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        }
      })

      const dto = {
        ...furnitureItem,
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
        dimensions,
        reviews: _reviews
      }

      return res.send(dto)
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
      await this.prisma.client.furniture.delete({
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
}
