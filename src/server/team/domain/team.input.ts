import { Field, InputType } from '@nestjs/graphql';

export enum PermissionEnum {
    NORMAL = 'normal',
}

@InputType()
export class CreateTeamInput {
    @Field()
    name: string;

    @Field()
    owner: string;
}

@InputType()
export class UpdateTeamInput {
    @Field()
    id: string;

    @Field()
    name: string;
}

@InputType()
export class CreateTeamMemberInput {
    @Field()
    user: string;

    @Field()
    permission: PermissionEnum;
}
