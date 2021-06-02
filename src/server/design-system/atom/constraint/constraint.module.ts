import { Module } from '@nestjs/common';
import { ConstraintResolver } from './constraint.resolver';

@Module({
  providers: [ConstraintResolver]
})
export class ConstraintModule {}
