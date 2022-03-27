import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/module/base.schema';

/**
 * From the point of design, this should be devided into two enum
 * , and the schema field letterspace should be an union type, however,
 * which is not supported in input type. There it's proper to use just one enum
 * and data validator in DML
 * see:
 * https://github.com/graphql/graphql-spec/issues/488
 * https://github.com/graphql/graphql-js/issues/207
 */
// export enum ETextUnit {
//     PIXELS = "PIXELS",
//     PERCENT = "PERCENT",
//     AUTO = "AUTO",
// }

// registerEnumType(ETextUnit, { name: 'ETextUnit' });

@Schema({ timestamps: true })
@ObjectType()
export class Font extends BaseSchema {
    @Field()
    @Prop()
    style: string;

    @Field()
    @Prop()
    variant: string;

    @Field()
    @Prop()
    weight: string;

    @Field()
    @Prop()
    size: string;

    @Field()
    @Prop()
    lineHeight: string;

    @Field()
    @Prop()
    family: string;
}

export const FontSchema = SchemaFactory.createForClass(Font);
