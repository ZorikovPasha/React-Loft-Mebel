import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ImageService } from '../image/image.service'
import { ICollectedUserData, IOrder } from 'src/auth/types'

interface CreateUserData {
  userName: string
  email: string
  password: string
  name?: string
  surname?: string
}

interface ICartItemProps {
  userId: string
  quintity: number
  productId: number
  color: string
}

interface IMakeReviewProps {
  text: string
  score: string
  furnitureId: number
  userId: string
  attachments: Express.Multer.File | Express.Multer.File[] | null
}

type IDeleteCartitemProps = Omit<ICartItemProps, 'quintity'>

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageService: ImageService
  ) {}

  async create(createUserData: CreateUserData) {
    const { userName, email, password, name, surname } = createUserData
    const hashedPassword = await bcrypt.hash(password, 10)

    await this.prisma.user.create({
      data: {
        name: name ?? '',
        surname: surname,
        userName,
        password: hashedPassword,
        phone: '',
        email,
        city: '',
        street: '',
        house: '',
        apartment: ''
      }
    })
  }

  async collectUserData(user: User): Promise<ICollectedUserData> {
    const getImage = async (photoId: number | null) => {
      if (!photoId) {
        return
      }
      return await this.prisma.image.findFirst({
        where: {
          id: photoId
        }
      })
    }

    const [favorites, cart, orders, image] = await Promise.all([
      this.prisma.favoriteFurniture.findMany({
        where: {
          userId: user.id
        }
      }),
      this.prisma.cart.findFirst({
        where: {
          userId: user.id
        }
      }),
      this.prisma.order.findMany({
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
      ? await this.prisma.cartFurniture.findMany({
          where: {
            cartId: cart.id
          }
        })
      : []

    const ordersData: IOrder[] = []

    for (const order of orders) {
      const productsInOrder = await this.prisma.orderedFurniture.findMany({
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
      userName: user.userName,
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
      decidedOnWantsToReceiveEmailUpdates: user.DecidedOnWantsToReceiveEmailUpdates,
      wantsToReceiveEmailUpdates: user.wantsToReceiveEmailUpdates,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      favorites: favorites.map((f) => f.furnitureId),
      orders: ordersData ? ordersData : [],
      cart: cartData
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
  }

  async updateUser(
    userId: string,
    updateUserData: Record<string, string | boolean | number>,
    image: Express.Multer.File | null
  ) {
    let savedImage
    const additional: Record<string, number> = {}

    if (image) {
      savedImage = await this.prisma.image.create({
        data: await this.imageService.prepare(Array.isArray(image) ? image[0] : image)
      })
      additional.photoId = savedImage.id
    }

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: Object.assign(updateUserData, additional)
    })
  }

  async getUserFavorites(id: string) {
    return await this.prisma.favoriteFurniture.findMany({
      where: {
        userId: id
      }
    })
  }

  async findFavoriteFurniture(userId: string, furnitureId: number) {
    return await this.prisma.favoriteFurniture.findFirst({
      where: {
        userId: userId,
        furnitureId: furnitureId
      }
    })
  }

  async addFavoriteFurnitureItem(userId: string, furnitureId: number) {
    return await this.prisma.favoriteFurniture.create({
      data: {
        userId: userId,
        furnitureId: furnitureId
      }
    })
  }

  async deleteFavoriteFurniture(userId: string, furnitureId: number) {
    await this.prisma.favoriteFurniture.deleteMany({
      where: {
        userId: userId,
        furnitureId: furnitureId
      }
    })
  }

  async getOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const ordersData = []

    for (const order of orders) {
      const productsInOrder = await this.prisma.orderedFurniture.findMany({
        where: {
          orderId: order.id
        }
      })

      ordersData.push(
        Object.assign(order, {
          items: productsInOrder
        })
      )
    }

    return ordersData
  }

  async makeOrder(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      }
    })

    if (!cart) {
      return null
    }

    const [currentProductsInCart, userOrder] = await Promise.all([
      this.prisma.cartFurniture.findMany({
        where: {
          cartId: cart.id
        }
      }),
      this.prisma.order.create({
        data: {
          userId: userId,
          name: 'Order'
        }
      })
    ])

    const productsInOrder = []
    for (const product of currentProductsInCart) {
      const createdFurniture = await this.prisma.orderedFurniture.create({
        data: {
          furnitureId: product.furnitureId,
          quintity: product.quintity,
          orderId: userOrder.id,
          color: product.color
        }
      })

      productsInOrder.push(createdFurniture)
    }

    await this.prisma.cartFurniture.deleteMany({
      where: {
        cartId: cart.id
      }
    })
    // await this.prisma.client.cart.deleteMany({
    //   where: {
    //     userId: res.locals.user.id
    //   }
    // })

    return {
      order: Object.assign(userOrder, { items: productsInOrder })
    }
  }

  async updateOrder(orderId: number, data: Record<string, unknown>) {
    await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: data
    })
  }

  async getCartItems(userId: string) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      }
    })

    if (!userCart) {
      return null
    }

    return await this.prisma.cartFurniture.findMany({
      where: {
        cartId: userCart.id
      }
    })
  }

  async addCartItem(cartItemProps: ICartItemProps) {
    const { userId, quintity, color, productId } = cartItemProps
    let userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      }
    })

    if (!userCart) {
      userCart = await this.prisma.cart.create({
        data: {
          userId: userId
        }
      })
    }

    const candidate = await this.prisma.cartFurniture.findFirst({
      where: {
        furnitureId: productId,
        color,
        cartId: userCart.id
      }
    })

    if (candidate) {
      await this.prisma.cartFurniture.updateMany({
        where: {
          furnitureId: productId,
          color,
          cartId: userCart.id
        },
        data: {
          quintity: candidate.quintity + quintity
        }
      })
    } else {
      await this.prisma.cartFurniture.create({
        data: {
          furnitureId: productId,
          quintity: quintity,
          cartId: userCart.id,
          color
        }
      })
    }
  }

  async deleteCartItem(props: IDeleteCartitemProps) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: props.userId
      }
    })

    if (!userCart) {
      return null
    }

    await this.prisma.cartFurniture.deleteMany({
      where: {
        furnitureId: props.productId,
        color: props.color,
        cartId: userCart.id
      }
    })
  }

  async makeReview(props: IMakeReviewProps) {
    const savedReview = await this.prisma.review.create({
      data: {
        text: props.text,
        score: parseFloat(props.score),
        userId: props.userId,
        furnitureId: props.furnitureId
      }
    })

    if (!props.attachments) {
      return
    }

    if (Array.isArray(props.attachments)) {
      props.attachments.map(async (attachment) => {
        const imageDataToSave = await this.imageService.prepare(attachment)
        await this.prisma.image.create({
          data: Object.assign(imageDataToSave, { reviewId: savedReview.id })
        })
      })

      return
    }
    const imageDataToSave = await this.imageService.prepare(props.attachments)
    await this.prisma.image.create({
      data: Object.assign(imageDataToSave, { reviewId: savedReview.id })
    })
  }
}
