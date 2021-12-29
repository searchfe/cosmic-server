import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../../common/module/base.schema';


@Schema({ timestamps: true })
@ObjectType()
export class Corner extends BaseSchema {
    @Field(() => ID)
    @Prop()
    id: string;
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;
}

export const CornerSchema = SchemaFactory.createForClass(Corner);
