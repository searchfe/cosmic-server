import { InputType, Field, ID } from "@nestjs/graphql";
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

@InputType()
export class QueryShadowDTO {
    @Field({ nullable: true })
    id?: string;

    @Field(() => ID, { nullable: true })
    team?: string;
}
