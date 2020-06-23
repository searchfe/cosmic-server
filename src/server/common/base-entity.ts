import { Field } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @Field()
    @CreateDateColumn()
    createdDate: Date;

    @Field()
    @UpdateDateColumn()
    lastmodifiedDate: Date;
}
