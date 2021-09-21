/**
 * @author biyingshuai<biyingshuai@gmail.com>
 * @description normal value. support px and %
 */

import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

type UnitType = 'PIXELS' | 'PERCENT';
/*
export class Value {
    constructor(
        public readonly value: number,
        public readonly unit: UnitType,
    ) { }

    private static REG = /(\d)(px|em)/;
    private static SUPPORTED_UNIT:UnitType[] = ['PIXELS', 'PERCENT'];

    static from(input: string) {
        const [, value, unit] = input.match(Value.REG);
        const unitIndex = ['px', '%'].indexOf(unit.toLocaleLowerCase());
        if (!Number.isNaN(+value) &&  unitIndex > -1) {
            return new Value(+value, Value.SUPPORTED_UNIT[unitIndex]);
        }
    }
}

@Scalar('Value', () => Value)
export class VectorScalar implements CustomScalar<string, Value> {
    description = 'value scalar.';

    parseValue(value: string): Value {
        return JSON.parse(value) as Value;
    }

    serialize(value: Value): string {
        return `${value.value}${value.unit}`;
    }

    parseLiteral(ast: ValueNode): Value {
        if (ast.kind === Kind.STRING) {
            return ast.value;
        }

        return null;
    }
}
*/
