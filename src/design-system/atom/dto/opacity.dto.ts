import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@InputType()
export class CreateOpacityDTO extends CreateBaseDTO {
    @Field()
    opacity: number;
}

@InputType()
export class QueryOpacityDTO extends PartialType(CreateOpacityDTO) {
    @Field()
    id?: string;
}
