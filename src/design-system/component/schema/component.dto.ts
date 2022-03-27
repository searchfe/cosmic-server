import { CreateBaseDTO } from '@/design-system/common/module/base.dto';
import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { KeyNodeType } from './component.schema';


@ObjectType()
@InputType()
export class CreateKeyNode {
    @Field(() => String)
    type: KeyNodeType;

    @Field(() => String)
    name: string;

    @Field(() => String)
    desc: string;
}

@ObjectType()
@InputType()
export class CreateProperty {
    @Field(() => String)
    name: string;

    @Field(() => String)
    type: string;

    @Field(() => String)
    defaultValue: string;

    @Field(() => String)
    desc: string;
}

@ObjectType()
@InputType()
export class CreateVariant {
    @Field(() => String)
    name: string;

    @Field(() => String)
    type: string;

    @Field(() => String)
    defaultValue: string;

    @Field(() => String)
    desc: string;
}
@InputType()
export class CreateComponentDTO extends CreateBaseDTO {
    @Field(() => String)
    displayName: string;

    @Field(() => String)
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

    @Field(() => String)
    name: string;
}
