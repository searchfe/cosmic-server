import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RESOLVER_TYPE_METADATA } from '@nestjs/graphql/dist/graphql.constants';
import { Reflector } from '@nestjs/core';
import { AuthenticationError } from 'apollo-server-core';
import { IS_PUBLIC_KEY } from '@/common/decorator/public';


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const resolvers = this.reflector.getAll(RESOLVER_TYPE_METADATA, [
            context.getClass(),
        ]);
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!(resolvers.length && resolvers[0]) || isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        return ctx.req;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new AuthenticationError('UNAUTHENTICATED');
        }
        return user;
    }
}
