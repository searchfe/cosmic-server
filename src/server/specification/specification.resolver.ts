import { TeamService } from './../team/team.service';
import { Resolver, Args, Query, Mutation, Field } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Specification, Category, SpecificationItem } from './domain/specification.domain';
import { CreateSpecificationInput, CreateCategoryInput, SpecificationItemInput } from './domain/specification.input';
import { SpecificationService } from './specification.service';
import { UserInputError } from 'apollo-server-core';
import { ObjectID } from 'mongodb';

// TODO data validate
@Resolver(of => Specification)
export class SpecificationResolver {
    constructor(
        @Inject(SpecificationService)
        private readonly specificationService: SpecificationService,
        @Inject(TeamService)
        private readonly teamService: TeamService,
    ) {}

    @Query(returns => Specification, { name: 'specification' })
    async getSpecification(
        @Args({ name: 'id' }) id: string,
        @Args({ name: 'fields', type: () => [String]}) fields: Array<string>
    ) {
        let fieldIsValid = true;
        for (let i = 0; i < fields.length; i++) {
            const specKey = fields[i];
            if (!(specKey in Specification)) {
                fieldIsValid = true;
                break;
            }
        }
        if (!fieldIsValid) {
            throw new UserInputError('query fields is not valid');
        }
        return await this.specificationService.findOne(id, fields as (keyof Specification)[]);
    }

    @Query(returns => Category, { name: 'category' })
    async getCategory(
        @Args({ name: 'specificationId', type: () => String }) specificationId: string,
        @Args({ name: 'categoryId', type: () => String }) categoryId: string,
        @Args({ name: 'fields', type: () => [String], nullable: true }) fields: Array<string>,
    ) {
        const result = await this.specificationService.findCategory(
            specificationId,
            { id: categoryId },
            fields ? fields as (keyof Category)[] : undefined,
        );
        return result[0] || {};
    }

    @Query(returns => SpecificationItem, { name: 'specificationItem' })
    async getSpecificationItem(
        @Args({ name: 'specificationId', type: () => String }) specificationId: string,
        @Args({ name: 'categoryId', type: () => String }) categoryId: string,
        @Args({ name: 'names', type: () => [String], nullable: true }) names?: Array<string>,
    ) {
        return await this.specificationService.findItems(specificationId, categoryId, names);
    }

    @Mutation(returns => Specification)
    async createSpecification(@Args('specification') specification: CreateSpecificationInput) {
        const team = await this.teamService.findOne(specification.team);
        if (!team) {
            throw new UserInputError('team not found');
        }
        return await this.specificationService.create({
            team: team.id,
            name: specification.name,
            categories: [],
        });
    }

    @Mutation(returns => Category)
    async addCategory(@Args('category') category: CreateCategoryInput) {
        const specification = await this.specificationService.findOne(category.specificationId, ['id']);
        if (!specification) {
            throw new UserInputError('specification not found');
        }
        const categories = await this.specificationService.findCategory(
            category.specificationId,
            { name: category.name, parent: null },
            ['id']
        );
        if (categories.length > 0) {
            throw new UserInputError('category already exists');
        }
        const newCategory: Record<string, unknown> = { name: category.name, items: [] };
        if (category.parent) {
            newCategory.parent = ObjectID.createFromHexString(category.parent);
        }
        return await this.specificationService.addCategory(category.specificationId, newCategory);
    }

    @Mutation(returns => SpecificationItem)
    async saveItem(@Args('item') itemInput: SpecificationItemInput) {
        return await this.specificationService.saveItem(
            itemInput.specificationId,
            itemInput.categoryId,
            {
                name: itemInput.name,
                meta: itemInput.meta,
            }
        );
    }
}
