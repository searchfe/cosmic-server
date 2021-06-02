import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ETextAlignVertical {
    TOP = "TOP",
    CENTER = "CENTER",
    BOTTOM = "BOTTOM",
};

export enum ETextAlignHorizontal {
    LEFT = "LEFT",
    CENTER = "CENTER",
    RIGHT = "RIGHT",
    JUSTIFIED = "JUSTIFIED",
};

// TODO: extract it to common
export enum EUnit {
    PIXELS = "px",
    PERCENT = "%",
}

registerEnumType(ETextAlignVertical, {
    name: 'ETextAlignVertical'
});

registerEnumType(ETextAlignHorizontal, {
    name: 'ETextAlignHorizontal'
});

registerEnumType(EUnit, {
    name: 'EUnit'
});

@ObjectType()
export class FontName {
    @Field()
    family: string;

    @Field()
    style: string;
}


@ObjectType()
export class Space {
    @Field()
    value: number;

    @Field(() => EUnit)
    unit: EUnit;
}

@Schema({ timestamps: true })
@ObjectType()
export class Text extends Document {
    @Field(() => ID)
    id: string;

    @Field(() => ETextAlignHorizontal)
    @Prop()
    textAlignHorizontal: ETextAlignHorizontal;

    @Field(() => ETextAlignVertical)
    @Prop()
    textAlignVertical: ETextAlignVertical;

    @Field()
    @Prop()
    fontSize: number;

    @Field(() => FontName)
    @Prop(() => FontName)
    fontName: FontName;

    @Field(() => Space)
    @Prop(() => Space)
    letterSpacing: Space;

    @Field(() => Space)
    @Prop(() => Space)
    lineHeight: Space;
}

export const TextSchema = SchemaFactory.createForClass(Text);
