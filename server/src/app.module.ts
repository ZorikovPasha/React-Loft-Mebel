import { MiddlewareConsumer, Module, NestModule, Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { FurnitureModule } from './furniture/furniture.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { UploadModule } from './upload/upload.module'
import { UtilsModule } from './utils/utils.module'
import { ImageModule } from './image/image.module'
import { PrismaModule } from './prisma/prisma.module'

@Injectable()
class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime()

    const { ip, method, originalUrl } = request
    response.on('finish', () => {
      const { statusCode } = response
      const diff = process.hrtime(startAt)
      const responseTime = Math.round(diff[0] * 1e3 + diff[1] * 1e-6)

      this.logger.log(`[${method}] ${originalUrl} ip:${ip}: ${statusCode} totalTime:${responseTime}ms`)
    })

    next()
  }
}

@Module({
  imports: [FurnitureModule, PrismaModule, ImageModule, UtilsModule, UploadModule, UserModule, AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
