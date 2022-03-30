import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Component } from './schema/component.schema';
import { ComponentService } from './component.service';
import { BaseResolver } from '../../common/module/base.resolver';
import { CreateComponentDTO, QueryComponentDTO } from './schema/component.dto';
import { Inject } from '@nestjs/common';


@Resolver(() => Component)
export class ComponentResolver extends BaseResolver({
    schema: Component,
    service: ComponentService,
    createInput: CreateComponentDTO,
    queryInput: QueryComponentDTO,
    updateInput: CreateComponentDTO,
}) {
    @Inject(ComponentService)
    private readonly componentService: ComponentService;

    @Mutation(() => Number, { name: 'deleteComponentByTeamAndName' })
    async deleteByTeamAndName(@Args('data', { type: () => QueryComponentDTO }) data: QueryComponentDTO) {
        const del = await this.componentService.deleteByTeamAndName(data);
        return del.deletedCount;
    }

    @Mutation(() => Boolean, { name: 'updateComponentByTeamAndName' })
    async updateByTeamAndName(@Args('data', { type: () => CreateComponentDTO }) data: CreateComponentDTO) {
        return this.componentService.updateByTeamAndName(data);
    }
}
