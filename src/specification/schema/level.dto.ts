import { InputType, Field, ID  } from '@nestjs/graphql';


@InputType()
export class CreateItemDTO {
    @Field()
    name: string;

    @Field(() => [String], { nullable: true, defaultValue: [] })
    imgs?: string[]

    @Field({ nullable: true, description: 'text description', defaultValue: '' })
    text?: string;

    @Field({ nullable: true, description: 'extra text description', defaultValue: '' })
    info?: string;

    @Field({ nullable: true, description: 'extra json info', defaultValue: '{}' })
    meta?: string;
}

@InputType()
export class CreateLevelDTO {
    @Field(() => ID)
    specification: string;

    @Field(() => ID)
    category: string;

    @Field(() => ID, { nullable: true, description: 'the parent Level it belongs to' })
    parent?: string;

    @Field()
    name: string;

    @Field(() => [CreateItemDTO], { nullable: true, defaultValue: [] })
    items?: CreateItemDTO[];
}
