import { Field, ID } from '@nestjs/graphql';
import { ObjectID } from 'mongodb';
import { CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

export class BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @CreateDateColumn()
    createdDate: Date;

    @Field()
    @UpdateDateColumn()
    lastmodifiedDate: Date;
}