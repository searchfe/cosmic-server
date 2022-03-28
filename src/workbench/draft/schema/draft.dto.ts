import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@InputType()
export class CreateDraftDTO extends CreateBaseDTO {}

@InputType()
export class QueryDraftDTO extends PartialType(CreateDraftDTO) {
    @Field()
    id?: string;
}
