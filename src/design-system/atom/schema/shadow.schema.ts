import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../../common/module/base.schema';


export enum EShadowType {
    INSET = 'inset',
    OUTSET = 'outset',
}

registerEnumType(EShadowType, { name: 'EShadowType' });

@Schema({ timestamps: true })
@ObjectType()
export class Shadow extends BaseSchema {
    @Field()
    @Prop()
    type?: EShadowType;

    @Field()
    @Prop()
    offsetX?: string;

    @Field()
    @Prop()
    offsetY?: string;

    @Field()
    @Prop()
    blur: string;

    @Field()
    @Prop()
    spread?: string;

    @Field(() => ID, { nullable: true })
    @Prop({ auto: false })
    color?: Types.ObjectId;
}

export const ShadowSchema = SchemaFactory.createForClass(Shadow);
