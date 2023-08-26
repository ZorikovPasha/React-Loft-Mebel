import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'

import { TYPES } from './types.js'
import { LoggerService } from './logger/logger.service.js'

@injectable()
export class PrismaService {
  client: PrismaClient

  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    this.client = new PrismaClient()
  }

  async connect() {
    try {
      await this.client.$connect()
      this.logger.log(`[PrismaService] ⚡ Successfully connected to database! ⚡`)
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[PrismaService] Error when trying to connect to databse! ${error.message}`
        )
      }
    }
  }
}
