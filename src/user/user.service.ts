import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import type { QueryUserDTO } from './schema/user.dto';


type PartialUser = Partial<User>;

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async create(user: PartialUser) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(user: PartialUser) {
        const result = await this.userModel
            .updateOne({ _id: user.id }, user)
            .exec();
        if (result && result.ok) {
            return true;
        }
        return false;
    }

    async findOne(user: Partial<QueryUserDTO>) {
        const newQuery: Record<string, any> = {
            ...user,
        };
        if (newQuery.id) {
            newQuery._id = Types.ObjectId(newQuery.id);
            delete newQuery.id;
        }
        const result = await this.userModel
            .findOne(newQuery)
            .select({ password: 0 })
            .lean()
            .exec();
        if (result._id) {
            return {
                ...result,
                id: result._id,
            };
        }
        return result;
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
}
