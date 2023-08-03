import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../error/api.error.js'
import { CartItemDto } from '../dto/cart.item.dto.js'
import { prismaClient } from '../prisma/client.js'

class AppController {
  mappedValues: Record<string, string>
  constructor(values: Record<string, string>) {
    this.mappedValues = values
  }

  // async getFilteredFurniture(req: Request, res: Response) {
  //   try {
  //     const findCriteria = Object.keys(req.query).reduce((accum, key) => {
  //       if (key === 'color' || key === 'sort') return accum;
  //         return {...accum, [this.mappedValues[key]]: req.query[key]};
  //     }, {});

  //     let furnitureItems;

  //     switch (req.query.sort) {
  //       case 'asc':
  //         furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: 1 });
  //         break;
  //       case 'desc':
  //         furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: -1 });
  //         break;
  //       case 'pop':
  //         furnitureItems = await Furniture.find(findCriteria).sort({ rating: -1 });
  //         break;
  //       default:
  //         furnitureItems = await Furniture.find(findCriteria);
  //         break;
  //       }

  //     res.json(furnitureItems);
  //   } catch (err) {
  //     return ApiError.internal(res, err as Error);
  //   }
  // }

  async getSingleFurniture(req: Request<{}, {}, {}, { id?: string }>, res: Response) {
    try {
      const furnitureItem = await prismaClient.furniture.findFirst({
        where: {
          id: parseInt(req.query.id ?? '')
        }
      })
      res.send(furnitureItem)
    } catch (err) {
      return ApiError.internal(err as Error)
    }
  }

  async writeFavoriteItem(
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body
      if (!id) {
        return next(ApiError.badRequest('No id provided'))
      }

      // await User.updateOne({ _id: res.locals.user._id }, { $push: { favorites: id} });
      res.status(200).json({ message: 'Item added to favorites successfully' })
    } catch (err) {
      return ApiError.internal(err as Error)
    }
  }

  async getFavorites(req: Request, res: Response) {
    try {
      const { favorites } = res.locals.user
      res.json({ favorites })
    } catch (error) {
      return ApiError.internal(error as Error)
    }
  }

  async addCartItem(req: Request<{}, {}, CartItemDto>, res: Response, next: NextFunction) {
    try {
      const { id, colors, quintity, dimensions, price } = req.body

      if (!id || !colors || !quintity || !dimensions || !price) {
        return next(ApiError.badRequest('Provided incomplete data'))
      }

      // const user = await User.findOne({ _id: req.res.locals._id });
      // const identicalItem = user.cartItems.filter(cartItem => cartItem.id === id)

      // if (identicalItem.length) {
      //   await User.updateOne({ _id: res.locals.user._id,
      //     "cartItems": { "$elemMatch": { "id": id }}}, { "$set": { "cartItems.$.quintity": identicalItem[0].quintity + 1 }}
      //   );
      // } else {
      //   await User.updateOne({ _id: res.locals.user._id }, { $push: { cartItems: {
      //     id,
      //     colors,
      //     quintity,
      //     dimensions,
      //     price,
      //   }} });
      // }
      res.status(200).json({ message: 'Item was successfully added to cart' })
    } catch (error) {
      return ApiError.internal(error as Error)
    }
  }

  async getCartItems(req: Request, res: Response, next: NextFunction) {
    try {
      // if (res.locals.user) {
      //   const { cartItems } = await User.findOne({ _id: res.locals.user._id })
      //   delete cartItems._id
      //   res.json({ items: cartItems })
      // }
    } catch (error) {
      return next(ApiError.internal(error as Error))
    }
  }

  async removeCartItem(req: Request<{}, {}, { id?: number }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      if (!id) {
        return next(ApiError.badRequest('Id was not provided'))
      }
      // const itemsInCart = res.locals.user.cartItems.filter(cartItem => cartItem.id !== id );
      // itemsInCart.save()
      res.status(200).json({ message: 'Item was successfully removed fromm cart' })
    } catch (err) {
      return ApiError.internal(err as Error)
    }
  }

  // async processOrder(req: Request, res: Response) {
  //   try {
  //     const { items } = req.body;
  //     for(let i = 0; i < items.length; i++) {
  //       const order = new Order({
  //         userId: res.locals.user._id,
  //         ...items[i]
  //       });
  //       await order.save();
  //     }

  //     res.status(201).json({ message: "Order created successfully" })
  //   } catch (err) {
  //     return ApiError.internal(res, err as Error);
  //   }
  // }

  // async getOrders(req: Request, res: Response) {
  //   try {
  //     const orders = await Order.find({ userId: res.locals.user._id });
  //     res.send({ orders });
  //   } catch (err) {
  //     return ApiError.internal(res, err as Error);
  //   }
  // }
}

export const appController = new AppController({
  room: 'room',
  material: 'material',
  type: 'type.value',
  brand: 'brand'
})
