import { Team } from '@server/team/domain/team.domain';
import { TeamService } from '@server/team/team.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationService } from './specification.service';
import { Specification } from './domain/specification.domain';
import { SpecificationResolver } from './specification.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Specification, Team])],
  providers: [SpecificationService, SpecificationResolver, TeamService]
})
export class SpecificationModule {}
