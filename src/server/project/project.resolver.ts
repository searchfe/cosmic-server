// import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
// import { Inject } from '@nestjs/common';
// import { Project } from './domain/project.domain';
// import { ProjectInput } from './domain/project.input';
// import { ProjectService } from './project.service';

// // TODO data validate
// @Resolver(of => Project)
// export class ProjectResolver {
//     constructor(@Inject(ProjectService)
//         private readonly projectService: ProjectService,
//     ) {}

//     @Query(returns => Project, { name: 'project' })
//     async getProject(@Args({ name: 'id', type: () => String }) id: string):Promise<Project> {
//         return await this.projectService.findOne(id);
//     }

//     @Mutation(returns => Project)
//     async createProject(@Args('project') project: ProjectInput) {
//       await this.projectService.create(project);
//       return project;
//     }

//     @Mutation(returns => Project)
//     async modifyProject(@Args('project') project: ProjectInput) {
//       return this.projectService.modify(project);
//     }

// }
