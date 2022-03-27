import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';


@ObjectType()
@Schema({ timestamps: true })
export class Opacity extends BaseSchema {
    @Field()
    @Prop()
    opacity: number;
}

export const OpacitySchema = SchemaFactory.createForClass(Opacity);
