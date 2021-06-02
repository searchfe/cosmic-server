import { Test, TestingModule } from '@nestjs/testing';
import { ColorResolver } from './color.resolver';

describe('ColorResolver', () => {
  let resolver: ColorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorResolver],
    }).compile();

    resolver = module.get<ColorResolver>(ColorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
