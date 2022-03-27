import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { User } from './schema/user.schema';
import { CreateUserDTO, UpdateUserDTO } from './schema/user.dto';
import { UserService } from './user.service';


@Resolver(() => User)
export class UserResolver {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    @Query(() => User, { name: 'user' })
    async getUser(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.userService.findOne({ id });
    }

    @Mutation(() => User)
    async createUser(@Args('user') user: CreateUserDTO): Promise<User> {
        return await this.userService.create(user);
    }

    @Mutation(() => Boolean)
    async updateUser(@Args('user') userInput: UpdateUserDTO) {
        const targetUser = await this.userService.findOne({ id: userInput.id });
        if (!targetUser) {
            throw new UserInputError('user not found');
        }
        const newUser = {
            ...userInput,
            id: targetUser.id,
        };
        return await this.userService.update(newUser);
    }
}
