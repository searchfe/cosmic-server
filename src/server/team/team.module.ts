import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { PermissionService } from './permission.service';
import { Team } from './domain/team.domain';
import { TeamPermisson } from './domain/permission.domain';
import { TeamResolver } from './team.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamPermisson])],
  providers: [TeamService, TeamResolver, PermissionService]
})
export class TeamModule {}
