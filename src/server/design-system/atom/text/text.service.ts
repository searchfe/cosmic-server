import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Text } from './text.schema';
import { MongoProjection } from '@server/common/types';
import { CreateTextDTO } from './text.dto';

@Injectable()
export class TextService {
    constructor(
        @InjectModel(Text.name)
        private readonly textModel: Model<Text>
    ){}

    async findOne(textID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.textModel.findById(textID).lean().exec();
        }
        return await this.textModel.findById(textID).select(fields).lean().exec();
    }

    async create(text: CreateTextDTO) {
        const result = new this.textModel(text);
        return await result.save();
    }
}
