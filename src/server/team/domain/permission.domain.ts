import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, ManyToOne , CreateDateColumn, Column} from 'typeorm';
import { Team } from './team.domain';
import { User } from '../../user/domain/user.domain';

export enum TeamPermissionEnum {
    SUPER = 'super',
    NORMAL = 'normal'
}

@Entity()
@ObjectType()
export class TeamPermisson {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Field(type => Team)
    @ManyToOne(type => Team)
    team: Team;
    
    @Field(type => User)
    @ManyToOne(type => User)
    user: User;

    @Field()
    @Column({
        type: "enum",
        enum: TeamPermissionEnum,
        default: TeamPermissionEnum.NORMAL
    })
    permission: TeamPermissionEnum;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}