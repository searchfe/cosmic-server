import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { MongoProjection } from './../../../common/types';
import { CreateShadowDTO } from './shadow.dto';
import { Shadow } from './shadow.schema';

@Injectable()
export class ShadowService {
    constructor(
        @InjectModel(Shadow.name)
        private readonly shadowModel: Model<Shadow>
    ) {}

    async findOne(shadowID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.shadowModel.findById(shadowID).lean().exec();
        }
        return await this.shadowModel.findById(shadowID).select(fields).lean().exec();
    }

    async create(shadow: CreateShadowDTO) {
        return new this.shadowModel(shadow);
    }
}
