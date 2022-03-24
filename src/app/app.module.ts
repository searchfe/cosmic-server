// import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/auth.module';
import { ProjectionModule } from '@/project/project.module';
import { SpecificationModule } from '@/specification/specification.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@/config/config.module';
import { config, ConfigService } from '@/config/config.service';
import { DesignSystemModule } from '@/design-system/design-system.module';
import { GQLModule } from '@/gql/gql.module';
import { TeamModule } from '@/team/team.module';
import { UserModule } from '@/user/user.module';


@Module({
    imports: [
        CacheModule.register({
            // store: redisStore,
            // host: 'localhost',
            // port: 6379,
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            config.DB_URI ?? `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
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
