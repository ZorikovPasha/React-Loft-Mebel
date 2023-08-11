import { NextFunction, Request, Response } from 'express'
import { injectable, inject } from 'inversify'

import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'
import { LoggerService } from '../logger/logger.service.js'
import { TYPES } from '../types.js'
import { IUploadController } from './upload.controller.interface.js'

@injectable()
export class UploadController implements IUploadController {
  constructor(@inject(TYPES.ILoggerService) public logger: LoggerService) {}

  async getUpload(req: Request<{}, {}, {}, { url?: string }>, res: Response, next: NextFunction) {
    try {
      if (!req.query.url) {
        return next(ApiError.badRequest('Url was not provided'))
      }

      const media = await prismaClient.image.findFirst({
        where: {
          url: req.query.url
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
