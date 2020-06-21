import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './domain/team.domain';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) {}

    async findOne(teamId: string) {
        return await this.teamRepository.findOne(teamId);
    }

    async create(team: Partial<Team>) {
        return await this.teamRepository.save(team);
    }

    async update(team: Partial<Team>) {
        return await this.teamRepository.save(team);
    }

    // async findAll(userId: string) {
    //     return await this.permissionService.findAllTeam(userId);
    // }

    // async findAllMember(teamId: string) {
    //     return await this.permissionService.findAllMember(teamId);
    // }
}
