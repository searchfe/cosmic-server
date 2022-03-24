import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PermissionEnum } from './team.dto';


@ObjectType()
@Schema({ timestamps: true })
export class Team extends Document {

    @Field(() => ID)
    id: string;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => [TeamMemer])
    @Prop()
    members: TeamMemer[];
}

@ObjectType()
export class TeamMemer {
    @Field(() => ID)
    user: Types.ObjectId; // Types.ObjectId是原生的mongoId，Schem.Types.ObjectId是mongoose自己的

    @Field(() => String)
    permission: PermissionEnum;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
