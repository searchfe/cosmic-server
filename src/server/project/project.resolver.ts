import { TeamService } from '@server/team/team.service';
import { ProjectService } from './project.service';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { Project } from './schema/project.schema';
import { CreateProjectDTO, UpdateProjectDTO, QueryProjectDTO } from './schema/project.dto';

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
        return await this.projectService.findOne(id);
    }

    @Query(() => [Project], { name: 'projects' })
    async getAllProjects(@Args({ name: 'project', nullable: true }) project?: QueryProjectDTO) {
        return await this.projectService.findAll(project);
    }

    @Mutation(() => Project)
    async createProject(@Args('project') project: CreateProjectDTO) {
        const team = await this.teamService.findOne(project.team);
        if (!team || !team.id) {
            throw new UserInputError('team not found');
        }
        return await this.projectService.create(project);
    }

    @Mutation(() => Boolean)
    async updateProject( @Args('project') project: UpdateProjectDTO) {
        return await this.projectService.update(project);
    }

    @Mutation(() => Boolean)
    async deleteProject(@Args('id') id: string) {
        return (await this.projectService.delete(id)).ok;
    }
}
