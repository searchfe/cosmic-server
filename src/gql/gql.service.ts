import { AuthenticationError } from 'apollo-server-core';
import { Cache } from 'cache-manager';
import { join } from 'path';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import type { GqlModuleOptions, } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import type { Context } from 'graphql-ws';


@Injectable()
export class GQLConfigService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    createGqlOptions(): GqlModuleOptions {
        return {
            subscriptions: {
                // connect 和 subscribe 都去redis校验下token，不存在就关闭链接 401
                // gql guard 就无视协议了，只从req.headers里取token
                'graphql-ws': {
                    onConnect: async (context: Context<{authorization: string, req: any}>) => {
                        const { connectionParams, extra } = context;
                        const { Authorization: token } = connectionParams;
                        // 尽量减少未授权链接
                        if (!token) {
                            return false;
                        }
                        // connect 直接传token string，不要传 http Authentication string
                        const user = await this.cacheManager.get<{ token: string }>(`user-${token}`);
                        if (!user) {
                            return false;
                        }
                        //@ts-ignore
                        const headers = extra.request?.headers;
                        headers.authorization = token;
                    },
                    onSubscribe: async (ctx, msg) => {
                        //@ts-ignore
                        const { Authorization: token } = msg.payload?.context?.fetchOptions?.headers || {};
                        if (!token) {
                            throw new AuthenticationError('UNAUTHENTICATED');
                        }
                        // token 的合法性和过期交给jwt，此处不在缓存校验一次token是否合法
                    },
                },
            },
            context: ctx => {
                if (!ctx.req && ctx.extra) {
                    ctx.req = ctx.extra.request
                }
                return ctx;
            },
            autoSchemaFile: `${__dirname}/schema.gql`,
            path: '/api/graphql',
            definitions: {
                path: join(process.cwd(), 'dist/graphql.d.ts'),
            },
            plugins: [],
        };
    }
}
