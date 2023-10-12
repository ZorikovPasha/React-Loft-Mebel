import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureService } from './furniture.service';

describe('FurnitureService', () => {
  let service: FurnitureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnitureService],
    }).compile();

    service = module.get<FurnitureService>(FurnitureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
