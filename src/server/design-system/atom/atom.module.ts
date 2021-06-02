import { Module } from '@nestjs/common';
import { ColorModule } from './color/color.module';
import { TextModule } from './text/text.module';
import { StrokeModule } from './stroke/stroke.module';
import { CornerModule } from './corner/corner.module';
import { ShadowModule } from './shadow/shadow.module';
import { ConstraintModule } from './constraint/constraint.module';
import { LayoutModule } from './layout/layout.module';

@Module({
    imports: [
        ColorModule,
        TextModule,
        StrokeModule,
        CornerModule,
        ShadowModule,
        ConstraintModule,
        LayoutModule
    ]
})
export class AtomModule {}
