import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import type { User } from '../user/schema/user.schema';



@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private userService: UserService,
        @Inject(JwtService)
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ username, password });

        return user;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                ...user,
                id: user._id,
            }
        };
    }
}
