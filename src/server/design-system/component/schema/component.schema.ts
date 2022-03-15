import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class Property {
    @Field(() => String)
    @Prop({ maxlength: 32, required: true, unique: true })
    name: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    type: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    defaultValue: string;

    @Field(() => String)
    @Prop({ maxlength: 128, required: true })
    desc: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Component {
    @Field(() => String)
    id: string;

    @Field(() => String)
    @Prop({ maxlength: 32, required: true })
    name: string;

    @Field(() => String)
    @Prop({ maxlength: 128 })
    desc: string;

    @Field(() => [Property])
    @Prop()
    properties: Property[]
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
