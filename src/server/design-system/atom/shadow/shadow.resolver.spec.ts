import { Test, TestingModule } from '@nestjs/testing';
import { ShadowResolver } from './shadow.resolver';

describe('ShadowResolver', () => {
  let resolver: ShadowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShadowResolver],
    }).compile();

    resolver = module.get<ShadowResolver>(ShadowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
