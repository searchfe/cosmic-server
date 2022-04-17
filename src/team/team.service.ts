import { Injectable } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import type { PermissionEnum } from './schema/team.dto';
import type { MongoProjection } from '@/common/types';


@Injectable()
export class TeamService {
    constructor(
        @InjectModel(Team.name)
        private readonly teamModel: Model<Team>,
    ) {}

    async findOne(teamId: string, fields?: MongoProjection<Team>) {
        if (!fields) {
            return await this.teamModel.findById(teamId).exec();
        }
        return await this.teamModel
            .findById(teamId)
            .select(fields)
            .lean()
            .exec();
    }

    async create(team: Pick<Team, 'name' | 'members'>) {
        return await this.teamModel.create(team);
    }

    async findAll(query = {}) {
        return await this.teamModel.find(query).lean(false).exec();
    }

    async update(team: Pick<Team, 'name' | 'id'>) {
        const updateTeam = { ...team };
        delete updateTeam.id;
        return await this.teamModel
            .findByIdAndUpdate(team.id, updateTeam, { new: true })
            .exec();
    }

    async createMember(
        teamId: string,
        member: { user: string; permission: PermissionEnum },
    ): Promise<boolean> {
        const result = await this.teamModel
            .findByIdAndUpdate(teamId, {
                $addToSet: {
                    members: {
                        user: Types.ObjectId(member.user),
                        permission: member.permission,
                    },
                },
            })
            .select({ id: 0 })
            .exec();
        if (result) {
            return true;
        }
        return false;
    }
}
