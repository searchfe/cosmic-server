import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentResolver } from './component.resolver';
import { Component, ComponentSchema } from './schema/component.schema';
import { ComponentService } from './component.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Component.name, schema: ComponentSchema }]),
    ],
    controllers: [],
    providers: [ComponentService, ComponentResolver],
    exports: [ComponentService],
})
export class ComponentModule { }
