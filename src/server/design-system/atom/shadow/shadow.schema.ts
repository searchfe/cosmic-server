import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Vector } from './../common/scalar/vector.scalar';

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

    /**
     * inset or outset shadow
     */
    type?: EShadowType;

    /**
     * position
     */
    offset: Vector;

    /**
     * shadow size
     */
    spread?: number;

    /**
     * blur radius
     */
    blur: number;

    @Field(() => ID, { description: 'TODO: 支持原始值和引用两种形式', nullable: true })
    @Prop({ auto: false })
    color?: Types.ObjectId;
}

export const ShadowSchema = SchemaFactory.createForClass(Shadow);
