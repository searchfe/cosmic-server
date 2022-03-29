import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@InputType()
export class CreateDraftDTO extends CreateBaseDTO {
    @Field(() => ID)
    project: string;
}

@InputType()
export class QueryDraftDTO extends PartialType(CreateDraftDTO) {
    @Field(() => ID)
    id?: string;
}
