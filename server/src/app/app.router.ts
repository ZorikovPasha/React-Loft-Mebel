import { Request, Response, NextFunction, Router } from 'express'
import { injectable, inject } from 'inversify'

import { AppController } from './app.controller.js'
import { TYPES } from '../types.js'
import { LoggerService } from '../logger/logger.service.js'

interface IItem {
  endpoint: string
  handler: ((req: Request, res: Response, next: NextFunction) => void)[]
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
        method: 'delete',
        endpoint: '/furniture/:id',
        handler: [this.appController.deleteFurniture.bind(this.appController)]
      }
    ]

    values.forEach(({ method, endpoint, handler }) => {
      this._router[method](endpoint, handler)
      this.logger.log(`Mapped [${method}] /api${endpoint}`)
    })
  }

  public get router(): Router {
    return this._router
  }
}
