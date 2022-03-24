import { InputType, Field, PickType, ID } from '@nestjs/graphql';


@InputType()
export class CreateSpecificationDTO {
    @Field()
    name: string;

    @Field()
    team: string;
}

@InputType()
export class UpdateSpecificationDTO extends PickType(CreateSpecificationDTO, ['name'] as const) {
    @Field(() => ID)
    id: string;
}

@InputType()
export class CreateCategoryDTO {
    @Field()
    specificationId: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    icon?: string;
}

@InputType()
export class UpdateCategoryDTO extends PickType(CreateCategoryDTO, ['specificationId', 'name'] as const) {
    @Field(() => ID)
    id: string;
}
