import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { TypeEnum } from './project.dto';

@ObjectType()
@Schema({ timestamps: true })
export class Project extends Document {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: S.Types.ObjectId;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => String)
    @Prop({ required: true })
    type: TypeEnum;

    @Field(() => String, { nullable: true })
    @Prop()
    file?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
