import { InputType, Field, ID } from '@nestjs/graphql';

import type { EConstaintType } from '../schema/constraint.schema';


@InputType()
export class CreateConstraintDTO {
    /**
     * vertical constraint
     */
    vertical: EConstaintType;
    /**
     * horizontal constraint
     */
    horizontal: EConstaintType;
}

@InputType()
export class QueryConstraintDTO {
    @Field({ nullable: true })
    id?: string;

    @Field(() => ID, { nullable: true })
    team?: string;
}
