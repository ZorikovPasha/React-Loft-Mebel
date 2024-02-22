import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class YandexAuthGuard extends AuthGuard('yandex') {}
