import { CornerService } from './corner.service';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Corner } from './corner.schema';
import { CreateCornerDTO } from './corner.dto';

@Resolver('Corner')
export class CornerResolver {
    constructor(
        @Inject(CornerService)
        private readonly cornerService: CornerService
    ) {}

    @Query(() => Corner, { name: 'corner' })
    async getCorner(@Args({ name: 'id', type: () => String }) id: string) {
        const result = await this.cornerService.findOne(id);
        return {
            ...result,
            id: result._id
        };
    }

    @Mutation(() => Corner)
    async createCorner(@Args('corner') corner: CreateCornerDTO) {
        return await this.cornerService.create(corner);
    }
}
