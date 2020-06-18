import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { TeamPermisson as Permission, TeamPermissionEnum } from './domain/permission.domain';
import { Team } from './domain/team.domain';
import { User } from '../user/domain/user.domain';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permisionRepository: Repository<Permission>,
        private readonly connection: Connection
    ){}

    /**
     * @description 创建新team时增加owner权限
     * @param {Team} team
     * @param {User} user
     * @returns {Promise<string>}
     * @memberof PermissionService
     */
    async createOwner(team: Team, user: User): Promise<Permission> {
        const permission = new Permission();
        permission.team = team;
        permission.user = user;
        permission.permission = TeamPermissionEnum.SUPER;
        return permission;
    }

    /**
     * @description 添加团队成员
     * @param {Team} team
     * @param {User} user
     * @returns {Promise<string>}
     * @memberof PermissionService
     */
    async addMember(team: Team, user: User): Promise<string> {
        const permission = new Permission();
        permission.team = team;
        permission.user = user;
        permission.permission = TeamPermissionEnum.NORMAL;
        await this.permisionRepository.insert(permission);
        return team.id;
    }

    async removeMember(team: Team, user: User) {
        // TODO: casecade or not?
        return await this.permisionRepository.delete({ team, user });
    }

    /**
     * @description 转移owner权限
     * @param {Team} team
     * @param {User} oldOwner
     * @param {User} newOwner
     * @returns {Promise<boolean>}
     * @memberof PermissionService
     */
    async transfer(team: Team, oldOwner: User, newOwner: User): Promise<boolean> {
        let result = false;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(
                Permission,
                { team, user: oldOwner },
                { permission: TeamPermissionEnum.NORMAL }
            );
            const newPermission = new Permission();
            newPermission.team = team;
            newPermission.user = newOwner;
            newPermission.permission = TeamPermissionEnum.SUPER;
            await queryRunner.manager.save(newPermission);
            await queryRunner.commitTransaction();
            result = true;
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return Promise.resolve(result);
    }

    async findAllTeam(userId: string) {
        return;
    }

    async findAllMember(teamId: string) {
        return;
    }
}
