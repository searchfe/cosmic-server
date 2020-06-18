import { Test, TestingModule } from '@nestjs/testing';
import {  MemberResolver } from './user.resolver';

describe('MemberResolver', () => {
  let resolver: MemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberResolver],
    }).compile();

    resolver = module.get<MemberResolver>(MemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
