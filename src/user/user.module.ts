import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from '@/user/user.resolver';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
