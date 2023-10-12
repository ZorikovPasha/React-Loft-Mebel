import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Module({
  exports: [UtilsService],
  providers: [UtilsService],
})
export class UtilsModule {}
