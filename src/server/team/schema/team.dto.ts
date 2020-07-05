import { Field, InputType } from '@nestjs/graphql';

export enum PermissionEnum {
    NORMAL = 'normal',
}

@InputType()
export class CreateTeamDTO {
    @Field()
    name: string;

    @Field()
    owner: string;
}

@InputType()
export class UpdateTeamDTO {
    @Field()
    id: string;

    @Field()
    name: string;
}

@InputType()
export class AddTeamMemberDTO {
    @Field()
    user: string;

    @Field({ nullable: true })
    permission?: PermissionEnum;
}
