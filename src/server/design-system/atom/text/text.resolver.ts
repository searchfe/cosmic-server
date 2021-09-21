import { TextService } from './text.service';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Text } from './text.schema';
import { CreateTextDTO } from './text.dto';
import { Inject } from '@nestjs/common';

@Resolver('Text')
export class TextResolver {
    constructor(
        @Inject(TextService)
        private readonly textService: TextService
    ) {}
    @Query(() => Text, { name: 'text' })
    async getText(@Args({ name: 'id', type: () => String }) id: string) {
        const result = await this.textService.findOne(id);
        return {
            ...result,
            id: result._id
        };
    }

    @Mutation(() => Text)
    async createText(@Args('text') text: CreateTextDTO) {
        return await this.textService.create(text);
    }
}
