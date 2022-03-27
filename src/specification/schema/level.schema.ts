import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
@ObjectType()
export class Level extends Document {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    specification: Types.ObjectId;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    category: Types.ObjectId;

    @Field(() => ID, { nullable: true })
    @Prop({ auto: false })
    parent?: Types.ObjectId;

    @Field(() => [Item], { nullable: true })
    @Prop(() => Item)
    items?: Item[];
}

@ObjectType()
export class Item {
    @Field(() => ID)
    id: Types.ObjectId;

    @Field()
    name: string;

    @Field(() => [String], { nullable: true })
    imgs?: string[];

    @Field({ nullable: true, description: 'text description' })
    text?: string;

    @Field({ nullable: true, description: 'extra text description' })
    info?: string;

    @Field({ nullable: true, description: 'extra json info' })
    meta?: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
