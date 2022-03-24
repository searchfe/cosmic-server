import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';


@Schema({ timestamps: true })
@ObjectType()
export class Stroke extends BaseSchema {

    // @Field(() => [Number])
    // @Prop(() => Number)
    // dashPattern: ReadonlyArray<number>;

    @Field(() => [String], { description: '绘制对象，后续需要实现为对象' })
    @Prop(() => String)
    paint: string[];

    @Field()
    @Prop()
    weight: number;
}

export const StrokeSchema = SchemaFactory.createForClass(Stroke);
