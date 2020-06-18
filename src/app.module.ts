import { AuthModule } from './server/auth/auth.module';
import { AppController } from './app.controller';
import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GraphQLModule, GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { UserModule } from './server/user/user.module';
import { TeamModule } from './server/team/team.module';
import { WebModule } from './server/web/web.module';
import { config, ConfigService } from './config.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: config.DB_TYPE,
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            entities: [
                `${__dirname}/**/**.domain.**`,
                `${__dirname}/**/**.entity.**`,
            ],
            synchronize: true,
        }),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: `${__dirname}/schema.gql`,
            path: '/api/graphql',
            context: ({ req }) => ({ req }),
        }),
        UserModule,
        TeamModule,
        WebModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})

export class AppModule {
    constructor(private config: ConfigService, private connectin: Connection) {}
}