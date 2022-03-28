import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/module/base.schema';


@Schema({ timestamps: true })
@ObjectType()
export class Draft extends BaseSchema {}

export const DraftSchema = SchemaFactory.createForClass(Draft);
