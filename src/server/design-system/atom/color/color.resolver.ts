import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDTO, QueryColorDTO } from './color.dto';
import { Color } from './color.schema';

@Resolver(Color)
export class ColorResolver {
    constructor(
        @Inject(ColorService)
        private readonly colorService: ColorService
    ) {}

    @Query(() => Color, { name: 'color' })
    async getColor(@Args({ name: 'id', type: () => String }) id: string) {
        const result = await this.colorService.findOne(id);
        return {
            ...result,
            id: result._id
        };
    }

    @Query(() => [Color], { name: 'colors' })
    async getAllColors(@Args({ name: 'color', nullable: true }) color?: QueryColorDTO) {
        return await this.colorService.findAll(color);
    }

    @Mutation(() => Color)
    async createColor(@Args('color') color: CreateColorDTO) {
        return await this.colorService.create(color);
    }
}
