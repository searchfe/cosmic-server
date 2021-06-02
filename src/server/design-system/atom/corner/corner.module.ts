import { Module } from '@nestjs/common';
import { CornerResolver } from './corner.resolver';

@Module({
  providers: [CornerResolver]
})
export class CornerModule {}
