import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Team } from './domain/team.domain';
import { User } from '../user/domain/user.domain';
import { PermissionService } from './permission.service';

type PartialTeam = Partial<Team>;

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @Inject(PermissionService)
        private readonly permissionService: PermissionService,
        private readonly connection: Connection
    ){}

    async create(team: PartialTeam, user: User): Promise<PartialTeam> {
        const newTeam = this.teamRepository.create(team);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(newTeam);
            await queryRunner.manager.save(this.permissionService.createOwner(newTeam, user));
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return Promise.resolve({ id: newTeam.id });
    }

    async addMember(team: Team, user: User): Promise<string> {
        return await this.permissionService.addMember(team, user);
    }

    async update(newTeam: Partial<Team>): Promise<PartialTeam> {
        return await this.teamRepository.save(newTeam);
    }

    async findOne(teamId: string): Promise<Team> {
        return await this.teamRepository.findOne(teamId);
    }

    async findAll(userId: string) {
        return await this.permissionService.findAllTeam(userId);
    }

    async findAllMember(teamId: string) {
        return await this.permissionService.findAllMember(teamId);
    }
}
