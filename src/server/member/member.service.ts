import { Injectable } from '@nestjs/common';
import { Member } from './domain/member.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberInput } from './domain/member.input';

@Injectable()
export class MemberService {
    constructor(@InjectRepository(Member)
    private readonly userRepository: Repository<Member>) {}

    async save(user: Member): Promise<Member> {
        return await this.userRepository.save(user);
    }

    async modify(id: MemberInput): Promise<Member>
    async modify(id: string, userInput: MemberInput): Promise<Member>
    async modify(id: MemberInput | string, userInput?: MemberInput): Promise<Member> {
        userInput = userInput || id as MemberInput;
        let user = await this.userRepository.findOne(userInput.id || id as string);
        user = this.generateFromInput(userInput, user);
        return this.save(user);
    }

    generateFromInput(userInput: MemberInput, user: Member = new Member()): Member {
        user.name = userInput.name || user.name;
        user.loc = userInput.loc || user.loc;
        user.avatar = userInput.avatar || user.avatar;
        user.blank = userInput.blank || user.blank;
        user.intro = userInput.intro || user.intro;
        return user;
    }

    async findOne(id: string): Promise<Member> {
        return await this.userRepository.findOne(id);
    }
}
