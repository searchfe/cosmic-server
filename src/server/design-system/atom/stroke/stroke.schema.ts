import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Stroke extends Document {
    @Field(() => ID)
    @Prop()
    id: string;

    @Field(() => [Number])
    @Prop(() => Number)
    dashPattern: ReadonlyArray<number>;

    @Field(() => [String], { description: '绘制对象，后续需要实现为对象' })
    @Prop(() => String)
    paint: string[];

    @Field()
    @Prop()
    weight: number;
}

export const StrokeSchema = SchemaFactory.createForClass(Stroke);
