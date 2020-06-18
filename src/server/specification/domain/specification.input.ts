import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SpecificationInput {
    @Field()
    name: string;
}