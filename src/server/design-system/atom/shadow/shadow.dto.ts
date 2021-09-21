import { Vector } from './../common/scalar/vector.scalar';
import { EShadowType } from './shadow.schema';
import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateShadowDTO {
    /**
     * inset or outset shadow
     */
    type?: EShadowType;

    /**
     * position
     */
    offset: Vector;

    /**
     * shadow size
     */
    spread?: number;

    /**
     * blur radius
     */
    blur: number;
}
