import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDTO, QueryColorDTO } from './color.dto';
import { Color } from './color.schema';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

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

    @Subscription(() => [Color], { name: 'colors', filter: (payload, variables) => {
        return true;
    } })
    async getAllColors(@Args({ name: 'color', nullable: true }) color?: QueryColorDTO) {
        const s  = pubsub.asyncIterator('colors');
        return s;
        // return await this.colorService.findAll(color);
    }

    @Mutation(() => Color)
    async createColor(@Args('color') color: CreateColorDTO) {
        const newColor = await this.colorService.create(color);
        pubsub.publish('colors', { colors: [newColor] });
        return newColor;
    }
}
