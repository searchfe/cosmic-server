import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from '@server/user/user.resolver';
import { User } from './domain/user.domain';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
