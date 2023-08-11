import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '../logger/logger.service'

export interface IUploadController {
  logger: LoggerService

  getUpload: (req: Request<{}, {}, {}, { url?: string }>, res: Response, next: NextFunction) => void
}
