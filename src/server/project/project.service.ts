import { Injectable } from '@nestjs/common';
import { Project } from './domain/project.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

type PartialProject = Partial<Project>;
@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project)
    private readonly projectRepository: Repository<Project>) {}

    async create(project: PartialProject): Promise<InsertResult> {
        return await this.projectRepository.insert(project);
    }

    async modify(id: PartialProject): Promise<UpdateResult>
    async modify(id: string, projectInput: PartialProject): Promise<UpdateResult>
    async modify(id: PartialProject | string, projectInput?: PartialProject): Promise<UpdateResult> {
        projectInput = projectInput || id as PartialProject;
        const project = await this.projectRepository.findOne(projectInput.id || id as string);
        return await this.projectRepository.update(project, project);
    }

    async findOne(id: string): Promise<Project> {
        return await this.projectRepository.findOne(id);
    }
}
