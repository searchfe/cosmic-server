import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@server/common/base-entity';
import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Team extends BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    id: string;

    @Field(type => String)
    @Column({ length: 32 })
    name: string;

    @Field(type => ID)
    @Column()
    owner: ObjectID;

    @Field(type => [TeamMemer])
    @Column(type => TeamMemer)
    members: TeamMemer[];
}

@ObjectType()
export class TeamMemer {
    @Field(type => String)
    @Column()
    user: ObjectID;

    @Field(type => String)
    @Column()
    permission: string;
}
