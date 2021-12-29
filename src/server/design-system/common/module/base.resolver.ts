import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import { Inject } from '@nestjs/common';
import type { BaseSchema } from './base.schema';
import type { IBaseDataService } from './base.service';
import type { Class } from 'utility-types';
import { DeepPartial } from 'utility-types';


export interface IBaseResolver<TSchema extends BaseSchema> {
    create: (createInput: DeepPartial<TSchema>) => Promise<Class<TSchema>>;
    update: (updateInput: DeepPartial<TSchema>) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
    findAll: (query?: DeepPartial<TSchema>, fileds?: Array<keyof TSchema>) => Promise<Class<TSchema>[]>;
    findOne: (id: string, fileds?: Array<keyof TSchema>) => Promise<Class<TSchema>>;
}

export function BaseResolver<
    TSchema extends BaseSchema,
    TService extends IBaseDataService<TSchema>,
    TCreateInput extends DeepPartial<TSchema>,
    TUpdateInput extends DeepPartial<TSchema>,
>(
    schema: Class<TSchema>,
    service: Class<TService>,
    createInput: Class<TCreateInput>,
    updateInput: Class<TUpdateInput>
): Class<IBaseResolver<TSchema>> {
        const lowerCaseName = schema.name.toLocaleLowerCase();
        const capitalizeName = capitalize(schema.name);
        @Resolver({ isAbstract: true })
        class BaseResolver implements IBaseResolver<TSchema> {
            @Inject(service)
            private readonly dataService: TService;

            @Mutation(() => schema, { name: `create${capitalizeName}` })
            async create(
                @Args({ type: () => createInput, name: lowerCaseName })
                data: TCreateInput
            ): Promise<Class<TSchema>> {
                return await this.dataService.create(data);
            }

            @Mutation(() => schema, { name: `update${capitalizeName}`, })
            async update(
              @Args({ type: () => updateInput, name: lowerCaseName })
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
                @Args({ type: () => [String], name: 'fileds', nullable: true })
                fileds?: Array<keyof TSchema>
            ) {
              return await this.dataService.findOne(id, fileds);
            }

            @Query(() => [schema], { name: `${lowerCaseName}s` })
            async findAll(
                @Args({ type: () => createInput, name: 'query', nullable: true })
                query?: DeepPartial<TSchema>,
                @Args({ type: () => [String], name: 'fileds', nullable: true })
                fileds?: Array<keyof TSchema>
            ) {
                return await this.dataService.findAll(query, fileds);
            }
        }
        return BaseResolver;
    }
