import { Test, TestingModule } from '@nestjs/testing';
import { DesignSystemService } from './design-system.service';

describe('DesignSystemService', () => {
  let service: DesignSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignSystemService],
    }).compile();

    service = module.get<DesignSystemService>(DesignSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
