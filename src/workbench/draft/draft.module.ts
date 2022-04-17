import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Draft, DraftSchema } from './schema/draft.schema';

import { DraftResolver } from './draft.resolver';
import { DraftService } from './draft.service';

import { Team, TeamSchema } from '@/team/schema/team.schema';
import { TeamService } from '@/team/team.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Draft.name, schema: DraftSchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
    providers: [
        DraftService,
        DraftResolver,
        TeamService
    ],
})
export class DraftModule {}
