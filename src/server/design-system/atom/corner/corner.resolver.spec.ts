import { Test, TestingModule } from '@nestjs/testing';
import { CornerResolver } from './corner.resolver';

describe('CornerResolver', () => {
  let resolver: CornerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CornerResolver],
    }).compile();

    resolver = module.get<CornerResolver>(CornerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
