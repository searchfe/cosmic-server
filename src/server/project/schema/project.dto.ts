import { InputType, Field, ID, PickType } from '@nestjs/graphql';

export enum TypeEnum {
    MOBILE = 'mobile',
    PC = 'pc'
}

@InputType()
export class CreateProjectDTO {
    @Field()
    name: string;

    @Field(() => ID)
    team: string;

    @Field(() => String, { description: 'enum: pc or mobile' })
    type: TypeEnum;
}

@InputType()
export class UpdateProjectDTO extends PickType(CreateProjectDTO, ['name', 'type'] as const) {
    @Field(() => ID)
    id: string;
}
