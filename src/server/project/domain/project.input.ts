import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
    @Field()
    name: string;
}