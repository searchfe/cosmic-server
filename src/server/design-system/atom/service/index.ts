import { Injectable } from '@nestjs/common';
import { Text } from '../schema/text.schema';
import { Layout } from '../schema/layout.schema';
import { Shadow } from '../schema/shadow.schema';
import { Corner } from '../schema/corner.schema';
import { Stroke } from '../schema/stroke.schema';
import { Constraint } from '../schema/constraint.schema';
import { Color } from '../schema/color.schema';
import { BaseDataService } from '../../common/module/base.service';


@Injectable()
export class ColorService extends BaseDataService<Color>(Color){}

@Injectable()
export class TextService extends BaseDataService<Text>(Text){}

@Injectable()
export class ShadowService extends BaseDataService<Shadow>(Shadow){}

@Injectable()
export class StrokeService extends BaseDataService<Stroke>(Stroke){}

@Injectable()
export class LayoutService extends BaseDataService<Layout>(Layout){}

@Injectable()
export class ConstaintService extends BaseDataService<Constraint>(Constraint){}

@Injectable()
export class CornerService extends BaseDataService<Corner>(Corner){}
