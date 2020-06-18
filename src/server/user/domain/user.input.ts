import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
    @Field({nullable: true})
    id?: string;

    @Field()
    name?: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;

    @Field({nullable: true})
    intro?: string;

    @Field({nullable: true})
    avatar?: string;

    @Field({nullable: true})
    blank?: string;
}