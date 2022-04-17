import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { UserService } from './../user/user.service';
import {
    AddTeamMemberDTO,
    CreateTeamDTO,
    PermissionEnum,
    UpdateTeamDTO,
    QueryTeamDTO
} from './schema/team.dto';
import { Team } from './schema/team.schema';
import { TeamService } from './team.service';


@Resolver(() => Team)
export class TeamResolver {
    constructor(
        @Inject(TeamService)
        private readonly teamService: TeamService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    @Query(() => Team, { name: 'team' })
    async getTeam(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.teamService.findOne(id);
    }

    @Query(() => [Team], { name: 'teams' })
    async getAllTeams(
        @Args({ type: () => QueryTeamDTO, name: 'query', nullable: true })
        query: QueryTeamDTO
    ) {
        return await this.teamService.findAll(query);
    }

    @Mutation(() => Team)
    async createTeam(@Args('team') teamInput: CreateTeamDTO): Promise<Team> {
        // user validation logit belongs to access control, move it in future
        // const owner = await this.userService.findOne(teamInput.owner);
        // if (!owner) {
        //     throw new UserInputError('user not found');
        // }
        const newTeam = { name: teamInput.name, members: [] };
        return await this.teamService.create(newTeam);
    }

    @Mutation(() => Boolean)
    async updateTeam(@Args('team') teamInput: UpdateTeamDTO) {
        const targetTeam = await this.teamService.findOne(teamInput.id);
        if (!targetTeam) {
            throw new UserInputError('team not found');
        }
        const result = await this.teamService.update({
            id: targetTeam.id,
            name: teamInput.name,
        });
        if (result) {
            return true;
        }
        return false;
    }

    @Mutation(() => Boolean)
    async createMember(
        @Args('teamId') teamId: string,
        @Args({ name: 'member', type: () => AddTeamMemberDTO })
        member: AddTeamMemberDTO,
    ) {
        const user = await this.userService.findOne({ id: member.user });
        if (!user) {
            throw new UserInputError('user not found');
        }
        const team = await this.teamService.findOne(teamId);
        if (!team) {
            throw new UserInputError('team not found');
        }
        return await this.teamService.createMember(team._id, {
            user: member.user,
            permission: member.permission || PermissionEnum.NORMAL,
        });
    }
}
