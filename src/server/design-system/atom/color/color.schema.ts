import { Field, ObjectType, ID, registerEnumType, createUnionType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorString } from './color.scalar';

export enum foo {
    foo = 'top'
}
registerEnumType(foo, {
    name: 'foo',
  });
export type aigin = "TOP" | "CENTER" | "BOTTOM";

@ObjectType()
export class Book {
  @Field()
  title: string;
}

@ObjectType()
export class Author {
  @Field()
  name: string;
}

export const ResultUnion = createUnionType({
    name: 'ResultUnion',
    types: () => [Author, Book],
  });

@ObjectType()
@Schema({ timestamps: true })
export class Color extends Document {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop()
    color: ColorString;


    @Field(type => foo)
    @Prop()
    textAlignVertical55423?: foo;

    @Field()
    @Prop()
    textAlignVertical221?: aigin;

    @Field(() => ResultUnion)
    @Prop()
    textAlignVertical222221?: typeof ResultUnion;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
