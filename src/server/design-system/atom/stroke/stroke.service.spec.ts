import { Test, TestingModule } from '@nestjs/testing';
import { StrokeService } from './stroke.service';

describe('StrokeService', () => {
  let service: StrokeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrokeService],
    }).compile();

    service = module.get<StrokeService>(StrokeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
