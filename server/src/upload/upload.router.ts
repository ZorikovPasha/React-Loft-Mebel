import { Router, Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'

import { UploadController } from './upload.controller.js'
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
export class UploadRouter {
  private _router: Router

  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.UploadController) private uploadController: UploadController
  ) {
    this._router = Router()

    const values: IItem[] = [
      {
        method: 'get',
        endpoint: '/:url',
        handler: [this.uploadController.getUpload.bind(this.uploadController)]
      }
    ]

    values.forEach(({ method, endpoint, handler }) => {
      this._router[method](endpoint, handler)
      this.logger.log(`Mapped [${method}] /uploads${endpoint}`)
    })
  }

  get router(): Router {
    return this._router
  }
}

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: The uploads managing API
 * /uploads/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     summary: gets upload
 *     tags: [Uploads]
 *     responses:
 *       200:
 *         description: Upload has been send.
 *         content:
 *           image:
 *             schema:
 *               type: string
 *               example: binary
 *       400:
 *         description: Url was not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Url was not provided'
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
