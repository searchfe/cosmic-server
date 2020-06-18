import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { Team } from './domain/team.domain';
import { User } from '../user/domain/user.domain';
import { TeamInput } from './domain/team.input';
import { TeamService } from './team.service';

type PartialTeam = Partial<Team>;

// TODO data validate
@Resolver(of => Team)
export class TeamResolver {
    constructor(
        @Inject(TeamService)
        private readonly teamService: TeamService,
    ) {}

    @Query(returns => Team, { name: 'team' })
    async getTeam(
        @Args({ name: 'id', type: () => String }) id: string,
    ): Promise<Team> {
        return await this.teamService.findOne(id);
    }

    @Mutation(returns => Team)
    async addTeam(
        @Args('team') team: TeamInput,
        userId: string,
    ): Promise<PartialTeam> {
        const user = new User(); // TODO set user in requet context
        const result = await this.teamService.create(team, user);
        return { ...team, ...result };
    }

    @Mutation(returns => Team)
    async modifyTeam(@Args('team') team: TeamInput): Promise<PartialTeam> {
        return this.teamService.update(team);
    }
}
