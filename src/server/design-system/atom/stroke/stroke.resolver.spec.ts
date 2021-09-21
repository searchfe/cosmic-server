import { Test, TestingModule } from '@nestjs/testing';
import { StrokeResolver } from './stroke.resolver';

describe('StrokeResolver', () => {
  let resolver: StrokeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrokeResolver],
    }).compile();

    resolver = module.get<StrokeResolver>(StrokeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
