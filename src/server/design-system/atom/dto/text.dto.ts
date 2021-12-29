import type { ETextAlignHorizontal, ETextAlignVertical, ETextUnit } from '../schema/text.schema';

import { InputType } from '@nestjs/graphql';


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
