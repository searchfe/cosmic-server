import { Query, Mutation, Args, Resolver, Subscription } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import type { BaseSchema } from './base.schema';
import type { IBaseDataService } from './base.service';
import type { Class, DeepPartial } from 'utility-types';


const pubsub = new PubSub();

export interface IBaseResolver<TSchema extends BaseSchema> {
    create: (createInput: DeepPartial<TSchema>) => Promise<Class<TSchema>>;
    update: (updateInput: DeepPartial<TSchema>) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    findAll: (query?: DeepPartial<TSchema>, fields?: Array<keyof TSchema>) => Promise<Class<TSchema>[]>;
    findOne: (id: string, fields?: Array<keyof TSchema>) => Promise<Class<TSchema>>;
}

export function BaseResolver<
    TSchema extends BaseSchema,
    TService extends IBaseDataService<TSchema>,
    TQueryInput extends DeepPartial<TSchema>,
    TCreateInput extends DeepPartial<TSchema>,
    TUpdateInput extends DeepPartial<TSchema>,
>(
    options: {
        schema: Class<TSchema>,
        service: Class<TService>,
        queryInput: Class<TQueryInput>,
        createInput: Class<TCreateInput>,
        updateInput: Class<TUpdateInput>
    }
): Class<IBaseResolver<TSchema>> {
        const { schema, service, queryInput, createInput, updateInput } = options;
        const lowerCaseName = schema.name.toLocaleLowerCase();
        const capitalizeName = capitalize(schema.name);
        const createTrigger = `on${capitalizeName}Create`;

        @Resolver({ isAbstract: true })
        class BaseResolver implements IBaseResolver<TSchema> {
            @Inject(service)
            private readonly dataService: TService;

            @Mutation(() => schema, { name: `create${capitalizeName}` })
            async create(
                @Args({ type: () => createInput, name: 'data' })
                data: TCreateInput
            ): Promise<Class<TSchema>> {
                const result = await this.dataService.create(data);
                pubsub.publish(createTrigger, { [createTrigger]: result });
                return result;
            }

            @Mutation(() => schema, { name: `update${capitalizeName}`, })
            async update(
              @Args({ type: () => updateInput, name: 'data' })
              data: TUpdateInput,
            ) {
              return await this.dataService.update(data);
            }

            @Mutation(() => schema, { name: `delete${capitalizeName}`, })
            async delete(@Args('id', { type: () => String }) id: string) {
              return await this.dataService.delete(id);
            }

            @Query(() => schema, { name: `get${capitalizeName}`, nullable: true })
            async findOne(
                @Args('id', { type: () => String })
                id: string,
                @Args({ type: () => [String], name: 'fields', nullable: true })
                fields?: Array<keyof TSchema>
            ) {
              return await this.dataService.findOne(id, fields);
            }

            @Query(() => [schema], { name: `${lowerCaseName}s` })
            async findAll(
                @Args({ type: () => queryInput, name: 'query', nullable: true })
                query?: TCreateInput,
                @Args({ type: () => [String], name: 'fields', nullable: true })
                fields?: Array<keyof TSchema>
            ) {
                return await this.dataService.findAll(query, fields);
            }

            @Subscription(() => schema, { name: createTrigger })
            async onCreate() {
                return pubsub.asyncIterator(createTrigger);
            }

        }
        return BaseResolver;
    }
