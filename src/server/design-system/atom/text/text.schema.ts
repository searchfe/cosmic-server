import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ETextAlignVertical {
    TOP = "TOP",
    CENTER = "CENTER",
    BOTTOM = "BOTTOM",
};

registerEnumType(ETextAlignVertical, { name: 'ETextAlignVertical' });

export enum ETextAlignHorizontal {
    LEFT = "LEFT",
    CENTER = "CENTER",
    RIGHT = "RIGHT",
    JUSTIFIED = "JUSTIFIED",
};

registerEnumType(ETextAlignHorizontal, { name: 'ETextAlignHorizontal' });

/**
 * From the point of design, this should be devided into two enum
 * , and the schema field letterspace should be an union type, however,
 * which is not supported in input type. There it's proper to use just one enum
 * and data validator in DML
 * see:
 * https://github.com/graphql/graphql-spec/issues/488
 * https://github.com/graphql/graphql-js/issues/207
 */
export enum ETextUnit {
    PIXELS = "PIXELS",
    PERCENT = "PERCENT",
    AUTO = "AUTO",
}

registerEnumType(ETextUnit, { name: 'ETextUnit' });


@ObjectType()
export class TextValueProp {
    value: number;
    /**
     * support PIXELS and PERCENT, line-height also can be AUTO
     */
    unit: ETextUnit;
}

@ObjectType()
export class FontName {
    @Field()
    family: string;

    @Field({ description: 'font-style' })
    style: string;
}

@Schema({ timestamps: true })
@ObjectType()
export class Text extends Document {
    @Field(() => ID)
    id: string;
    textAlignHorizontal: ETextAlignHorizontal;
    textAlignVertical: ETextAlignVertical;
    fontSize: number;
    fontName: FontName;
    letterSpacing: TextValueProp;
    lineHeight: TextValueProp;
}

export const TextSchema = SchemaFactory.createForClass(Text);
