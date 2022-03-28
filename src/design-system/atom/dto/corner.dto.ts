import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@InputType()
export class CreateCornerDTO extends CreateBaseDTO {
    @Field(() => [String])
    tl: string[];

    @Field(() => [String])
    tr: string[];

    @Field(() => [String])
    bl: string[];

    @Field(() => [String])
    br: string[];
}

@InputType()
export class QueryCornerDTO extends PartialType(CreateCornerDTO) {
    @Field()
    id?: string;
}
