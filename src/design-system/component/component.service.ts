import type { CreateComponentDTO, QueryComponentDTO } from './schema/component.dto';
import { Injectable } from '@nestjs/common';
import { Component } from './schema/component.schema';
import { BaseDataService } from '../../common/module/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isSuccessfulQuery } from '@/common/util/db';


@Injectable()
export class ComponentService extends BaseDataService({ schema: Component }) {

    @InjectModel(Component.name)
    private readonly projectModel: Model<Component>;

    async deleteByTeamAndName(fields: QueryComponentDTO) {
        return this.projectModel.deleteOne(fields);
    }

    async updateByTeamAndName(data: CreateComponentDTO): Promise<boolean> {
        const { name, team, ...update } = data;

        if (!name || !team) {
            return false;
        }

        const result = await this.projectModel
            .updateOne({ team, name }, update)
            .exec();
        return isSuccessfulQuery(result);
    }
}
