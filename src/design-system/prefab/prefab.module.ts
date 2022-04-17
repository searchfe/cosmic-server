import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prefab, PrefabSchema } from './schema/prefab.schema';
import { PrefabResolver } from './prefab.resolver';
import { PrefabService } from './prefab.service';
import { Team, TeamSchema } from '@/team/schema/team.schema';
import { TeamService } from '@/team/team.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Prefab.name, schema: PrefabSchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
    providers: [
        PrefabService,
        PrefabResolver,
        TeamService
    ],
})
export class PrefabModule {}
