import { Field, InputType, ObjectType } from '@nestjs/graphql';


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

@ObjectType()
@InputType()
class QueryTeamMemberDTO {
    @Field(() => String)
    user: string;
}

@InputType()
export class QueryTeamDTO  {
    @Field()
    id?: string;

    @Field()
    name?: string;

    @Field()

    @Field(() => QueryTeamMemberDTO, { nullable: true })
    members?: QueryTeamMemberDTO;
}
