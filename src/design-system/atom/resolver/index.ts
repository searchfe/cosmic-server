import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../common/module/base.resolver';

import { Color } from '../schema/color.schema';
import { CreateColorDTO, QueryColorDTO } from '../dto/color.dto';

import { Opacity } from '../schema/opacity.schema';
import { CreateOpacityDTO, QueryOpacityDTO } from '../dto/opacity.dto';

import { Font } from '../schema/font.schema';
import { CreateFontDTO, QueryFontDTO } from '../dto/font.dto';

import { Shadow } from '../schema/shadow.schema';
import { CreateShadowDTO, QueryShadowDTO } from '../dto/shadow.dto';

import { Border } from '../schema/border.schema';
import { CreateBorderDTO, QueryBorderDTO } from '../dto/border.dto';

import { Corner } from '../schema/corner.schema';
import { CreateCornerDTO, QueryCornerDTO } from '../dto/corner.dto';

import {
    ColorService,
    OpacityService,
    FontService,
    ShadowService,
    BorderService,
    CornerService,
    // LayoutService,
    // CornerService,
} from '../service/index';


@Resolver(() => Color)
export class ColorResolver extends BaseResolver({
    schema: Color,
    service: ColorService,
    queryInput: QueryColorDTO,
    createInput: CreateColorDTO,
    updateInput: CreateColorDTO,
}) {}

@Resolver(() => Opacity)
export class OpacityResolver extends BaseResolver({
    schema: Opacity,
    service: OpacityService,
    queryInput: QueryOpacityDTO,
    createInput: CreateOpacityDTO,
    updateInput: CreateOpacityDTO,
}) {}

@Resolver(() => Font)
export class FontResolver extends BaseResolver({
    schema: Font,
    service: FontService,
    queryInput: QueryFontDTO,
    createInput: CreateFontDTO,
    updateInput: CreateFontDTO,
}) {}

@Resolver(() => Shadow)
export class ShadowResolver extends BaseResolver({
    schema: Shadow,
    service: ShadowService,
    queryInput: QueryShadowDTO,
    createInput: CreateShadowDTO,
    updateInput: CreateShadowDTO,
}) {}

@Resolver(() => Border)
export class BorderResolver extends BaseResolver({
    schema: Border,
    service: BorderService,
    queryInput: QueryBorderDTO,
    createInput: CreateBorderDTO,
    updateInput: CreateBorderDTO,
}) {}

@Resolver(() => Corner)
export class CornerResolver extends BaseResolver({
    schema: Corner,
    service: CornerService,
    queryInput: QueryCornerDTO,
    createInput: CreateCornerDTO,
    updateInput: CreateCornerDTO,
}) {}
