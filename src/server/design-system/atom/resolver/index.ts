import { Resolver } from '@nestjs/graphql';
import { Text } from '../schema/text.schema';
import { Constraint } from '../schema/constraint.schema';
import { Layout } from '../schema/layout.schema';
import { Shadow } from '../schema/shadow.schema';
import { Stroke } from '../schema/stroke.schema';
import { Color } from '../schema/color.schema';
import { Corner } from '../schema/corner.schema';
import { CreateColorDTO, QueryColorDTO } from '../dto/color.dto';
import { CreateTextDTO, QueryTextDTO } from '../dto/text.dto';
import { CreateConstraintDTO, QueryConstraintDTO } from '../dto/constraint.dto';
import { CreateShadowDTO, QueryShadowDTO } from '../dto/shadow.dto';
import { CreatStrokeDTO, QueryStrokeDTO } from '../dto/stroke.dto';
import { BaseResolver } from '../../common/module/base.resolver';
import {
    ColorService,
    ConstaintService,
    TextService,
    LayoutService,
    CornerService,
    ShadowService,
    StrokeService
} from '../service/index';


@Resolver(() => Color)
export class ColorResolver extends BaseResolver<
    Color, ColorService, QueryColorDTO, CreateColorDTO, CreateColorDTO
>(Color, ColorService, QueryColorDTO, CreateColorDTO, CreateColorDTO) {}

@Resolver(() => Text)
export class TextResolver extends BaseResolver<
    Text, TextService, QueryTextDTO, CreateTextDTO, CreateTextDTO
>(Text, TextService, QueryTextDTO, CreateTextDTO, CreateTextDTO) {}

@Resolver(() => Constraint)
export class ConstraintResolver extends BaseResolver<
    Constraint, ConstaintService, QueryConstraintDTO, CreateConstraintDTO, CreateConstraintDTO
>(Constraint, ConstaintService, QueryConstraintDTO, CreateConstraintDTO, CreateConstraintDTO) {}

// @Resolver(() => Layout)
// export class LayoutResolver extends BaseResolver<
//     Layout, LayoutService, CreateTextDTO, CreateTextDTO
// >(Layout, LayoutService, CreateTextDTO, CreateTextDTO) {}

@Resolver(() => Shadow)
export class ShadowResolver extends BaseResolver<
    Shadow, ShadowService, QueryShadowDTO, CreateShadowDTO, CreateShadowDTO
>(Shadow, ShadowService, QueryShadowDTO, CreateShadowDTO, CreateShadowDTO) {}

@Resolver(() => Stroke)
export class StrokeResolver extends BaseResolver<
    Stroke, StrokeService, QueryStrokeDTO, CreatStrokeDTO, CreatStrokeDTO
>(Stroke, StrokeService, QueryStrokeDTO, CreatStrokeDTO, CreatStrokeDTO) {}

// @Resolver(() => Corner)
// export class CornerResolver extends BaseResolver<
//     Corner, CornerService, CreatStrokeDTO, CreatStrokeDTO
// >(Corner, CornerService, CreatStrokeDTO, CreatStrokeDTO) {}
