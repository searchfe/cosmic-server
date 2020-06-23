import { InputType, Field, PickType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    name?: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    intro?: string;

    @Field({ nullable: true })
    avatar?: string;
}

@InputType()
export class UpdateUserInput extends PickType(CreateUserInput, ['name', 'intro', 'avatar'] as const) {
    @Field()
    id: string;
}