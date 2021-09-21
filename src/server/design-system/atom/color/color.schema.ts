import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorString } from './color.scalar';


@ObjectType()
@Schema({ timestamps: true })
export class Color extends Document {
    @Field(() => ID)
    id: string;

    @Field({ description: 'the color string which is stored and returned in rgba format' })
    @Prop()
    color: ColorString;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
