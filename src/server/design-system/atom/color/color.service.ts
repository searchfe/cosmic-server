import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateColorDTO } from './color.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from './color.schema';
import { MongoProjection } from '@server/common/types';


@Injectable()
export class ColorService {
    constructor(
        @InjectModel(Color.name)
        private readonly colorModel: Model<Color>
    ) {}

    async findOne(colorID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.colorModel.findById(colorID).lean().exec();
        }
        return await this.colorModel.findById(colorID).select(fields).lean().exec();
    }

    async create(color: CreateColorDTO) {
        return new this.colorModel(color);
    }
}
