import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/module/base.schema';
import { Types } from 'mongoose';


@Schema({ timestamps: true })
@ObjectType()
export class Draft extends BaseSchema {
    @Field(() => ID)
    @Prop({ auto: false, required: true })
    project: Types.ObjectId;
}

export const DraftSchema = SchemaFactory.createForClass(Draft);
