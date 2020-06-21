import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private userService: UserService,
        @Inject(JwtService)
        private jwtService: JwtService
    ) {}

    // async validateUser(username: string, password: string): Promise<any> {
    //     // const user = await this.userService.findOne(username);
    //     // // TODO: validate password
    //     // console.log(password)
    //     return user;
    // }

    async login(user: { username: string, userId: string }) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
