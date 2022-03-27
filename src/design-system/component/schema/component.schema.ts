import { BaseSchema } from '@/design-system/common/module/base.schema';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@ObjectType()
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

@ObjectType()
export class Variant {
    @Field()
    @Prop({ maxlength: 32, required: true, unique: true })
    name: string;

    @Field()
    @Prop({ maxlength: 128, required: true })
    type: string;

    @Field()
    @Prop({ maxlength: 128, required: true })
    defaultValue: string;

    @Field()
    @Prop({ maxlength: 128, required: true })
    desc: string;
}

export enum KeyNodeType {
    SLOT = 'Slot',
    TEXT = 'Text',
};

registerEnumType(KeyNodeType, { name: 'KeyNodeType' });

@ObjectType()
export class KeyNode {
    @Field()
    @Prop({ required: true })
    type: KeyNodeType;

    @Field()
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field()
    @Prop({ maxlength: 128, required: true })
    desc: string;
}

@Schema({ timestamps: true })
@ObjectType()
export class Component extends BaseSchema {
    @Field()
    @Prop({ maxlength: 32 })
    displayName: string;

    @Field()
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
