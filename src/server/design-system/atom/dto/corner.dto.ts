import { InputType } from "@nestjs/graphql";


@InputType()
export class CreateCornerDTO {
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;
}
