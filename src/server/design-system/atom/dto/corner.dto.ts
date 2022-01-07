import { InputType, Field, ID } from "@nestjs/graphql";


@InputType()
export class CreateCornerDTO {
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;
}

@InputType()
export class QueryCornerDTO {
    @Field({ nullable: true })
    id?: string;

    @Field(() => ID, { nullable: true })
    team?: string;
}
