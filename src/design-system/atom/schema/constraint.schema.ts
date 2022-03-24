import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from '../../common/module/base.schema';


export enum EConstaintType {
    MIN = 'MIN',
    CENTER = 'CENTER',
    MAX = 'MAX',
    STRETCH = 'STRETCH',
    SCALE = 'SCALE',
};

registerEnumType(EConstaintType, { name: 'EConstaintType' });

@Schema({ timestamps: true })
@ObjectType()
export class Constraint extends BaseSchema {
    @Field(() => ID)
    id: string;
    horizontal: EConstaintType
    vertical: EConstaintType
}

export const ConstaintSchema = SchemaFactory.createForClass(Constraint);
