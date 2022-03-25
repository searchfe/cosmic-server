import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';


@ObjectType()
export class BorderItem {

    @Field(() => String)
    weight: string;

    @Field(() => String)
    style: string;
}


@Schema({ timestamps: true })
@ObjectType()
export class Border extends BaseSchema {

    @Field(() => BorderItem)
    @Prop()
    top: BorderItem;

    @Field(() => BorderItem)
    @Prop()
    right: BorderItem;

    @Field(() => BorderItem)
    @Prop()
    bottom: BorderItem;

    @Field(() => BorderItem)
    @Prop()
    left: BorderItem;

}

export const BorderSchema = SchemaFactory.createForClass(Border);
