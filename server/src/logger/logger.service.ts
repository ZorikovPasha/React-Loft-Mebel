import Logger from 'pino'
import type { Logger as ILogger } from 'pino'
import { injectable } from 'inversify'

@injectable()
export class LoggerService {
  private logger: ILogger

  constructor() {
    this.logger = Logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          singleLine: true,
          customPrettifiers: {}
        }
      }
    })
  }

  log(...args: unknown[]) {
    this.logger.info(args)
  }

  error(...args: unknown[]) {
    this.logger.error(args)
  }
  warn(...args: unknown[]) {
    this.logger.warn(args)
  }
}
