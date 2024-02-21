import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ImageService } from '../image/image.service'
import { Furniture } from '@prisma/client'

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
        colors: createFurnitureData.colors,
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

  async findAll() {
    const furniture = await this.prisma.furniture.findMany()
    return await Promise.all(
      furniture.map(async (furnitureItem) => {
        return await this.prepareFurniture(furnitureItem)
      })
    )
  }

  async prepareFurniture(furnitureItem: Furniture) {
    const [image, dimensions, reviews] = await Promise.all([
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
                      provider: userAvatar.provider,
                      createdAt: userAvatar.createdAt,
                      updatedAt: userAvatar.updatedAt,
                      reviewId: userAvatar.reviewId
                    }
                  : null
              }
            : {},
          attachedPictures,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        }
      })
    )

    const dto = {
      id: furnitureItem.id,
      imageId: furnitureItem.imageId,
      name: furnitureItem.name,
      type: furnitureItem.type,
      priceOld: furnitureItem.priceOld,
      priceNew: furnitureItem.priceNew,
      colors: furnitureItem.colors,
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
            provider: image.provider,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt
          }
        : null,
      dimensions,
      reviews: processedReviews
    }

    return dto
  }

  async findOne(id: number) {
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
}
