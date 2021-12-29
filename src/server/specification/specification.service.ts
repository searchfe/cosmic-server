import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoProjection } from '@server/common/types';
import { isSuccessfulQuery } from '@server/common/util/db';
import { Model, Types } from 'mongoose';
import { Specification } from './schema/specification.schema';

import type { Category } from './schema/specification.schema';


type PartialSpecification = Partial<Specification>;

@Injectable()
export class SpecificationService {
    constructor(
        @InjectModel(Specification.name)
        private readonly specificationModel: Model<Specification>
    ) {}

    async findOne(specificationId: string, fields?: MongoProjection<Specification>) {
        if (!fields) {
            return await this.specificationModel.findById(specificationId).exec();
        }
        return await this.specificationModel.findById(specificationId).select(fields).exec();
    }

    async findAll(teamId: string) {
        const result = await this.specificationModel.where('team').equals(Types.ObjectId(teamId)).lean().exec();
        return result.map(res => {
            const item = { ...res, id: res._id };
            delete item._id;
            return item;
        });
    }

    async getCategory(specificationId: string, categoryCondition: { [key in keyof Category]?: unknown }, fields?: MongoProjection<Specification>) {
        const projection: Record<string, unknown> = fields ? { ...fields } : {};
        const elemMatch = { ...categoryCondition };
        if (categoryCondition.id) {
            elemMatch.id = Types.ObjectId(categoryCondition.id as string);
        }
        projection.categories = { $elemMatch: elemMatch };
        const result = this.specificationModel.findById(specificationId).select(projection);
        if (!fields) {
            return await result.lean().exec();
        }
        return await result.select(fields).lean().exec();
    }

    async create(specification: PartialSpecification) {
        const newSpecification = new this.specificationModel(specification);
        return await newSpecification.save();
    }

    async update(specification: PartialSpecification, fields?: MongoProjection<Specification>) {
        const result = this.specificationModel.findByIdAndUpdate(specification.id, specification, { new: true });
        if (!fields) {
            return result.lean().exec();
        }
        return result.select(fields).lean().exec();
    }

    async createCategory(specificationId: string, category: Partial<Category>) {
        const { name, icon } = category;
        const newCategory = {
            name,
            icon,
            id: new Types.ObjectId()
        };
        await this.specificationModel.findByIdAndUpdate(
            specificationId,
            { $addToSet: { categories: newCategory } }
        );
        return newCategory.id;
    }

    async updateCategory(specificationId: string, category: Pick<Category, 'name' | 'icon'> & { id: string }) {
        const newCategory = { ...category };
        delete newCategory.id;
        const updateOption: Record<string, unknown> = {};
        Object.keys(newCategory).forEach(key => {
            if (newCategory[key] !== null) {
                updateOption[`categories.$.${key}`] = newCategory[key];
            }
        });
        const result = await this.specificationModel.updateOne({
            _id: specificationId,
            categories: {
                $elemMatch: { id: Types.ObjectId(category.id) }
            }
        }, { $set: { ...updateOption } });
        if (isSuccessfulQuery(result)) {
            return true;
        }
        return false;
    }

    async deleteCategory(specificationId: string, categoryId: string) {
        const result = await this.specificationModel.updateOne({
            _id: specificationId,
            categories: {
                $elemMatch: { id: Types.ObjectId(categoryId) }
            }
        } , { $pop: { categories: -1 } });
        if (isSuccessfulQuery(result as unknown as Record<string, unknown>)) {
            return true;
        }
        return false;
    }
}
