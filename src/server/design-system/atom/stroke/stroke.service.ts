import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoProjection } from '@server/common/types';
import { Model } from 'mongoose';
import { CreatStrokeDTO } from './stroke.dto';
import { Stroke } from './stroke.schema';

@Injectable()
export class StrokeService {
    constructor(
        @InjectModel(Stroke.name)
        private readonly strokeModel: Model<Stroke>
    ) {}

    async findOne(strokeID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.strokeModel.findById(strokeID).lean().exec();
        }
        return await this.strokeModel.findById(strokeID).select(fields).lean().exec();
    }

    async create(color: CreatStrokeDTO) {
        return new this.strokeModel(color);
    }
}
