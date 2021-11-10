import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ColorString } from './color.scalar';

@ObjectType()
export class ColorVariant {
    @Field()
    light: ColorString;

    @Field()
    dark: ColorString;
}

@ObjectType()
@Schema({ timestamps: true })
export class Color extends Document {
    @Field(() => ID)
    id: string;

    @Field({ description: 'the color string which is stored and returned in rgba format' })
    @Prop()
    color: ColorString;

    @Field(() => [ColorVariant], { nullable: true })
    @Prop(() => ColorVariant)
    variant?: ColorVariant;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: Types.ObjectId;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
