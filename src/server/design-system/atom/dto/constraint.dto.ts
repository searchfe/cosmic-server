import { InputType } from '@nestjs/graphql';

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
