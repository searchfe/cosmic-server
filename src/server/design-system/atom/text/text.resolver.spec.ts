import { Test, TestingModule } from '@nestjs/testing';
import { TextResolver } from './text.resolver';

describe('TextResolver', () => {
  let resolver: TextResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextResolver],
    }).compile();

    resolver = module.get<TextResolver>(TextResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
