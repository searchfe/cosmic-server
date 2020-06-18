import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from './domain/user.domain';
import { UserInput } from './domain/user.input';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    @Query(returns => User, { name: 'user' })
    async getUser(
        @Args({ name: 'id', type: () => String }) id: string,
    ): Promise<User> {
        return await this.userService.findOne(id);
    }

    @Mutation(returns => User)
    async addUser(@Args('user') user: UserInput): Promise<Partial<User>> {
        // TODO 过滤id，判断是否已有
        const result = await this.userService.create(user);
        return {
            ...user,
            ...result,
        };
    }

    @Mutation(returns => User)
    async modifyUser(@Args('user') user: UserInput): Promise<User> {
        return await this.userService.update(user);
    }
}
