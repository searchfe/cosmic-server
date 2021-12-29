import { InputType } from "@nestjs/graphql";
import type { EShadowType } from '../schema/shadow.schema';


@InputType()
export class CreateShadowDTO {
    /**
     * inset or outset shadow
     */
    type?: EShadowType;

    /**
     * position
     */
    // offset: Vector;

    /**
     * shadow size
     */
    spread?: number;

    /**
     * blur radius
     */
    blur: number;
}
