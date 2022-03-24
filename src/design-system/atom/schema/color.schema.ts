import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ColorString } from '../../common/scalar/color.scalar';
import { BaseSchema } from '../../common/module/base.schema';


@ObjectType()
export class ColorVariant {
    @Field()
    light: ColorString;

    @Field()
    dark: ColorString;
}

@ObjectType()
@Schema({ timestamps: true })
export class Color extends BaseSchema {

    @Field({ description: 'the color string which is stored and returned in rgba format' })
    @Prop()
    color: string;

    // @Field(() => [ColorVariant], { nullable: true })
    // @Prop(() => ColorVariant)
    // variant?: ColorVariant;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
