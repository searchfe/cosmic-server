import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
@ObjectType({ isAbstract: true })
export class BaseSchema extends Document {
    // TODO: mongoose 自动赋予schema一个id virtual getter，测试没问题后可删掉这个字段
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: Types.ObjectId;
}
