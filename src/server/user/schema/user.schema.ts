import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document{

    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Prop({ maxlength: 64, required: true, unique: true })
    email: string

    @Field(() => String)
    @Prop({ maxlength: 64, required: true })
    username: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    password: string;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field()
    @Prop({ maxlength: 64 })
    intro?: string;

    @Field()
    @Prop({ maxlength: 64 })
    avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
