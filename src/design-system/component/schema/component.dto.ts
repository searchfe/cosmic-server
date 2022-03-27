import { CreateBaseDTO } from '@/design-system/common/module/base.dto';
import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { KeyNodeType } from './component.schema';


@ObjectType()
@InputType()
export class CreateKeyNode {
    @Field()
    type: KeyNodeType;

    @Field()
    name: string;

    @Field()
    desc: string;
}

@ObjectType()
@InputType()
export class CreateProperty {
    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    defaultValue: string;

    @Field()
    desc: string;
}

@ObjectType()
@InputType()
export class CreateVariant {
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
export class CreateComponentDTO extends CreateBaseDTO {
    @Field()
    displayName: string;

    @Field()
    desc: string;

    @Field(() => [CreateKeyNode])
    keyNodes: CreateKeyNode[];

    @Field(() => [CreateProperty])
    properties: CreateProperty[];

    @Field(() => [CreateVariant])
    variants: CreateVariant[];
}

@InputType()
export class QueryComponentDTO {
    @Field(() => ID)
    team: Types.ObjectId;

    @Field()
    name: string;
}
