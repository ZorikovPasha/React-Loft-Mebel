import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { FurnitureController } from './furniture.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilsModule } from '../utils/utils.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [PrismaModule, UtilsModule, ImageModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
