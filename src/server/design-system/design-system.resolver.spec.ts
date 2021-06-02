import { Test, TestingModule } from '@nestjs/testing';
import { DesignSystemResolver } from './design-system.resolver';

describe('DesignSystemResolver', () => {
  let resolver: DesignSystemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignSystemResolver],
    }).compile();

    resolver = module.get<DesignSystemResolver>(DesignSystemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
