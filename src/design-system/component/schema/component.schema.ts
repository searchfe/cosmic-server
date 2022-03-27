import { BaseSchema } from '@/design-system/common/module/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@ObjectType()
export class Property {
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
export class Variant {
    @Field(() => String)
    @Prop({ maxlength: 32, required: true, unique: true })
    name: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    type: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    defaultValue: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    desc: string;
}

export type KeyNodeType = 'Slot' | 'Text';

@ObjectType()
export class KeyNode {
    @Field(() => String)
    @Prop({ required: true })
    type: KeyNodeType;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    desc: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Component extends BaseSchema {
    @Field(() => String)
    @Prop({ maxlength: 32 })
    displayName: string;

    @Field(() => String)
    @Prop({ maxlength: 128 })
    desc: string;

    @Field(() => [KeyNode])
    @Prop()
    keyNodes: KeyNode[];

    @Field(() => [Property])
    @Prop()
    properties: Property[];

    @Field(() => [Variant])
    @Prop()
    variants: Variant[];
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
