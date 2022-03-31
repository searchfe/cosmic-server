import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@InputType()
export class CreatePrefabDTO extends CreateBaseDTO {
    @Field(() => ID)
    component: string;

    @Field(() => [ID])
    atoms: string[];
}

@InputType()
export class QueryPrefabDTO extends PartialType(CreatePrefabDTO) {
    @Field()
    id?: string;
}

