import { Injectable } from '@nestjs/common';
import { Component } from './schema/component.schema';
import { QueryComponentDTO } from './schema/component.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ComponentService {
    constructor(
        @InjectModel(Component.name)
        private readonly componentModel: Model<Component>
    ){}

    async findOne(component: Partial<QueryComponentDTO>) {
        return await this.componentModel.findOne(component).exec();
    }

    async findAll() {
        return this.componentModel.find();
    }
}
