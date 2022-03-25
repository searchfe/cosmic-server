import { InputType, Field, ID } from '@nestjs/graphql';


@InputType({ isAbstract: true })
export class CreateBaseDTO {

    @Field()
    name: string;

    @Field(() => ID)
    team: string;
}

@InputType({ isAbstract: true })
export class QueryBaseDTO {

    @Field()
    id: string;

    @Field(() => ID)
    team: string;
}
