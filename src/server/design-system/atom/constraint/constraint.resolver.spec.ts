import { Test, TestingModule } from '@nestjs/testing';
import { ConstraintResolver } from './constraint.resolver';

describe('ConstraintResolver', () => {
  let resolver: ConstraintResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstraintResolver],
    }).compile();

    resolver = module.get<ConstraintResolver>(ConstraintResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
