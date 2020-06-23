import { Specification } from './specification.domain';
import { InputType, Field  } from '@nestjs/graphql';

@InputType()
export class CreateSpecificationInput {
    @Field()
    name: string;

    @Field()
    team: string;
}

@InputType()
export class CreateCategoryInput {
    @Field()
    specificationId: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    parent?: string;
}

@InputType()
export class SpecificationItemInput {
    @Field()
    specificationId: string;

    @Field()
    categoryId: string;

    @Field()
    name: string;
    
    @Field({ nullable: true })
    meta?: string;
}
