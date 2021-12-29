import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { fileds2MongoProjection } from '@server/common/util/db';
import { UserInputError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';
import { LevelService } from './level.service';
import { CreateItemDTO, CreateLevelDTO } from './schema/level.dto';
import { Level } from './schema/level.schema';
import { SpecificationService } from './specification.service';

@Resolver(() => Level)
export class LevelResolver {
    constructor(
        @Inject(LevelService)
        private readonly levelService: LevelService,
        @Inject(SpecificationService)
        private readonly specificationService: SpecificationService
    ) {}

    @Query(() => Level, { name: 'level' })
    async getLevel(
        @Args({ name: 'id' }) id: string,
        @Args({ name: 'fields', type: () => [String], nullable: true }) fields?: Array<string>
    ) {
        const projection = fields ? fileds2MongoProjection(fields) : undefined;
        const level = await this.levelService.findOne(id, projection);
        const result = {
            id: level._id,
            ...level
        };
        delete result._id;
        return result;
    }

    @Query(() => [Level], { name: 'levels' })
    async getLevels(
        @Args({ name: 'specification' }) specification: string,
        @Args({ name: 'categories', type: () => [String] }) categories: Array<string>,
    ) {
        return await this.levelService.findAll(specification, categories);
    }

    @Mutation(() => Level)
    async createLevel(@Args('level') level: CreateLevelDTO) {
        const spec = await this.specificationService.getCategory(
            level.specification, { id: level.category }, { id: 1, categories: 1 }
        );
        if (!spec || !spec.categories || !spec.categories.length) {
            throw new UserInputError('category not found');
        }
        return await this.levelService.create(level);
    }

    @Mutation(() => String)
    async createItem(
        @Args('levelId') levelId: string,
        @Args('item') item: CreateItemDTO
    ) {
        const result = await this.levelService.createItem(levelId, item);
        if (result) {
            return result;
        }
        throw new GraphQLError('create faild');
    }
}
