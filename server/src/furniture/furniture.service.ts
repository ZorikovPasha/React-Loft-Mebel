import { Injectable, NotFoundException } from '@nestjs/common'
import { Furniture } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { ImageService } from '../image/image.service'
import { IFurnitureItemRes, IGetFurnitureSuccessRes } from './types'

class CreateFurnitureData {
  name: string
  type: string
  priceNew: string
  priceOld: string
  colors: string[]
  rating: string
  sale: boolean
  room: string
  material: string
  brand: string
  image: Express.Multer.File
  specs: string
  description: string
  dimensions: {
    width: number
    length: number
    height: number
  }[]
}

@Injectable()
export class FurnitureService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageService: ImageService
  ) {}

  async create(createFurnitureData: CreateFurnitureData) {
    const { image, dimensions } = createFurnitureData
    const imageDataToSave = await this.imageService.prepare(Array.isArray(image) ? image[0] : image)

    const savedImage = await this.prisma.image.create({
      data: imageDataToSave
    })

    const savedFurniture = await this.prisma.furniture.create({
      data: {
        name: createFurnitureData.name,
        type: createFurnitureData.type,
        priceOld: createFurnitureData.priceOld,
        priceNew: createFurnitureData.priceNew,
        colors: createFurnitureData.colors.join(';'),
        rating: createFurnitureData.rating,
        sale: createFurnitureData.sale,
        room: createFurnitureData.room,
        material: createFurnitureData.material,
        brand: createFurnitureData.brand,
        description: createFurnitureData.description,
        specs: createFurnitureData.specs,
        imageId: savedImage.id
      }
    })

    await Promise.all(
      dimensions.map(async (d) => {
        const dimensionIndatabase = await this.prisma.furnitureDimension.findFirst({
          where: {
            width: d.width,
            height: d.height,
            length: d.length
          }
        })

        if (!dimensionIndatabase) {
          await this.prisma.furnitureDimension.create({
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
  }

  async findMany(criteria?: Record<string, unknown>): Promise<IGetFurnitureSuccessRes> {
    const transactions = [this.prisma.furniture.findMany()]
    if (criteria !== undefined) {
      // @ts-expect-error this is okay for now
      transactions.push(this.prisma.furniture.findMany(criteria))
    }

    const [all, filtered] = await this.prisma.$transaction(transactions)

    const processedFurniture = all
      ? await Promise.all(
          all.map(async (furnitureItem) => {
            return await this.prepareFurniture(furnitureItem)
          })
        )
      : []

    return {
      all: processedFurniture,
      filtered: filtered
        ? await Promise.all(
            filtered.map(async (furnitureItem) => {
              return await this.prepareFurniture(furnitureItem)
            })
          )
        : processedFurniture
    }
  }

  async prepareFurniture(furnitureItem: Furniture): Promise<IFurnitureItemRes> {
    const [image, dimensions, reviews] = await this.prisma.$transaction([
      this.prisma.image.findFirst({
        where: {
          id: furnitureItem.imageId
        }
      }),
      this.prisma.furnitureDimension.findMany({
        where: {
          id: furnitureItem.id
        }
      }),
      this.prisma.review.findMany({
        where: {
          furnitureId: furnitureItem.id
        }
      })
    ])

    const processedReviews = await Promise.all(
      reviews.map(async (r) => {
        const user = await this.prisma.user.findFirst({
          where: {
            id: r.userId
          }
        })

        await this.prisma.image.findMany({
          where: {
            reviewId: r.id
          },
          select: {
            id: true,
            name: true,
            alternativeText: true,
            caption: true,
            width: true,
            height: true,
            hash: true,
            ext: true,
            size: true,
            url: true,
            mime: true,
            blurredBase64: true,
            provider: true,
            createdAt: true,
            updatedAt: true
          }
        })

        const [userAvatar, attachedPictures] = await Promise.all([
          user && user.photoId
            ? this.prisma.image.findFirst({
                where: {
                  id: user.photoId
                }
              })
            : null,
          this.prisma.image.findMany({
            where: {
              reviewId: r.id
            },
            select: {
              id: true,
              name: true,
              alternativeText: true,
              caption: true,
              width: true,
              height: true,
              hash: true,
              ext: true,
              size: true,
              url: true,
              mime: true,
              blurredBase64: true,
              provider: true,
              createdAt: true,
              updatedAt: true
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
                id: user.id,
                image: userAvatar
                  ? {
                      id: userAvatar.id,
                      name: userAvatar.name,
                      alternativeText: userAvatar.alternativeText,
                      caption: userAvatar.caption,
                      width: userAvatar.width,
                      height: userAvatar.height,
                      hash: userAvatar.hash,
                      ext: userAvatar.ext,
                      size: userAvatar.size,
                      url: userAvatar.url,
                      mime: userAvatar.mime,
                      blurredBase64: userAvatar.blurredBase64,
                      provider: userAvatar.provider,
                      createdAt: userAvatar.createdAt,
                      updatedAt: userAvatar.updatedAt,
                      reviewId: userAvatar.reviewId
                    }
                  : null
              }
            : null,
          attachedPictures,
          usersFoundThisHelpful: r.usersFoundThisReviewHelpful.split(';').filter((string) => string.trim() !== '')
            .length,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        }
      })
    )

    return {
      id: furnitureItem.id,
      imageId: furnitureItem.imageId,
      name: furnitureItem.name,
      type: furnitureItem.type,
      priceOld: furnitureItem.priceOld,
      priceNew: furnitureItem.priceNew,
      colors: furnitureItem.colors.split(';'),
      rating: furnitureItem.rating,
      sale: furnitureItem.sale,
      room: furnitureItem.room,
      material: furnitureItem.material,
      brand: furnitureItem.brand,
      description: furnitureItem.description,
      specs: furnitureItem.specs,
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
            blurredBase64: image.blurredBase64,
            provider: image.provider,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
          }
        : null,
      dimensions,
      leftInStock: furnitureItem.leftInStock,
      reviews: processedReviews
    }
  }

  async findOne(id: number): Promise<IFurnitureItemRes> {
    const furnitureItem = await this.prisma.furniture.findFirst({
      where: {
        id: id
      }
    })

    if (!furnitureItem) {
      throw new NotFoundException()
    }
    return await this.prepareFurniture(furnitureItem)
  }

  async recalculateFurnitureScore(furnitureId: number) {
    const thisFurnitureReviews = await this.prisma.review.findMany({
      where: {
        furnitureId: furnitureId
      }
    })

    if (thisFurnitureReviews.length > 0) {
      const normalizedScore =
        thisFurnitureReviews.reduce((accum: number, next) => {
          return accum + next.score
        }, 0) / thisFurnitureReviews.length

      await this.prisma.furniture.update({
        where: {
          id: furnitureId
        },
        data: {
          rating: normalizedScore.toFixed(1)
        }
      })
    }
  }
}
