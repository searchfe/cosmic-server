import { Injectable } from '@nestjs/common';
import { BaseDataService } from '../../common/module/base.service';

import { Draft } from './schema/draft.schema';


@Injectable()
export class DraftService extends BaseDataService(Draft) {}

