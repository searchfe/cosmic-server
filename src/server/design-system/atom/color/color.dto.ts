import { InputType, Field } from '@nestjs/graphql';
import { ColorString } from './color.scalar';

@InputType()
export class CreateColorDTO {

    @Field()
    color: ColorString;
}
