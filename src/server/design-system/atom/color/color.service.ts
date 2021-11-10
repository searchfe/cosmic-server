import { Injectable } from '@nestjs/common';
import { Model, Types, FilterQuery } from 'mongoose';
import { CreateColorDTO, QueryColorDTO } from './color.dto';
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
        return await new this.colorModel({
            ...color,
            team: Types.ObjectId(color.team),
        }).save();
    }

    async findAll(color: Partial<QueryColorDTO> = {}) {
        const query: FilterQuery<Color> = color;
        if (color.team) {
            query.team = Types.ObjectId(color.team);
        }
        return await this.colorModel.find(query).lean(false).exec();
    }
}
