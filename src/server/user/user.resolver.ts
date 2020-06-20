import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './domain/user.domain';
import { CreateUserInput, UpdateUserInput } from './domain/user.input';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    @Inject(UserService)
    private readonly userService: UserService;

    @Query(returns => User, { name: 'user' })
    async getUser(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.userService.findOne(id);
    }

    @Mutation(returns => User)
    async addUser(@Args('user') user: CreateUserInput) {
        return await this.userService.create(user);
    }

    @Mutation(returns => User)
    async updateUser(@Args('user') user: UpdateUserInput) {
        return await this.userService.update(user);
    }
}
