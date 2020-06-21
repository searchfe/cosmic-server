import { BaseEntity } from '@server/common/base-entity';
import { ObjectID } from 'mongodb';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectIdColumn, Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Specification extends BaseEntity{
    @Field(type => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(type => String)
    @Column({length: 32, nullable: true})
    name: string;

    @Field(type => ID)
    @Column()
    team: ObjectID;

    @Field(type => [Category])
    @Column(type => Category)
    categories: Category[];
}

@ObjectType()
export class Category {
    @Field(type => ID)
    @Column()
    id: ObjectID;

    @Field()
    @Column()
    name: string;

    @Field(type => ID)
    @Column()
    parent?: ObjectID;

    @Field(type => [SpecificationItem])
    @Column(type => SpecificationItem)
    items: SpecificationItem[];
}

@ObjectType()
export class SpecificationItem {
    @Field()
    @Column()
    name: string;
    
    @Field()
    @Column({ nullable: true })
    meta?: string;
}
