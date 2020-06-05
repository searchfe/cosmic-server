import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Member } from './domain/member.domain';
import { MemberInput } from './domain/member.input';
import { MemberService } from './member.service';

@Resolver(of => Member)
export class MemberResolver {
    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Query(returns => Member, { name: 'member' })
    async getMember(@Args({ name: 'id', type: () => String }) id: string) {
        return await this.memberService.findOne(id);
    }

    @Mutation(returns => Member)
    async addMember(@Args('member') memberInput: MemberInput) {
      return this.memberService.save(this.memberService.generateFromInput(memberInput));
    }

    @Mutation(returns => Member)
    async modifyMember(@Args('member') memberInput: MemberInput) {
      return this.memberService.modify(memberInput);
    }

}
