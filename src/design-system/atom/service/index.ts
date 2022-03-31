import { Injectable } from '@nestjs/common';
import { BaseDataService } from '../../../common/module/base.service';
import { Font } from '../schema/font.schema';
import { Shadow } from '../schema/shadow.schema';
import { Corner } from '../schema/corner.schema';
import { Border } from '../schema/border.schema';
import { Color } from '../schema/color.schema';
import { Opacity } from '../schema/opacity.schema';


@Injectable()
export class ColorService extends BaseDataService({ schema: Color }) {}

@Injectable()
export class OpacityService extends BaseDataService({ schema: Opacity }) {}

@Injectable()
export class FontService extends BaseDataService({ schema: Font }) {}

@Injectable()
export class ShadowService extends BaseDataService({ schema: Shadow }) {}

@Injectable()
export class BorderService extends BaseDataService({ schema: Border }) {}

@Injectable()
export class CornerService extends BaseDataService({ schema: Corner }) {}
