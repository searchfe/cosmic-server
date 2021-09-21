import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Layout } from './layout.schema';

@Resolver('Layout')
export class LayoutResolver {
    @Query(() => Layout, { name: 'layout' })
    async getLayout(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Layout)
    async createLayout(@Args('layout') layout: string) {
        return null;
    }
}
