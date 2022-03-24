import { InputType, Field, PickType } from '@nestjs/graphql';


@InputType()
export class CreateUserDTO {
    @Field({ nullable: true })
    name?: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    intro?: string;

    @Field({ nullable: true })
    avatar?: string;
}

@InputType()
export class UpdateUserDTO extends PickType(CreateUserDTO, ['name', 'intro', 'avatar'] as const) {
    @Field()
    id: string;
}

@InputType()
export class QueryUserDTO extends CreateUserDTO {
    @Field()
    id: string;
}
