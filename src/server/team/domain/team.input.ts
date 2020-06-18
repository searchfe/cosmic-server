import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TeamInput {
    @Field()
    name: string;
}