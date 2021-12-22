// import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@server/auth/auth.module';
import { ProjectionModule } from '@server/project/project.module';
import { SpecificationModule } from '@server/specification/specification.module';
import { AppController } from './app.controller';
import { ConfigModule } from './config.module';
import { config, ConfigService } from './config.service';
import { DesignSystemModule } from './server/design-system/design-system.module';
import { GQLModule } from './server/gql/gql.module';
import { TeamModule } from './server/team/team.module';
import { UserModule } from './server/user/user.module';

@Module({
    imports: [
        CacheModule.register({
            // store: redisStore,
            // host: 'localhost',
            // port: 6379,
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
        ),
        GQLModule,
        UserModule,
        ConfigModule,
        AuthModule,
        TeamModule,
        SpecificationModule,
        ProjectionModule,
        DesignSystemModule,
    ],
    controllers: [AppController],
})
export class AppModule {
    constructor(private config: ConfigService) {}
}
