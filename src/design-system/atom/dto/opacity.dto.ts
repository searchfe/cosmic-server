import { InputType, Field } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../common/module/base.dto';


@InputType()
export class CreateOpacityDTO extends CreateBaseDTO {
    @Field()
    opacity: number;
}
