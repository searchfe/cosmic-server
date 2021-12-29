import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ColorSchema } from './schema/color.schema';
import { Text, TextSchema } from './schema/text.schema';
import { Constraint, ConstaintSchema } from './schema/constraint.schema';
import { Shadow, ShadowSchema } from './schema/shadow.schema';
import { Stroke, StrokeSchema } from './schema/stroke.schema';
import {
    ColorResolver,
    TextResolver,
    StrokeResolver,
    ConstraintResolver,
    ShadowResolver
} from './resolver/index';
import {
    ColorService,
    TextService,
    StrokeService,
    ConstaintService,
    ShadowService
} from './service/index';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Color.name, schema: ColorSchema },
            { name: Text.name, schema: TextSchema },
            { name: Constraint.name, schema: ConstaintSchema },
            { name: Shadow.name, schema: ShadowSchema },
            { name: Stroke.name, schema: StrokeSchema },
        ]),
    ],
    providers: [
        ColorService,
        TextService,
        StrokeService,
        ConstaintService,
        ShadowService,
        ColorResolver,
        TextResolver,
        StrokeResolver,
        ConstraintResolver,
        ShadowResolver,
    ]
})
export class AtomModule {}
