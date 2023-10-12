import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$connect().then(() => {
      console.log(`[PrismaService] ⚡ Successfully connected to database! ⚡`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
