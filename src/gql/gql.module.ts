import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlAuthGuard } from '@/auth/guard/gql-auth.guard';
import { GQLConfigService } from './gql.service';


@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useClass: GQLConfigService,
        }),
    ],
    providers: [
        GQLConfigService,
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard
        }
    ],
})
export class GQLModule {}
