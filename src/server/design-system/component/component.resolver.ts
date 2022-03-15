import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Component } from './schema/component.schema';
import { ComponentService } from './component.service';

@Resolver(() => Component)
export class ComponentResolver {
    constructor(
        @Inject(ComponentService)
        private readonly componentService: ComponentService
    ) {}

    @Query(() => Component, { name: 'component' })
    async getComponent(@Args({ name: 'id', type: () => String }) id: string) {
        return this.componentService.findOne({ id });
    }
}
