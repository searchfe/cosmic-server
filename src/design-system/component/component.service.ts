import { Injectable } from '@nestjs/common';
import { Component } from './schema/component.schema';
import { BaseDataService } from '../common/module/base.service';


@Injectable()
export class ComponentService extends BaseDataService(Component) { }
