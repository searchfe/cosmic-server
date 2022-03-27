import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@ObjectType()
@Schema({ timestamps: true })
export class Project extends Document {
    @Field(() => ID)
    id: Types.ObjectId;

    @Field(() => ID)
    @Prop({ auto: false, required: true })
    team: Types.ObjectId;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => ID, { nullable: true })
    @Prop({ auto: false, required: false })
    parent?: Types.ObjectId;
}

@ObjectType({ isAbstract: true })
export class ProjectPlus extends Project {
    public hasChildren: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
