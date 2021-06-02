import { Test, TestingModule } from '@nestjs/testing';
import { LayoutResolver } from './layout.resolver';

describe('LayoutResolver', () => {
  let resolver: LayoutResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LayoutResolver],
    }).compile();

    resolver = module.get<LayoutResolver>(LayoutResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
