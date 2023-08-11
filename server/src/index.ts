import 'dotenv/config'
import 'reflect-metadata'
import swaggerJsdoc from 'swagger-jsdoc'

import { Container, ContainerModule, interfaces } from 'inversify'
import { LoggerService } from './logger/logger.service.js'
import { TYPES } from './types.js'
import { AppController } from './app/app.controller.js'
import { UserController } from './user/user.controller.js'
import { UploadController } from './upload/upload.controller.js'
import { App } from './app.js'
import { AppRouter } from './app/app.router.js'
import { UploadRouter } from './upload/upload.router.js'
import { UserRouter } from './user/user.router.js'

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'React Loft Furniture Express API with Swagger',
      version: '0.1.0',
      description: 'This is a CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

const specs = swaggerJsdoc(options)

const appModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(TYPES.ILoggerService).to(LoggerService)
  bind(TYPES.AppRouter).to(AppRouter)
  bind(TYPES.UserController).to(UserController)
  bind(TYPES.UploadRouter).to(UploadRouter)
  bind(TYPES.UserRouter).to(UserRouter)
  bind(TYPES.UploadController).to(UploadController)
  bind(TYPES.AppController).to(AppController)
  bind<App>(TYPES.App).to(App)
})

const bootstrap = () => {
  const appContainer = new Container()
  appContainer.load(appModule)

  const app = appContainer.get<App>(TYPES.App)
  app.init(specs)
  return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
