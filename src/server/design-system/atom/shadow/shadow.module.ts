import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VectorScalar } from '../common/scalar/vector.scalar';
import { ShadowResolver } from './shadow.resolver';
import { Shadow, ShadowSchema } from './shadow.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Shadow.name, schema: ShadowSchema }
        ]),
    ],
    providers: [ShadowResolver, VectorScalar]
})
export class ShadowModule { }
