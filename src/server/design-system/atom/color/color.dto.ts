import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateColorVariantDTO {
    @Field()
    light: string;

    @Field()
    dark: string;
}

@InputType()
export class CreateColorDTO {
    /**
     * support rgb、rgba、hex string
     */
    @Field()
    color: string;

    @Field(() => CreateColorVariantDTO, { nullable: true })
    variant?:  CreateColorVariantDTO;

    @Field(() => ID, { nullable: true })
    team?: string;
}

@InputType()
export class QueryColorDTO {
    @Field({ nullable: true })
    id?: string;

    @Field(() => ID, { nullable: true })
    team?: string;
}
