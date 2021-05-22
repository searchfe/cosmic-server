import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { Level, LevelSchema } from './schema/level.schema';
import { Team, TeamSchema } from '@server/team/schema/team.schema';
import { Specification, SpecificationSchema } from './schema/specification.schema';
import { TeamService } from '@server/team/team.service';
import { Module } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationResolver } from './specification.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Team.name, schema: TeamSchema },
            { name: Specification.name, schema: SpecificationSchema },
            { name: Level.name, schema: LevelSchema },
        ]),
    ],
  providers: [SpecificationService, SpecificationResolver, TeamService, LevelResolver, LevelService]
})
export class SpecificationModule {}
