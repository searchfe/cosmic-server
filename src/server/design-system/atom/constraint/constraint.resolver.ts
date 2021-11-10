import { ConstraintService } from './constraint.service';
import { Constraint } from './constraint.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateConstraintDTO } from './constraint.dto';

@Resolver('Constraint')
export class ConstraintResolver {
    constructor(
        @Inject(ConstraintService)
        private readonly constraintService: ConstraintService
    ) {}

    @Query(() => Constraint, { name: 'constraint' })
    async getConstraint(@Args({ name: 'id', type: () => String }) id: string) {
        const result = await this.constraintService.findOne(id);
        return { ...result, id: result._id };
    }

    @Mutation(() => Constraint)
    async createConstraint(@Args('constraint') constriant: CreateConstraintDTO) {
        return await this.constraintService.create(constriant);
    }
}
