import { InputType } from '@nestjs/graphql';
import { ETextAlignHorizontal, ETextAlignVertical, ETextUnit } from './text.schema';

@InputType()
export class TextValuePropDTO {
    value?: number;
    /**
     * support PIXELS and PERCENT, line-height also can be AUTO
     */
    unit: ETextUnit;
}

@InputType()
export class FontNameDTO {
    /**
     * font-family
     */
    family: string;

    /**
     * font-style
     */
    style: string;
}

@InputType()
export class CreateTextDTO {
    fontSize: number;
    fontName?: FontNameDTO;
    textAlignHorizontal?: ETextAlignHorizontal;
    textAlignVertical?: ETextAlignVertical;
    letterSpacing?: TextValuePropDTO;
    lineHeight?:  TextValuePropDTO;
}
