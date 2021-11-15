import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@server/auth/guard/local-auth.guard';
import { AuthService } from "@server/auth/auth.service";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return 'test';
    }
}
