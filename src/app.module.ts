import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule, GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { MemberModule } from './server/member/member.module';
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
        `${__dirname}/**/**.entity.**`
      ],
      synchronize: true
    }),
    GraphQLModule.forRoot(
      {
        typePaths: [`${__dirname}/**/*.graphql`],
        installSubscriptionHandlers: true,
        autoSchemaFile: `${__dirname}/schema.gql`,
        path: '/api/graphql',
      }),
    MemberModule,
    WebModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private config: ConfigService) {
  }
}