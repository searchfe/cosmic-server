import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, ManyToOne , CreateDateColumn, Column} from 'typeorm';
import { Project } from './project.domain';
import { User } from '../../user/domain/user.domain';
import { Team } from '../../team/domain/team.domain';

export enum ProjectPermissionEnum {
    SUPER = 'super',
    ADMIN = 'admin',
    WRITE = 'write',
    READ = 'read'
}

@Entity()
@ObjectType()
export class ProjectPermisson {
    @Field(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @ManyToOne(type => User)
    user?: User;

    @Field()
    @ManyToOne(type => Team)
    team?: Team;

    @Field()
    @ManyToOne(type => Project)
    project: Project;

    @Field()
    @Column({
        type: "enum",
        enum: ProjectPermissionEnum,
        default: ProjectPermissionEnum.READ
    })
    permission: ProjectPermissionEnum;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}