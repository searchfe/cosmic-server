import { InputType, Field, ID } from '@nestjs/graphql';
import { EShadowType } from '../schema/shadow.schema';
import { CreateBaseDTO } from '../../common/module/base.dto';


@InputType()
export class CreateShadowDTO extends CreateBaseDTO {
    @Field()
    type?: EShadowType;

    @Field()
    offsetX?: string;

    @Field()
    offsetY?: string;

    @Field()
    blur: string;

    @Field()
    spread?: string;

    @Field(() => ID)
    color?: string;
}
