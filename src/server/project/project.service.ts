import { Project } from './schema/project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoProjection } from '@server/common/types';
import { isSuccessfulQuery } from '@server/common/util/db';
import { Model, Types } from 'mongoose';
import { CreateProjectDTO, UpdateProjectDTO } from './schema/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<Project>
    ) {}

    async create(project: CreateProjectDTO) {
        const newProject = new this.projectModel(project);
        return await newProject.save();
    }

    async findOne(projectId: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.projectModel.findById(projectId).lean().exec();
        }
        return await this.projectModel.findById(projectId).select(fields).lean().exec();
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
