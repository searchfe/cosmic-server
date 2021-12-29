import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Level } from './schema/level.schema';

import type { MongoProjection } from '@server/common/types';
import type { CreateItemDTO, CreateLevelDTO } from './schema/level.dto';


@Injectable()
export class LevelService {
    constructor(
        @InjectModel(Level.name)
        private readonly levelModel: Model<Level>
    ) {}

    async findOne(levelId: string, fields?: MongoProjection<Level>) {
        if (!fields) {
            return await this.levelModel.findById(levelId).lean().exec();
        }
        return await this.levelModel.findById(levelId).select(fields).lean().exec();
    }

    async findAll(specificationId: string, categories: Array<string>) {
        const result = await this.levelModel.find({
            specification: Types.ObjectId(specificationId),
            category: { $in: categories.map(ct => Types.ObjectId(ct)) }
        }).exec();
        return result;
    }

    async create(level: CreateLevelDTO) {
        const formatedLevel = {
            ...level,
            specification: Types.ObjectId(level.specification),
            category: Types.ObjectId(level.category),
            parent: Types.ObjectId(level.parent),
            items: level.items.map(item => ({ ...item, id: new Types.ObjectId() }))
        };
        const newLevel = new this.levelModel(formatedLevel);
        return await newLevel.save();
    }

    async createItem(levelId: string, item: CreateItemDTO) {
        const newItem = {
            id: new Types.ObjectId(),
            ...item
        };
        const result = await this.levelModel.findByIdAndUpdate(
            levelId,
            { $addToSet: { items: newItem } }
        ).select({ id: 1 });
        if (result.id) {
            return newItem.id;
        }
        return null;
    }

}
