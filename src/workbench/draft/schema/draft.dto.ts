import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';
import { GraphQLJSON } from 'graphql-type-json';


@InputType()
export class CreateDraftDTO extends CreateBaseDTO {
    @Field(() => ID)
    project: string;

    @Field(() => GraphQLJSON)
    data: any;
}

@InputType()
export class QueryDraftDTO extends PartialType(CreateDraftDTO) {
    @Field(() => ID)
    id?: string;
}
