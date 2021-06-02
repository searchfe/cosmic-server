// import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectionModule } from '@server/project/project.module';
import { SpecificationModule } from '@server/specification/specification.module';
import { config, ConfigService } from './config.service';
import { TeamModule } from './server/team/team.module';
import { UserModule } from './server/user/user.module';
import { WebModule } from './server/web/web.module';
import { join } from 'path';
import { DesignSystemModule } from './server/design-system/design-system.module';

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
        }),
        UserModule,
        TeamModule,
        WebModule,
        SpecificationModule,
        ProjectionModule,
        DesignSystemModule,
    ],
    // controllers: [AppController],
    providers: [],
})
export class AppModule {
    constructor(private config: ConfigService) {}
}
