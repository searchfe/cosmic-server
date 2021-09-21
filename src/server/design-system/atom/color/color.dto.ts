import { InputType } from '@nestjs/graphql';
import { ColorString } from './color.scalar';

@InputType()
export class CreateColorDTO {
    /**
     * support rgb、rgba、hex string
     */
    color: ColorString;
}
