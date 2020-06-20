import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { User } from './domain/user.domain';
import { CreateUserInput, UpdateUserInput } from './domain/user.input';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async create(user: CreateUserInput) {
        return await this.userRepository.save(user);
    }

    async update(user: UpdateUserInput) {
        const toUpdateUer = {
            ...user,
            id: ObjectID.createFromHexString(user.id),
        }
        return await this.userRepository.save(toUpdateUer);
    }

    async findOne(id: string) {
        return await this.userRepository.findOne(id);
    }
}
