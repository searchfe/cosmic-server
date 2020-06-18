import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Specification } from './domain/specification.domain';
import { SpecificationInput } from './domain/specification.input';
import { SpecificationService } from './specification.service';

// TODO data validate
@Resolver(of => Specification)
export class SpecificationResolver {
    constructor(@Inject(SpecificationService)
        private readonly specificationService: SpecificationService,
    ) {}

    @Query(returns => Specification, { name: 'specification' })
    async getSpecification(@Args({ name: 'id', type: () => String }) id: string):Promise<Specification> {
        return await this.specificationService.findOne(id);
    }

    @Mutation(returns => Specification)
    async addSpecification(@Args('specification') specification: SpecificationInput) {
      await this.specificationService.create(specification);
      return specification;
    }

    @Mutation(returns => Specification)
    async modifySpecification(@Args('specification') specification: SpecificationInput) {
      return this.specificationService.modify(specification);
    }

}
