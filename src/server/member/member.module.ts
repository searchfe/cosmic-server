import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './domain/member.domain';
import { MemberResolver } from './member.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberResolver]
})
export class MemberModule {}
