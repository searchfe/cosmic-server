import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { LocalAuthGuard } from '@server/auth/guard/local-auth.guard';

@Controller()
export class AppController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        const result = await this.authService.login(req.user);
        if (result && result.accessToken) {
            this.cacheManager.set(`user-Bearer ${result.accessToken}`, req.user);
        }
        return result;
    }

    @UseGuards(LocalAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return 'test';
    }
}
