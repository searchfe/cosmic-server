import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Corner } from './corner.schema';

@Resolver('Corner')
export class CornerResolver {
    @Query(() => Corner, { name: 'corner' })
    async getCorner(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Corner)
    async createCorner(@Args('corner') corner: string) {
        return null;
    }
}
