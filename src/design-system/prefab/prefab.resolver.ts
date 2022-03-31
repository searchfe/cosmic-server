import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../common/module/base.resolver';
import { Prefab } from './schema/prefab.schema';
import { CreatePrefabDTO, QueryPrefabDTO } from './schema/prefab.dto';
import { PrefabService } from './prefab.service';


@Resolver(() => Prefab)
export class PrefabResolver extends BaseResolver({
    schema: Prefab,
    service: PrefabService,
    queryInput: QueryPrefabDTO,
    createInput: CreatePrefabDTO,
    updateInput: QueryPrefabDTO,
}) {}
