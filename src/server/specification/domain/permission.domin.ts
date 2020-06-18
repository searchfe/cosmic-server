import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, ManyToOne , CreateDateColumn, Column} from 'typeorm';
import { Specification } from './specification.domain';
import { User } from '../../user/domain/user.domain';
import { Team } from '../../team/domain/team.domain';

export enum SpecificationPermissionEnum {
    SUPER = 'super',
    ADMIN = 'admin',
    WRITE = 'write',
    READ = 'read'
}

@Entity()
@ObjectType()
export class SpecificationPermisson {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @ManyToOne(type => User)
    user?: User;

    @Field()
    @ManyToOne(type => Team)
    team?: Team;

    @Field()
    @ManyToOne(type => Specification)
    specification: Specification;

    @Field()
    @Column({
        type: "enum",
        enum: SpecificationPermissionEnum,
        default: SpecificationPermissionEnum.READ
    })
    permission: SpecificationPermissionEnum;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}