import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, Column , CreateDateColumn, OneToMany } from 'typeorm';
// import { Location } from './location';

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Field({nullable: true})
    @Column({length: 64, nullable: true})
    blank?: string;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}