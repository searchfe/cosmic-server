import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { User } from './domain/user.domain';
import { CreateUserInput, UpdateUserInput } from './domain/user.input';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ) {}

    @Query(returns => User, { name: 'user' })
    async getUser(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.userService.findOne(id);
    }

    @Mutation(returns => User)
    async addUser(@Args('user') user: CreateUserInput): Promise<User> {
        return await this.userService.create(user);
    }

    @Mutation(returns => User)
    async updateUser(@Args('user') userInput: UpdateUserInput) {
        const targetUser = await this.userService.findOne(userInput.id);
        if (!targetUser) {
            throw new UserInputError('user not found');
        }
        const newUser = {
            ...userInput,
            id: targetUser.id
        }
        return await this.userService.update(newUser);
    }
}
