import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controlller'
import { PrismaModule } from '../prisma/prisma.module'
import { YandexStrategy } from './yandex.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, YandexStrategy],
  exports: [AuthService]
})
export class AuthModule {}
