import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../common/module/base.resolver';
import { QueryBaseDTO } from '../../common/module/base.dto';

import { Color } from '../schema/color.schema';
import { CreateColorDTO } from '../dto/color.dto';

import { Opacity } from '../schema/opacity.schema';
import { CreateOpacityDTO } from '../dto/opacity.dto';

import { Font } from '../schema/font.schema';
import { CreateFontDTO } from '../dto/font.dto';

import { Shadow } from '../schema/shadow.schema';
import { CreateShadowDTO } from '../dto/shadow.dto';

import { Border } from '../schema/border.schema';
import { CreatBorderDTO } from '../dto/border.dto';

import { Corner } from '../schema/corner.schema';
import { CreateCornerDTO } from '../dto/corner.dto';


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
    queryInput: QueryBaseDTO,
    createInput: CreateColorDTO,
    updateInput: CreateColorDTO,
}) {}

@Resolver(() => Opacity)
export class OpacityResolver extends BaseResolver({
    schema: Opacity,
    service: OpacityService,
    queryInput: QueryBaseDTO,
    createInput: CreateOpacityDTO,
    updateInput: CreateOpacityDTO,
}) {}

@Resolver(() => Font)
export class FontResolver extends BaseResolver({
    schema: Font,
    service: FontService,
    queryInput: QueryBaseDTO,
    createInput: CreateFontDTO,
    updateInput: CreateFontDTO,
}) {}

@Resolver(() => Shadow)
export class ShadowResolver extends BaseResolver({
    schema: Shadow,
    service: ShadowService,
    queryInput: QueryBaseDTO,
    createInput: CreateShadowDTO,
    updateInput: CreateShadowDTO,
}) {}

@Resolver(() => Border)
export class BorderResolver extends BaseResolver({
    schema: Border,
    service: BorderService,
    queryInput: QueryBaseDTO,
    createInput: CreatBorderDTO,
    updateInput: CreatBorderDTO,
}) {}

@Resolver(() => Corner)
export class CornerResolver extends BaseResolver({
    schema: Corner,
    service: CornerService,
    queryInput: QueryBaseDTO,
    createInput: CreateCornerDTO,
    updateInput: CreateCornerDTO,
}) {}


// @Resolver(() => Constraint)
// export class ConstraintResolver extends BaseResolver<
//     Constraint, ConstaintService, QueryConstraintDTO, CreateConstraintDTO, CreateConstraintDTO
// >(Constraint, ConstaintService, QueryConstraintDTO, CreateConstraintDTO, CreateConstraintDTO) {}



// @Resolver(() => Stroke)
// export class StrokeResolver extends BaseResolver<
//     Stroke, StrokeService, QueryStrokeDTO, CreatStrokeDTO, CreatStrokeDTO
// >(Stroke, StrokeService, QueryStrokeDTO, CreatStrokeDTO, CreatStrokeDTO) {}

// @Resolver(() => Corner)
// export class CornerResolver extends BaseResolver<
//     Corner, CornerService, CreatStrokeDTO, CreatStrokeDTO
// >(Corner, CornerService, CreatStrokeDTO, CreatStrokeDTO) {}
