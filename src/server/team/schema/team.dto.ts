import { Field, InputType } from '@nestjs/graphql';

export enum PermissionEnum {
    NORMAL = 'normal',
    OWNER = 'owner',
}

@InputType()
export class CreateTeamDTO {
    @Field()
    name: string;
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
