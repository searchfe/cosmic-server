import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, Column , CreateDateColumn} from 'typeorm';
import { Location } from './location';

@Entity()
@ObjectType()
export class Member {
    @Field(type => ID)
    @Column(type => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => String)
    @Column({length: 32, nullable: true})
    name: string;

    @Field()
    @Column(type => Location)
    loc: Location;

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