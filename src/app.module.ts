import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectionModule } from '@server/project/project.module';
import { SpecificationModule } from '@server/specification/specification.module';
import { config, ConfigService } from './config.service';
import { TeamModule } from './server/team/team.module';
import { UserModule } from './server/user/user.module';
import { join } from 'path';
import { DesignSystemModule } from './server/design-system/design-system.module';
import { AppController } from './app.controller';
import { AuthModule } from '@server/auth/auth.module';
import { ConfigModule } from './config.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from '@server/auth/guard/gql-auth.guard';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
        ),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: `${__dirname}/schema.gql`,
            path: '/api/graphql',
            context: ({ req }) => ({ req }),
            definitions: {
                path: join(process.cwd(), 'dist/graphql.d.ts'),
            },
            plugins: []
        }),
        UserModule,
        ConfigModule,
        AuthModule,
        TeamModule,
        SpecificationModule,
        ProjectionModule,
        DesignSystemModule,
    ],
    controllers: [AppController],
    providers: [{
        provide: APP_GUARD,
        useClass: GqlAuthGuard
    }],
})
export class AppModule {
    constructor(private config: ConfigService) {}
}
