import { Column } from 'typeorm';
import { Field, InterfaceType, InputType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
@InputType({isAbstract: true})
export abstract class ILocation {

    @Field({nullable: true})
    @Column({length: 32, nullable: true})
    country?: string;

    @Field({nullable: true})
    @Column({length: 32, nullable: true})
    province?: string;

    @Field({nullable: true})
    @Column({length: 32, nullable: true})
    district?: string;

}

@ObjectType({ implements: ILocation })
export class Location extends ILocation {}

@InputType()
export class LocationInput extends ILocation {}
