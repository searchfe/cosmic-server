import { Module } from '@nestjs/common';
import { ColorResolver } from './color.resolver';
import { ColorService } from './color.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorSchema, Color } from './color.schema';
import { ColorScalar } from './color.scalar';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Color.name, schema: ColorSchema },
        ]),
    ],
    providers: [ColorResolver, ColorService, ColorScalar]
})

export class ColorModule { }
