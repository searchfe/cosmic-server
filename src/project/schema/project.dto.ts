import { InputType, Field, ID, PickType } from '@nestjs/graphql';


@InputType()
export class CreateProjectDTO {
    @Field()
    name: string;

    @Field(() => ID)
    team: string;

    @Field(() => ID, { nullable: true })
    parent?: string;
}

@InputType()
export class QueryProjectDTO {
    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => ID, { nullable: true })
    team?: string;

    @Field(() => ID, { nullable: true })
    parent?: string;
}

@InputType()
export class UpdateProjectDTO extends PickType(CreateProjectDTO, ['name'] as const) {
    @Field(() => ID)
    id: string;
}
