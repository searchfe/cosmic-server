import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/module/base.schema';
import { Types } from 'mongoose';
import { GraphQLJSON } from 'graphql-type-json';


@Schema({ timestamps: true })
@ObjectType()
export class Draft extends BaseSchema {
    @Field(() => ID)
    @Prop({ auto: false, required: true })
    project: Types.ObjectId;

    @Field(() => GraphQLJSON)
    @Prop({ type: () => Object })
    data: any;
}

export const DraftSchema = SchemaFactory.createForClass(Draft);
