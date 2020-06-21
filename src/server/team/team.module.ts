import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { Team } from './domain/team.domain';
import { TeamResolver } from './team.resolver';
import { UserService } from '@server/user/user.service';
import { User } from '@server/user/domain/user.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User])],
  providers: [TeamService, UserService, TeamResolver]
})
export class TeamModule {}
