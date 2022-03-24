import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '@/team/schema/team.schema';
import { TeamService } from '@/team/team.service';
import { Project, ProjectSchema } from './schema/project.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
  providers: [TeamService, ProjectService, ProjectResolver]
})
export class ProjectionModule {}
