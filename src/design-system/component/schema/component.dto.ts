import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class Property {
    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    defaultValue: string;

    @Field()
    desc: string;
}

@InputType()
export class CreateComponentDTO {
    @Field()
    name: string;

    @Field()
    desc: string;

    @Field(() => [Property])
    properties: Property[]
}

@InputType()
export class QueryComponentDTO extends CreateComponentDTO {
    @Field()
    id: string;
}
