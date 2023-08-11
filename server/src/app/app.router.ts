import { Router } from 'express'
import { injectable, inject } from 'inversify'

import { protect } from '../middleware/protect.js'
import { AppController } from './app.controller.js'
import { TYPES } from '../types.js'
import { LoggerService } from '../logger/logger.service.js'

interface IItem {
  endpoint: string
  handler: ((...args: any[]) => void)[]
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}

@injectable()
export class AppRouter {
  private _router: Router

  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.AppController) private appController: AppController
  ) {
    this._router = Router()

    const values: IItem[] = [
      {
        method: 'get',
        endpoint: '/furniture',
        handler: [this.appController.getFilteredFurniture.bind(this.appController)]
      },
      {
        method: 'get',
        endpoint: '/furniture/:id',
        handler: [this.appController.getSingleFurniture.bind(this.appController)]
      },
      {
        method: 'post',
        endpoint: '/furniture',
        handler: [this.appController.createFurniture.bind(this.appController)]
      },
      {
        method: 'get',
        endpoint: '/favorites',
        handler: [protect, this.appController.getFavorites.bind(this.appController)]
      },
      {
        method: 'post',
        endpoint: '/favorites',
        handler: [protect, this.appController.addFavoriteItem.bind(this.appController)]
      },
      {
        method: 'delete',
        endpoint: '/favorites',
        handler: [protect, this.appController.deleteFavouriteItem.bind(this.appController)]
      },
      {
        method: 'get',
        endpoint: '/orders',
        handler: [protect, this.appController.getOrders.bind(this.appController)]
      },
      {
        method: 'post',
        endpoint: '/orders',
        handler: [protect, this.appController.addOrder.bind(this.appController)]
      },
      {
        method: 'delete',
        endpoint: '/orders',
        handler: [protect, this.appController.deleteOrder.bind(this.appController)]
      },
      {
        method: 'get',
        endpoint: '/cart',
        handler: [protect, this.appController.getCartItems.bind(this.appController)]
      },
      {
        method: 'post',
        endpoint: '/cart',
        handler: [protect, this.appController.addCartItem.bind(this.appController)]
      },
      {
        method: 'delete',
        endpoint: '/cart',
        handler: [protect, this.appController.removeCartItem.bind(this.appController)]
      }
    ]

    values.forEach(({ method, endpoint, handler }) => {
      this._router[method](endpoint, handler)
      this.logger.log(`Mapped [${method}] /api${endpoint}`)
    })

    // router.get('/furniture', this.appController.getFilteredFurniture.bind(this.appController))

    // router.get('/furniture/:id', this.appController.getSingleFurniture.bind(this.appController))

    // router.post('/furniture', this.appController.createFurniture.bind(this.appController))

    // router.get('/favorites', protect, this.appController.getFavorites.bind(this.appController))

    // router.post('/favorites', protect, this.appController.addFavoriteItem.bind(this.appController))

    // router.delete('/favorites', protect, this.appController.deleteFavouriteItem.bind(this.appController))

    // router.get('/orders', protect, this.appController.getOrders.bind(this.appController));

    // router.post('/orders', protect, this.appController.addOrder.bind(this.appController));

    // router.delete('/orders', protect, this.appController.deleteOrder.bind(this.appController));

    // router.get('/cart', protect, this.appController.getCartItems.bind(this.appController))

    // router.post('/cart', protect, this.appController.addCartItem.bind(this.appController))
    // router.put('/cart', protect, this.appController.addCartItem)

    // router.delete('/cart', protect, this.appController.removeCartItem.bind(this.appController))
  }

  public get router(): Router {
    return this._router
  }
}

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: The favorite furniture managing API
 * /api/favorites/:
 *   get:
 *     summary: Getting favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     id: number
 *                     example: 1
 *                   userId:
 *                     id: number
 *                     example: 1
 *                   furnitureId:
 *                     id: number
 *                     example: 2
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: The favorite furniture managing API
 * /api/favorites/:
 *   post:
 *     summary: Add favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   id: string
 *                   example: "Item added to favorites successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: The favorite furniture managing API
 * /api/favorites/:
 *   delete:
 *     summary: Deleteing favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   id: string
 *                   example: "Item removed from favorites successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /api/orders/:
 *   get:
 *     summary: Getting user's orders
 *     tags: [Orders]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     id: number
 *                     example: 1
 *                   userId:
 *                     id: number
 *                     example: 1
 *                   name:
 *                     id: string
 *                     example: "Order"
 *                   status:
 *                     id: string
 *                     example: "Created"
 *                   createdAt:
 *                     id: string
 *                     example: ""
 *                   updatedAt:
 *                     id: string
 *                     example: ""
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /api/orders/:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Order created successfully'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /api/orders/:
 *   delete:
 *     summary: Deleteing user's order
 *     tags: [Orders]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Orders.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart managing API
 * /api/cart/:
 *   get:
 *     summary: Getting items in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     id: number
 *                     example: 1
 *                   furnitureId:
 *                     id: number
 *                     example: 1
 *                   cartId:
 *                     id: number
 *                     example: 1
 *                   quintity:
 *                     id: number
 *                     example: 10
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart managing API
 * /api/cart/:
 *   post:
 *     summary: Adding item to cart
 *     tags: [Cart]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *                 example: 2
 *               quintity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Item was successfully added to cart'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Product id was not provided'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart managing API
 * /api/cart/:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: an authorization header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Item was successfully removed fromm cart | Nothing to delete from'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Product id was not provided'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'This could be any string'
 */
