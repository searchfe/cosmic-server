import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Corner extends Document {
    @Field(() => ID)
    @Prop()
    id: string;

    @Field()
    @Prop()
    topLeftRadius: number;

    @Field()
    @Prop()
    topRightRadius: number;

    @Field()
    @Prop()
    bottomLeftRadius: number;

    @Field()
    @Prop()
    bottomRightRadius: number;
}

export const CornerSchema = SchemaFactory.createForClass(Corner);
