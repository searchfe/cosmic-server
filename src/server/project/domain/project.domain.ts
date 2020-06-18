import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Entity, Column , CreateDateColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Project {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(type => String)
    @Column({length: 32, nullable: true})
    name: string;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}