import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
