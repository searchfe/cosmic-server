import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentResolver } from './component.resolver';
import { Component, ComponentSchema } from './schema/component.schema';
import { ComponentService } from './component.service';
import { Team, TeamSchema } from '@/team/schema/team.schema';
import { TeamService } from '@/team/team.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Component.name, schema: ComponentSchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
    controllers: [],

    providers: [ComponentService, ComponentResolver, TeamService],
    exports: [ComponentService],
})
export class ComponentModule {}
