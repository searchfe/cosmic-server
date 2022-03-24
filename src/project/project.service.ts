import type { ProjectPlus } from './schema/project.schema';
import { Project } from './schema/project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isSuccessfulQuery } from '@/common/util/db';
import { Model, Types } from 'mongoose';

import type { FilterQuery,  LeanDocument } from 'mongoose';
import type { MongoProjection } from '@/common/types';
import type { CreateProjectDTO, UpdateProjectDTO } from './schema/project.dto';


@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private readonly projectModel: Model<Project>
    ) {}

    async create(project: CreateProjectDTO) {
        const newProject = { ...project };
        if (!newProject.parent) {
            delete newProject.parent;
        }
        const newModel = new this.projectModel({
            ...newProject,
            team: Types.ObjectId(project.team),
        });
        if (newProject.parent) {
            newModel.parent = Types.ObjectId(newProject.parent);
        }
        return newModel.save();
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

    async delete(_id: string) {
        return await this.projectModel.remove({ _id });
    }

    async projectStructure(id: string) {
        const projects = await this.projectModel.find({ parent: Types.ObjectId(id) }).lean(true).exec();
        const children = await this.projectModel.find().in('parent', projects.map(p => p._id)).lean(true).exec();
        let result: LeanDocument<ProjectPlus>[] = [];
        if (children.length) {
            const parentSet = new Set;
            children.forEach(child => {
                parentSet.add(child.parent.toString());
            });
            result = projects.map(p => {
                const projectPlus = {
                    ...p,
                    id: p._id,
                    hasChildren: false,
                };

                if (parentSet.has(p._id.toString())) {
                    projectPlus.hasChildren = true;
                }
                return projectPlus;
            });
        }
        return result;
    }
}
