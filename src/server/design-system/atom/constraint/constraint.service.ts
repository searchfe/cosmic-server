import type { MongoProjection } from '@server/common/types';
import { Constraint } from './constraint.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateConstraintDTO } from './constraint.dto';

@Injectable()
export class ConstraintService {
    constructor(
        @InjectModel(Constraint.name)
        private readonly constraintModel: Model<Constraint>
    ) {}

    async findOne(constraintID: string, fields?: MongoProjection) {
        if (!fields) {
            return await this.constraintModel.findById(constraintID).lean().exec();
        }
        return await this.constraintModel.findById(constraintID).select(fields).lean().exec();
    }

    async create(constraint: CreateConstraintDTO) {
        return new this.constraintModel(constraint);
    }
}
