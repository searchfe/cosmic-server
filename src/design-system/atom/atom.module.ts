import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './schema/color.schema';
import { Font, FontSchema } from './schema/font.schema';
import { Shadow, ShadowSchema } from './schema/shadow.schema';
import { Border, BorderSchema } from './schema/border.schema';
import { Corner, CornerSchema } from './schema/corner.schema';
import { Opacity, OpacitySchema } from './schema/opacity.schema';
import { TeamService } from '@/team/team.service';
import { Team, TeamSchema } from '@/team/schema/team.schema';

import {
    ColorResolver,
    FontResolver,
    ShadowResolver,
    BorderResolver,
    CornerResolver,
    OpacityResolver,
} from './resolver/index';
import {
    ColorService,
    FontService,
    ShadowService,
    BorderService,
    CornerService,
    OpacityService,
} from './service/index';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Color.name, schema: ColorSchema },
            { name: Font.name, schema: FontSchema },
            { name: Shadow.name, schema: ShadowSchema },
            { name: Border.name, schema: BorderSchema },
            { name: Corner.name, schema: CornerSchema },
            { name: Opacity.name, schema: OpacitySchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
    providers: [
        ColorService,
        ColorResolver,
        FontService,
        FontResolver,
        ShadowService,
        ShadowResolver,
        BorderService,
        BorderResolver,
        CornerService,
        CornerResolver,
        OpacityService,
        OpacityResolver,
        TeamService,
    ],
})
export class AtomModule {}
