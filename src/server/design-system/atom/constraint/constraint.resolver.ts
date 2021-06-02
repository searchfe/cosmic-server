import { Constraint } from './constraint.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('Constraint')
export class ConstraintResolver {
    @Query(() => Constraint, { name: 'constraint' })
    async getConstraint(@Args({ name: 'id', type: () => String }) id: string) {
        return null;
    }

    @Mutation(() => Constraint)
    async createConstraint(@Args('constraint') constraint: string) {
        return null;
    }
}
