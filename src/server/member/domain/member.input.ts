import { InputType, Field, ID } from '@nestjs/graphql';
import { ILocation, LocationInput } from './location';


@InputType()
export class MemberInput {

    @Field(type => ID)
    id?: string;
    
    @Field({nullable: true})
    name?: string;

    @Field(type => LocationInput, {nullable: true})
    loc?: LocationInput;

    @Field({nullable: true})
    intro?: string;

    @Field({nullable: true})
    avatar?: string;

    @Field({nullable: true})
    blank?: string;

}