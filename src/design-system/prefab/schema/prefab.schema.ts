import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../../../common/module/base.schema';


@ObjectType()
@Schema({ timestamps: true })
export class Prefab extends BaseSchema {

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    component: Types.ObjectId;

    @Field(() => [ID])
    @Prop({ auto: false, required: true, default: [] })
    atoms: Types.ObjectId[];
}

export const PrefabSchema = SchemaFactory.createForClass(Prefab);
