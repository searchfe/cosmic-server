import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';


@ObjectType()
@Schema({ timestamps: true })
export class Color extends BaseSchema {
    @Field()
    @Prop()
    day: string;

    @Field()
    @Prop()
    night: string;

    @Field()
    @Prop()
    dark: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
