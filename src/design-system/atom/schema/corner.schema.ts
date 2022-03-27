import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';


@Schema({ timestamps: true })
@ObjectType()
export class Corner extends BaseSchema {
    @Field(() => [String])
    @Prop()
    tl: string[];

    @Field(() => [String])
    @Prop()
    tr: string[];

    @Field(() => [String])
    @Prop()
    bl: string[];

    @Field(() => [String])
    @Prop()
    br: string[];
}

export const CornerSchema = SchemaFactory.createForClass(Corner);
