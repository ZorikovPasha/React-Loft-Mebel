import { NextFunction, Request, Response } from 'express'
import { injectable, inject } from 'inversify'

import { ApiError } from '../error/api.error.js'
import { LoggerService } from '../logger/logger.service.js'
import { TYPES } from '../types.js'
import { IUploadController } from './upload.controller.interface.js'
import { PrismaService } from '../prisma.service.js'

@injectable()
export class UploadController implements IUploadController {
  constructor(
    @inject(TYPES.ILoggerService) public logger: LoggerService,
    @inject(TYPES.Prisma) private prisma: PrismaService
  ) {}

  async getUpload(
    req: Request<{ url?: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<Record<string, string>, Record<string, unknown>>> {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      if (!req.params.url) {
        return next(ApiError.badRequest('Url was not provided'))
      }

      const media = await this.prisma.client.image.findFirst({
        where: {
          url: `/uploads/${req.params.url}`
        }
      })

      if (!media) {
        return res.status(404)
      }

      return res.status(200).contentType(media.mime).end(media.data)
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }
}
