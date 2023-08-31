import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { ApiError } from '../error/api.error.js'
import { IProtector, UncodedPayload } from './protect.interface.js'
import { TYPES } from '../types.js'
import { LoggerService } from '../logger/logger.service.js'
import { PrismaService } from '../prisma.service.js'

@injectable()
export class Protector implements IProtector {
  constructor(
    @inject(TYPES.ILoggerService) private logger: LoggerService,
    @inject(TYPES.Prisma) private prisma: PrismaService
  ) {}

  async checkAuthorization(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`[Protector]: [${req.method}] ${req.path}`)

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json('Token was not provided')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json('Token was not provided')
    }

    try {
      const uncodedPayload = jwt.verify(token, process.env.JWT_SECRET ?? '') as UncodedPayload
      // const uncodedPayload = jwt.verify(token, process.env.JWT_SECRET ?? '', (error, payload) => {}) as UncodedPayload

      const user = await this.prisma.client.user.findFirst({
        where: {
          id: uncodedPayload.id
        }
      })
      if (!user) {
        return res.status(401).json('User was not found')
      }
      res.locals.user = user
      next()
    } catch (error) {
      this.logger.error(`[Protector]: ${req.method} [${req.path}], Error 401 : ${error}`)
      if (error instanceof Error) {
        return next(ApiError.badRequest(error.message))
      }
    }
  }
}
