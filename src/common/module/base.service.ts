import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isSuccessfulQuery, fileds2MongoProjection } from '@/common/util/db';

import type { Class, DeepPartial } from 'utility-types';
import type { BaseSchema } from './base.schema';


export interface IBaseDataService<TSchema extends BaseSchema> {
    create: (data: DeepPartial<TSchema>) => Promise<Class<TSchema>>;
    findAll: (
        query?: Record<string, unknown>,
        fields?: Array<keyof TSchema>,
    ) => Promise<Class<TSchema>[]>;
    update: (updateInput: DeepPartial<TSchema>) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    findOne: (
        id: string,
        fields?: Array<keyof TSchema>,
    ) => Promise<Class<TSchema>>;
}

function transformObjectId(data: Record<string, any>, idFields: string[]) {
    const newData = {
        ...data,
    };
    idFields.forEach(fieldPath => {
        if (newData[fieldPath] && typeof newData[fieldPath] === 'string') {
            newData[fieldPath] = Types.ObjectId(newData[fieldPath]);
        }
    });
    return newData;
}

export function BaseDataService<TSchema extends BaseSchema>(options: {
    schema: Class<TSchema>,
    idFields?: string[],
}): Class<IBaseDataService<TSchema>> {
    const { schema, idFields = [] } = options;
    class DataService implements IBaseDataService<TSchema> {
        private static idFields = idFields;
        constructor(
            @InjectModel(schema.name)
            private readonly model: Model<Class<TSchema>>,
        ) {}

        async create(data: DeepPartial<TSchema>): Promise<Class<TSchema>> {
            return await new this.model(transformObjectId(data, DataService.idFields)).save();
        }

        async update(data: DeepPartial<TSchema>): Promise<boolean> {
            const newData = transformObjectId(data, DataService.idFields);
            const result = await this.model
                .updateOne({ id: data.id }, newData)
                .exec();
            return isSuccessfulQuery(result);
        }

        async delete(id: string): Promise<boolean> {
            // TODO: soft delete
            const result = await this.model.deleteOne({ id });
            return isSuccessfulQuery(result);
        }

        async findOne(
            id: string,
            fields: Array<keyof TSchema> = [],
        ): Promise<Class<TSchema>> {
            return await this.model
                .findById(id)
                .select(fileds2MongoProjection(fields))
                .exec();
        }

        async findAll(
            query?: Record<string, unknown>,
            fields: Array<keyof TSchema> = [],
        ): Promise<Class<TSchema>[]> {
            // if (color.team) {
            //     query.team = Types.ObjectId(color.team);
            // }
            return await this.model
                .find(query)
                .select(fileds2MongoProjection(fields))
                .exec();
        }
    }
    return DataService;
}
