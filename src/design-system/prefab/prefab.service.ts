import { Injectable } from '@nestjs/common';
import { BaseDataService } from '../../common/module/base.service';
import { Prefab } from './schema/prefab.schema';


@Injectable()
export class PrefabService extends BaseDataService({ schema: Prefab }) {}
