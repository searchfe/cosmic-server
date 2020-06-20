import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@server/common/base-entity';

@Entity()
@ObjectType()
export class User extends BaseEntity{
    @Field(type => String)
    @Column({length: 64, nullable: true})
    email: string;

    @Field(type => String)
    @Column({length: 64})
    username: string;

    @Field(type => String)
    @Column({length: 128})
    password: string;

    @Field(type => String)
    @Column({length: 32, nullable: true})
    name: string;

    @Field({nullable: true})
    @Column({length: 64, nullable: true})
    intro?: string;

    @Field({nullable: true})
    @Column({length: 64, nullable: true})
    avatar?: string;
}