import { SpecificationModule } from '@server/specification/specification.module';
// import { AuthModule } from './server/auth/auth.module';
// import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { config, ConfigService } from './config.service';
import { TeamModule } from './server/team/team.module';
import { UserModule } from './server/user/user.module';
import { WebModule } from './server/web/web.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: `${__dirname}/schema.gql`,
            path: '/api/graphql',
            context: ({ req }) => ({ req }),
        }),
        UserModule,
        TeamModule,
        WebModule,
        SpecificationModule,
        // AuthModule,
    ],
    // controllers: [AppController],
    providers: [],
})

export class AppModule {
    constructor(private config: ConfigService) {}
}
