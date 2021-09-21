import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Stroke } from './stroke.schema';

@Resolver('Stroke')
export class StrokeResolver {

    @Query(() => Stroke, { name: 'stroke' })
    async getStroke(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Stroke)
    async createStroke(@Args('stroke') stroke: string) {
        return null;
    }
}
