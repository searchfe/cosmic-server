import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../common/module/base.resolver';

import { Draft } from './schema/draft.schema';
import { CreateDraftDTO, QueryDraftDTO } from './schema/draft.dto';
import { DraftService } from './draft.service';


@Resolver(() => Draft)
export class DraftResolver extends BaseResolver({
    schema: Draft,
    service: DraftService,
    queryInput: QueryDraftDTO,
    createInput: CreateDraftDTO,
    updateInput: QueryDraftDTO,
}) {}
