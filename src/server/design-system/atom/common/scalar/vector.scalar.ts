/**
 * @author biyingshuai<biyingshuai@gmail.com>
 * @description vector scalar, accepts {x, y} format json string, returns Vector object.
 */

import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class Vector {
    constructor(public readonly x: number, public readonly y: number) { }
}

@Scalar('Vetor', () => Vector)
export class VectorScalar implements CustomScalar<Vector, Vector> {
    description = 'vector scalar. For excample {x: 1, y: 2}';

    parseValue(value: string): Vector {
        return  JSON.parse(value) as Vector;
    }

    serialize(value: Vector): Vector {
        return value;
    }

    parseLiteral(ast: ValueNode): Vector {
        if (ast.kind === Kind.STRING) {
            const { x, y } = JSON.parse(ast.value);
            if (Number.isNaN(+x) && Number.isNaN(+y)) {
                return { x: +x, y: +y };
            }
        }

        return null;
    }
}
