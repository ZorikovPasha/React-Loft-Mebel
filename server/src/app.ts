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
    this.app = express()
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 5000
  }

  public async init(specs: {} | Record<string, unknown>) {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
    app.use(fileUpload())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    app.use('/user', this.userRouter.router)
    app.use('/api', this.appRouter.router)
    app.use('/uploads', this.uploadRouter.router)
    app.use(errorHandler)

    this.server = this.app.listen(this.port)
    this.logger.log(`🔥 Server has been started on 0.0.0.0:${this.port} 🔥`)
  }
}
