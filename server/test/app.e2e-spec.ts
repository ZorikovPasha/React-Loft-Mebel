import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { UtilsModule } from '../src/utils/utils.module'
import { ImageModule } from '../src/image/image.module'
import { FurnitureController } from '../src/furniture/furniture.controller'
import { FurnitureService } from '../src/furniture/furniture.service'
import { PrismaModule } from '../src/prisma/prisma.module'
// import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UtilsModule, ImageModule],
      controllers: [FurnitureController],
      providers: [FurnitureService]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('simple test', () => {
    expect(0).toEqual(0)
  })
})
