import { InputType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateBaseDTO } from '../../../common/module/base.dto';


@ObjectType()
@InputType('BorderItemInput')
class BorderItem {
    @Field(() => String)
    weight: string;

    @Field(() => String)
    style: string;
}

@InputType()
export class CreateBorderDTO extends CreateBaseDTO {
    @Field(() => BorderItem)
    top: BorderItem;

    @Field(() => BorderItem)
    right: BorderItem;

    @Field(() => BorderItem)
    bottom: BorderItem;

    @Field(() => BorderItem)
    left: BorderItem;
}

@InputType()
export class QueryBorderDTO extends PartialType(CreateBorderDTO) {
    @Field()
    id?: string;
}
