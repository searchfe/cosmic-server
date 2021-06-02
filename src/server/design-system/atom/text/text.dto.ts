import { InputType, Field } from '@nestjs/graphql';
import { ETextAlignHorizontal, ETextAlignVertical, EUnit } from './text.schema';

@InputType()
export class CreateFontNameDTO {
    @Field()
    family: string;

    @Field()
    style: string;
}

@InputType()
export class CreateSpaceDTO {
    @Field()
    value: number;

    @Field(() => EUnit)
    unit: EUnit;
}

@InputType()
export class CreateTextDTO {
    @Field(() => ETextAlignHorizontal)
    textAlignHorizontal: ETextAlignHorizontal;

    @Field(() => ETextAlignVertical)
    textAlignVertical: ETextAlignVertical;

    @Field()
    fontSize: number;

    @Field(() => CreateFontNameDTO)
    fontName: CreateFontNameDTO;

    @Field(() => CreateSpaceDTO)
    letterSpacing: CreateSpaceDTO;

    @Field(() => CreateSpaceDTO)
    lineHeight: CreateSpaceDTO;
}
