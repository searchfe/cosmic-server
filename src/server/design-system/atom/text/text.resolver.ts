import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Text } from './text.schema';
import { CreateTextDTO } from './text.dto';

@Resolver('Text')
export class TextResolver {
    // constructor(
    //     @Inject(ColorService)
    //     private readonly colorService: ColorService
    // ) {}
    @Query(() => Text, { name: 'text' })
    async getColor(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Text)
    async createColor(@Args('text') text: CreateTextDTO) {
        return null;
    }
}
