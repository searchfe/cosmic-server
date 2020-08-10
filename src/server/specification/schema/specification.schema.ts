import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Specification extends Document{
    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: Types.ObjectId;

    @Field(() => [Category])
    @Prop(() => Category)
    categories: Category[];
}

@ObjectType()
export class Category {
    @Field(() => ID)
    id: Types.ObjectId;

    @Field()
    name: string;

    @Field({ nullable: true })
    icon?: string;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);
