import { JwtStrategy } from './stragety/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stragety/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config/config.service';


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: config.JWT_SIGN_EXPIRES },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
