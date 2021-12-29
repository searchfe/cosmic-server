import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fileds2MongoProjection } from '@server/common/util/db';
import { TeamService } from '@server/team/team.service';
import { UserInputError } from 'apollo-server-core';
import { CreateCategoryDTO, CreateSpecificationDTO, UpdateCategoryDTO, UpdateSpecificationDTO } from './schema/specification.dto';
import { Category, Specification } from './schema/specification.schema';
import { SpecificationService } from './specification.service';


@Resolver(() => Specification)
export class SpecificationResolver {
    constructor(
        @Inject(SpecificationService)
        private readonly specificationService: SpecificationService,
        @Inject(TeamService)
        private readonly teamService: TeamService,
    ) {}

    @Query(() => Specification, { name: 'specification' })
    async getSpecification(
        @Args({ name: 'id' }) id: string,
        @Args({ name: 'fields', type: () => [String], nullable: true }) fields?: Array<string>
    ) {
        const projection = fields ? fileds2MongoProjection(fields) : undefined;
        return await this.specificationService.findOne(id, projection);
    }

    @Query(() => [Specification])
    async getAllSpecification(@Args({ name: 'teamId',  type: () => String }) teamId: string) {
        return await this.specificationService.findAll(teamId);
    }

    @Query(() => Category, { name: 'category' })
    async getCategory(
        @Args({ name: 'specificationId', type: () => String }) specificationId: string,
        @Args({ name: 'categoryId', type: () => String }) categoryId: string,
        @Args({ name: 'fields', type: () => [String], nullable: true }) fields?: Array<string>,
    ) {
        const projection = fields && fields.length > 0 ? fileds2MongoProjection(fields || []) : undefined;
        const result = await this.specificationService.getCategory(specificationId, {  name: '字体' }, projection);
        return result;
    }

    @Mutation(() => Specification)
    async createSpecification(@Args('specification') specification: CreateSpecificationDTO) {
        const team = await this.teamService.findOne(specification.team);
        if (!team || !team._id) {
            throw new UserInputError('team not found');
        }
        return await this.specificationService.create({
            team: team._id,
            name: specification.name,
            categories: [],
        });
    }

    @Mutation(() => Specification)
    async updateSpecification(
        @Args('specification')
        specification: UpdateSpecificationDTO,
        @Args({ name: 'fields', type: () => [String], description: "fields to return ", defaultValue: ['id', 'name'] })
        fields: string[]
    ) {
        const projection = fileds2MongoProjection(fields);
        const result = await this.specificationService.update(specification, projection);
        return {
            ...result,
            id: result._id
        };
    }

    @Mutation(() => ID)
    async createCategory(@Args('category') category: CreateCategoryDTO) {
        const specification = await this.getSpecification(category.specificationId, ['_id']);
        if (!specification) {
            throw new UserInputError('specification not found');
        }
        const existingCategory= await this.specificationService.getCategory(
            category.specificationId,
            { name: category.name },
            { id: 1 }
        );
        if (existingCategory && existingCategory.categories) {
            throw new UserInputError('category already exists');
        }
        const newCategory: Record<string, unknown> = { ...category };
        delete newCategory['specificationId'];
        return await this.specificationService.createCategory(category.specificationId, newCategory);
    }

    @Mutation(() => Boolean)
    async updateCategory(@Args('category') category: UpdateCategoryDTO) {
        const newCategory = { ...category };
        delete newCategory.specificationId;
        return await this.specificationService.updateCategory(category.specificationId, newCategory);
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Args('specificationId') specificationId: string, @Args('categoryId') categoryId: string) {
        return await this.specificationService.deleteCategory(specificationId, categoryId);
    }
}
