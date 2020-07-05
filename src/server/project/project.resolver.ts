import { TeamService } from '@server/team/team.service';
import { fileds2MongoQuery } from '@server/common/util/db';
import { ProjectService } from './project.service';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { Project } from './schema/project.schema';
import { CreateProjectDTO, UpdateProjectDTO } from './schema/project.dto';

@Resolver(() => Project)
export class ProjectResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(TeamService)
        private readonly teamService: TeamService
    ) {}

    @Query(() => Project, { name: 'project' })
    async getProject(@Args({ name: 'id', type: () => String }) id: string) {
        const result = await this.projectService.findOne(id);
        return {
            ...result,
            id: result._id
        };
    }

    @Mutation(() => Project)
    async createProject(@Args('project') project: CreateProjectDTO) {
        const team = await this.teamService.findOne(project.team);
        if (!team || !team._id) {
            throw new UserInputError('team not found');
        }
        return await this.projectService.create(project);
    }

    @Mutation(() => Boolean)
    async updateProject( @Args('project') project: UpdateProjectDTO) {
        return await this.projectService.update(project);
    }
}
