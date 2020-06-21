import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectIdColumn, Entity, Column , CreateDateColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Project {
    @Field(type => ID)
    @ObjectIdColumn()
    id: string;

    @Field(type => String)
    @Column({length: 32, nullable: true})
    name: string;

    @Field()
    @CreateDateColumn()
    createdDate: Date;
}