import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { ImageModule } from '../image/image.module'
import { FurnitureModule } from '../furniture/furniture.module'

@Module({
  imports: [PrismaModule, ImageModule, FurnitureModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
