import { InputType, Field } from '@nestjs/graphql';
import { CreateBaseDTO, QueryBaseDTO } from '../../common/module/base.dto';


@InputType()
export class CreateColorDTO extends CreateBaseDTO {
    @Field()
    day: string;

    @Field()
    night?: string;

    @Field()
    dark?: string;
}

@InputType()
export class QueryColorDTO extends QueryBaseDTO {
    @Field()
    day?: string;

    @Field()
    night?: string;

    @Field()
    dark?: string;
}
