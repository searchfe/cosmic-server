/**
 * @author biyingshuai<biyingshuai@gmail.com>
 * @description color scalar, uesed to transform different forms of color, dont't use it out of color domain.
 */

// import tinyColor from 'tinycolor2';
import { Kind } from 'graphql';
import { Scalar } from '@nestjs/graphql';

import type { CustomScalar } from '@nestjs/graphql';
import type { ValueNode } from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tinyColor = require('tinycolor2');


export class ColorString extends String {}

@Scalar('ColorString', () => ColorString)
export class ColorScalar implements CustomScalar<string, string> {
    description = 'Color scalar';

    parseValue(value: string): string {
        return tinyColor(value).toRgbString();
    }

    serialize(value: string): string {
        return tinyColor(value).toRgbString();
    }

    parseLiteral(ast: ValueNode): string {
        if (ast.kind === Kind.STRING) {
            return tinyColor(ast.value).toRgbString();
        }
        return null;
    }
}
