import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { MongoProjection } from '@server/common/types';
import { Model } from 'mongoose';
import { CreateCornerDTO } from './corner.dto';
import { Corner } from './corner.schema';

@Injectable()
export class CornerService {
    constructor(
        @InjectModel(Corner.name)
        private readonly cornerModel: Model<Corner>
    ) {}

    async findOne(cornerID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.cornerModel.findById(cornerID).lean().exec();
        }
        return await this.cornerModel.findById(cornerID).select(fields).lean().exec();
    }

    async create(corner: CreateCornerDTO) {
        return new this.cornerModel(corner);
    }
}
