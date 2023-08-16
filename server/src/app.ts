import express, { Express } from 'express'
import { Server } from 'http'
import { injectable, inject } from 'inversify'
import { AppRouter } from './app/app.router.js'
import { UserRouter } from './user/user.router.js'
import { errorHandler } from './middleware/error.handler.js'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

import { TYPES } from './types.js'
import { LoggerService } from './logger/logger.service.js'
import { UploadRouter } from './upload/upload.router.js'

@injectable()
export class App {
  app: Express
  server: Server
  port: number

  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.AppRouter) private appRouter: AppRouter,
    @inject(TYPES.UploadRouter) private uploadRouter: UploadRouter,
    @inject(TYPES.UserRouter) private userRouter: UserRouter
  ) {
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 5000
  }

  public init(specs: {} | Record<string, unknown>): void {
    this.app = express()

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
    this.app.use(fileUpload())
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    this.app.use('/user', this.userRouter.router)
    this.app.use('/api', this.appRouter.router)
    this.app.use('/uploads', this.uploadRouter.router)
    this.app.use(errorHandler)

    this.server = this.app.listen(this.port)
    this.logger.log(`🔥 Server has been started on 0.0.0.0:${this.port} 🔥`)
  }
}
