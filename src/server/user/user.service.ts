import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './domain/user.domain';

type PartialUser = Partial<User>;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(user: PartialUser) {
        return await this.userRepository.save(user);
    }

    async update(user: PartialUser) {
        return await this.userRepository.save(user);
    }

    async findOne(id: string) {
        return await this.userRepository.findOne(id);
    }
}
