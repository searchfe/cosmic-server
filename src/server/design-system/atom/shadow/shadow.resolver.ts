import { Shadow } from './shadow.schema';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

@Resolver('Shadow')
export class ShadowResolver {
    @Query(() => Shadow, { name: 'shadow' })
    async getShadow(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Shadow)
    async createShadow(@Args('shadow') shadow: string) {
        return null;
    }
}
