import type { QueryComponentDTO } from './schema/component.dto';
import { Injectable } from '@nestjs/common';
import { Component } from './schema/component.schema';
import { BaseDataService } from '../../common/module/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ComponentService extends BaseDataService(Component) {

    @InjectModel(Component.name)
    private readonly projectModel: Model<Component>;

    async deleteByTeamAndName(fields: QueryComponentDTO) {
        return this.projectModel.deleteOne(fields);
    }
}
