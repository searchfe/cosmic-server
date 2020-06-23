import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { UserService } from './../user/user.service';
import { Team, TeamMemer } from './domain/team.domain';
import { CreateTeamInput, CreateTeamMemberInput, PermissionEnum, UpdateTeamInput } from './domain/team.input';
import { TeamService } from './team.service';

@Resolver(of => Team)
export class TeamResolver {
    constructor(
        @Inject(TeamService)
        private readonly teamService: TeamService,
        @Inject(UserService)
        private readonly userService: UserService
    ) {}

    @Query(returns => Team, { name: 'team' })
    async getTeam(
        @Args({ name: 'id', type: () => String }) id: string,
    ): Promise<Team> {
        return await this.teamService.findOne(id);
    }

    @Mutation(returns => Team)
    async addTeam(@Args('team') teamInput: CreateTeamInput): Promise<Team> {
        // user validation logit belongs to access control, move it in future
        const owner = await this.userService.findOne(teamInput.owner);
        if (!owner) {
            throw new UserInputError('user not found');
        }
        const newTeam = { name: teamInput.name, owner: owner.id, members: [] };
        return await this.teamService.create(newTeam);
    }

    @Mutation(returns => Team)
    async updateTeam(@Args('team') teamInput: UpdateTeamInput): Promise<Team> {
        const targetTeam = await this.teamService.findOne(teamInput.id);
        if (!targetTeam) {
            throw new UserInputError('team not found');
        }
        return await this.teamService.update({
            id: targetTeam.id,
            name: teamInput.name,
        });
    }

    @Mutation(returns => TeamMemer)
    async addMember(
        @Args('teamId') teamId: string,
        @Args('member') member: CreateTeamMemberInput
    ) {
        const user = await this.userService.findOne(member.user);
        if (!user) {
            throw new UserInputError('user not found');
        }
        const team = await this.teamService.findOne(teamId);
        if (!team) {
            throw new UserInputError('team not found');
        }
        if (team.members.filter(m => m.user === user.id).length > 0) {
            throw new UserInputError('user already in team');
        }
        await this.teamService.update({
            id: team.id,
            members: [
                ...team.members,
                {
                    user: user.id,
                    permission: PermissionEnum.NORMAL,
                }
            ],
        });
        return member;
    }
}
