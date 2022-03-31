import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prefab, PrefabSchema } from './schema/prefab.schema';
import { PrefabResolver } from './prefab.resolver';
import { PrefabService } from './prefab.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Prefab.name, schema: PrefabSchema },
        ]),
    ],
    providers: [
        PrefabService,
        PrefabResolver,
    ],
})
export class PrefabModule {}
