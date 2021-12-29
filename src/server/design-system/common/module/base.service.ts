import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isSuccessfulQuery, fileds2MongoProjection } from '@server/common/util/db';

import type { Class, DeepPartial } from 'utility-types';
import type { BaseSchema } from './base.schema';


export interface IBaseDataService<TSchema extends BaseSchema> {
    create: (data: DeepPartial<TSchema>) => Promise<Class<TSchema>>;
    findAll: (query?: Record<string, unknown>, fields?: Array<keyof TSchema>) => Promise<Class<TSchema>[]>;
    update: (updateInput: DeepPartial<TSchema>) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    findOne: (id: string, fields?: Array<keyof TSchema>) => Promise<Class<TSchema>>;
}

export function BaseDataService<TSchema extends BaseSchema>(schema: Class<TSchema>): Class<IBaseDataService<TSchema>> {
    class DataService implements IBaseDataService<TSchema> {
        constructor(
            @InjectModel(schema.name)
            private readonly model: Model<Class<TSchema>>
        ) {}

        async create(data: DeepPartial<TSchema>): Promise<Class<TSchema>> {
            return await new this.model(data).save();
        }

        async update(data: DeepPartial<TSchema>): Promise<boolean> {
            const result = await this.model.updateOne({ id: data.id }, data).exec();
            return isSuccessfulQuery(result);
        }

        async delete(id: string): Promise<boolean> {
            // TODO: soft delete
            const result = await this.model.deleteOne({ id });
            return isSuccessfulQuery(result);
        }

        async findOne(id: string, fields?: Array<keyof TSchema>): Promise<Class<TSchema>> {
            return await this.model.findById(id).select(fileds2MongoProjection(fields)).exec();
        }

        async findAll(query?: Record<string, unknown>, fields?: Array<keyof TSchema>): Promise<Class<TSchema>[]> {
            // if (color.team) {
            //     query.team = Types.ObjectId(color.team);
            // }
            return await this.model.find(query).select(fileds2MongoProjection(fields)).exec();
        }
    }
    return DataService;
}
