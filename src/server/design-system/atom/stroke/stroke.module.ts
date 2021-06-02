import { Stroke, StrokeSchema } from './stroke.schema';
import { Module } from '@nestjs/common';
import { StrokeService } from './stroke.service';
import { StrokeResolver } from './stroke.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Stroke.name, schema: StrokeSchema }
        ]),
    ],
    providers: [StrokeService, StrokeResolver]
})
export class StrokeModule { }
