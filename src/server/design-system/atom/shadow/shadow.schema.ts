import { Vector } from './../common/scalar/vector.scalar';
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum EShadowType {
    INSET = 'inset',
    OUTSET = 'outset',
};

registerEnumType(EShadowType, { name: 'EShadowType' });

@Schema({ timestamps: true })
@ObjectType()
export class Shadow extends Document {
    @Field(() => ID)
    @Prop()
    id: string;

    @Field(() => EShadowType, { nullable: true })
    @Prop()
    type?: EShadowType;

    @Field(() => Vector)
    @Prop(() => Vector)
    offset: Vector;

    @Field({ description: '阴影尺寸', nullable: true })
    @Prop()
    spread?: number;

    @Field({ description: '模糊距离，blur radius' })
    @Prop()
    blur: number;

    @Field(() => ID, { description: 'TODO: 支持原始值和引用两种形式' })
    @Prop({ auto: false })
    color: Types.ObjectId;
}

export const ShadowSchema = SchemaFactory.createForClass(Shadow);
