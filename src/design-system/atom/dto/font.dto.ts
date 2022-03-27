import { InputType, Field } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../common/module/base.dto';


@InputType()
export class CreateFontDTO extends CreateBaseDTO {
    @Field()
    style: string;

    @Field()
    variant: string;

    @Field()
    weight: string;

    @Field()
    size: string;

    @Field()
    lineHeight: string;

    @Field()
    family: string;
}
