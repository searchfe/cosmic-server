import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
@ObjectType({ isAbstract: true })
export class BaseSchema extends Document {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Prop({ required: true })
    name: string;

    @Field(() => String)
    @Prop({ })
    desc?: string;

    @Field(() => String)
    @Prop({ })
    preview?: string;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: Types.ObjectId;

    @Field()
    updatedAt: string;
}
