/**
 *
 * interface LayoutMixin {
    readonly absoluteTransform: Transform
    relativeTransform: Transform
    x: number
    y: number
    rotation: number // In degrees

    readonly width: number
    readonly height: number
    constrainProportions: boolean

    layoutAlign: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT" // applicable only inside auto-layout frames
    layoutGrow: number

    resize(width: number, height: number): void
    resizeWithoutConstraints(width: number, height: number): void
    rescale(scale: number): void
  }
 */

import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Layout extends Document {
    // TODO: transform
    // TODO: auto layout ???
    @Field(() => ID)
    @Prop()
    id: string;

    @Field()
    @Prop()
    x: number;

    @Field()
    @Prop()
    y: number;

    @Field()
    @Prop()
    width: number;

    @Field()
    @Prop()
    height: number;
}

export const LayoutSchema = SchemaFactory.createForClass(Layout);
