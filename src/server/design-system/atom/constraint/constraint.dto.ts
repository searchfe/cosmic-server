import { EConstaintType } from './constraint.schema';
import { InputType } from "@nestjs/graphql";

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
