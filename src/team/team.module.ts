import { User, UserSchema } from '@/user/schema/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '@/user/user.service';
import { Team, TeamSchema } from './schema/team.schema';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Team.name, schema: TeamSchema },
            { name: User.name, schema: UserSchema }
        ]),
    ],
    providers: [TeamService, UserService, TeamResolver],
})
export class TeamModule {}
