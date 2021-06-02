/**
 * @author biyingshuai<biyingshuai@gmail.com>
 * @description color scalar, uesed to transform different forms of color, dont't use it out of color domain.
 */

import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class ColorString {
    constructor(public readonly hex: string) { }
}

// TODO: transform
@Scalar('ColorString', () => ColorString)
export class ColorScalar implements CustomScalar<ColorString, ColorString> {
    description = 'Color scalar';

    parseValue(value: string): ColorString {
        return new ColorString(value);
    }

    serialize(value: ColorString): ColorString {
        return value;
    }

    parseLiteral(ast: ValueNode): ColorString {
        if (ast.kind === Kind.STRING) {
            return new ColorString(ast.value);
        }
        return null;
    }
}
