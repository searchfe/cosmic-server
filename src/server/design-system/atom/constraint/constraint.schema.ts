import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum EConstaintType {
    MIN = 'MIN',
    CENTER = 'CENTER',
    MAX = 'MAX',
    STRETCH = 'STRETCH',
    SCALE = 'SCALE',
};

registerEnumType(EConstaintType, { name: 'EConstaintType' });

@Schema({ timestamps: true })
@ObjectType()
export class Constraint extends Document {
    @Field(() => ID)
    @Prop()
    id: string;

    @Field(() => EConstaintType)
    @Prop(() => EConstaintType)
    horizontal: EConstaintType

    @Field(() => EConstaintType)
    @Prop(() => EConstaintType)
    vertical: EConstaintType
}

export const ConstaintSchema = SchemaFactory.createForClass(Constraint);
