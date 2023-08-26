import { LoggerService } from '../logger/logger.service'
import { TYPES } from '../types'
import { IConfigService } from './config.interface'
import { config, DotenvParseOutput } from 'dotenv'
import { inject } from 'inversify'

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput
  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    const result = config()

    if (result.error) {
      this.logger.error('[ConfigService] Cannot read .env file')
    } else {
      this.config = result.parsed as DotenvParseOutput
      this.logger.log('[ConfigService] .env config loaded')
    }
  }
  get(key: string): string | undefined {
    return this.config[key]
  }
}
