import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from '../../../config.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.JWT_SECRET,
        });
    }

    async validate(payload: { sub: string, username: string }) {
        // TODO: validate userid in redis 。
        return { id: payload.sub, username: payload.username };
    }
}
