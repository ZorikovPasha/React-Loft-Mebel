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
