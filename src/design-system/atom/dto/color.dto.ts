import { InputType, Field } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../common/module/base.dto';


@InputType()
export class CreateColorDTO extends CreateBaseDTO {
    @Field()
    day: string;

    @Field()
    night?: string;

    @Field()
    dark?: string;
}
