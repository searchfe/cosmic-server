import { Resolver } from '@nestjs/graphql';
import { Component } from './schema/component.schema';
import { ComponentService } from './component.service';
import { BaseResolver } from '../common/module/base.resolver';
import { CreateComponentDTO, QueryComponentDTO } from './schema/component.dto';


@Resolver(() => Component)
export class ComponentResolver extends BaseResolver({
    schema: Component,
    service: ComponentService,
    createInput: CreateComponentDTO,
    queryInput: QueryComponentDTO,
    updateInput: CreateComponentDTO,
}) { }
