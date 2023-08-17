import { check } from 'express-validator'
import { NextFunction, Router, Response, Request } from 'express'
import { inject, injectable } from 'inversify'

import { UserController } from './user.controller.js'
import { protect } from '../middleware/protect.js'
import { TYPES } from '../types.js'
import { LoggerService } from '../logger/logger.service.js'

interface IItem {
  endpoint: string
  handler: ((
    req: Request,
    res: Response<unknown, Record<string, unknown>>,
    next: NextFunction
  ) => void)[]
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}

@injectable()
export class UserRouter {
  private _router: Router

  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.UserController) private userController: UserController
  ) {
    this._router = Router()
    const values: IItem[] = [
      {
        method: 'post',
        endpoint: '/register',
        handler: [
          check('userName', 'User name provided is empty').notEmpty(),
          check('email', 'Email is incorrect').normalizeEmail().notEmpty().isEmail(),
          check('password', 'Password should have at least 8 characters').isLength({
            min: 8,
            max: 52
          }),
          this.userController.register.bind(userController)
        ]
      },
      {
        method: 'post',
        endpoint: '/login',
        handler: [this.userController.login.bind(userController)]
      },
      {
        method: 'get',
        endpoint: '/',
        handler: [protect, this.userController.getUserData.bind(userController)]
      },
      {
        method: 'put',
        endpoint: '/',
        handler: [protect, userController.updateUserData.bind(userController)]
      }
    ]

    values.forEach(({ method, endpoint, handler }) => {
      this._router[method](endpoint, handler)
      this.logger.log(`Mapped [${method}] /user${endpoint}`)
    })
  }

  get router(): Router {
    return this._router
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - userName
 *         - password
 *         - email
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: user name
 *         surname:
 *           type: string
 *           description: user surname
 *         userName:
 *           type: string
 *           description: user userName
 *         password:
 *           type: string
 *           description: user password
 *         email:
 *           type: string
 *           description: user email
 *         phone:
 *           type: string
 *           description: user phone
 *         city:
 *           type: string
 *           description: user city
 *         street:
 *           type: string
 *           description: user street
 *         house:
 *           type: string
 *           description: user house
 *         apartment:
 *           type: string
 *           description: user apartment
 *         photo:
 *            type: string
 *            format: binary
 *            description: user photo
 *         role:
 *           type: string
 *           description: user role
 *         emailConfirmed:
 *           type: boolean
 *           description: user emailConfirmed
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the book was updated
 *       example:
 *         name: Alan
 *         surname: Dewdney
 *         userName: Alan72Dewdney
 *         email: Alan72Dewdney@gmail.com
 *         phone: +1 602-282-6386
 *         city: Los Angeles
 *         street: Sunset blvd
 *         house: 13
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /user/register:
 *   post:
 *     summary: Registrates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User has been registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field: string
 *                   message: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /user/login:
 *   post:
 *     summary: Logins a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'mike41adams@gmail.com'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: User loggid in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'xxx'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Email was not provided | Password was not provided | User with email ${email} has not found | Provided password incorrect'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /user/:
 *   get:
 *     summary: Gets info about a new user
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: string
 *         required: true
 *     responses:
 *       200:
 *         description: User has been registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: 'Elen'
 *                 surname:
 *                   type: string
 *                   example: 'marko'
 *                 userName:
 *                   type: string
 *                   example: 'makarova55e'
 *                 email:
 *                   type: string
 *                   example: 'makarova55e@gmail.com'
 *                 phone:
 *                   type: string
 *                   example: '+1 9879878888'
 *                 city:
 *                   type: string
 *                   example: 'Los Angeles'
 *                 street:
 *                   type: string
 *                   example: 'Sunset blvd'
 *                 house:
 *                   type: string
 *                   example: '13'
 *                 apartment:
 *                   type: string
 *                   example: ''
 *                 emailConfirmed:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   example: "2023-08-03T07:52:33.809Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
* @swagger
* tags:
*   name: Users
*   description: The user managing API
* /user/:
*   put:
*     summary: Updates info about a new user
*     tags: [Users]
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
*               name:
*                 type: string
*                 example: 'Elen'
*               surname:
*                 type: string
*                 example: 'marko'
*               phone:
*                 type: string
*                 example: '+1 9879878888'
*               city:
*                 type: string
*                 example: 'Los Angeles'
*               street:
*                 type: string
*                 example: 'Sunset blvd'
*               house:
*                 type: string
*                 example: '13'
*               apartment:
*                 type: string
*                 example: ''
*               emailConfirmed:
*                 type: boolean
*                 example: true
*               wantsToReceiveEmailUpdates:
*                 type: boolean
*                 example: false
*     responses:
*       200:
*         description: User has been updated.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true

*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*/
