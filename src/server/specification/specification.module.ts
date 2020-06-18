import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationService } from './specification.service';
import { Specification } from './domain/specification.domain';
import { SpecificationResolver } from './specification.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Specification])],
  providers: [SpecificationService, SpecificationResolver]
})
export class SpecificationModule {}
