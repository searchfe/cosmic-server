import { Injectable } from '@nestjs/common';
import { User } from './domain/user.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type PartialUser = Partial<User>;
@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

    async create(user: PartialUser): Promise<PartialUser> {
        const result = await this.userRepository.insert(user);
        if (!result.identifiers[0] || !result.identifiers[0].id) {
            throw new Error('非法的数据操作');
        }
        return result.identifiers[0];
    }

    async update(id: PartialUser): Promise<User>
    async update(id: string, userInput: PartialUser): Promise<User>
    async update(id: PartialUser | string, userInput?: PartialUser): Promise<User> {
        userInput = userInput || id as PartialUser;
        const user = await this.userRepository.findOne(userInput.id || id as string);
        if (!user || !user.id) {
            throw new Error('非法的数据操作');
        }
        return await this.userRepository.save(userInput);
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }
}
