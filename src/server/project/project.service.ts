import { Project } from './schema/project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoProjection } from '@server/common/types';
import { isSuccessfulQuery } from '@server/common/util/db';
import { Model, Types, FilterQuery } from 'mongoose';
import { CreateProjectDTO, UpdateProjectDTO } from './schema/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<Project>
    ) {}

    async create(project: CreateProjectDTO) {
        return await new this.projectModel({
            ...project,
            team: Types.ObjectId(project.team),
            parent: Types.ObjectId(project.parent),
        }).save();
    }

    async findOne(projectId: string, fields?: MongoProjection<Project>) {
        if (!fields) {
            return await this.projectModel.findById(projectId).lean(false).exec();
        }
        return await this.projectModel.findById(projectId).select(fields).lean(false).exec();
    }

    async findAll(project: Partial<CreateProjectDTO> = {}) {
        const query: FilterQuery<Project> = project;
        if (project.team) {
            query.team = Types.ObjectId(project.team);
        }
        if (project.parent) {
            query.parent = Types.ObjectId(project.parent);
        }
        return await this.projectModel.find(query).lean(false).exec();
    }

    async update(project: UpdateProjectDTO) {
        const newProject = {
            ...project
        };
        delete newProject.id;
        const result =  await this.projectModel.updateOne({ '_id': project.id }, newProject).exec();
        if (isSuccessfulQuery(result)) {
            return true;
        }
        return false;
    }
}
