import { Module } from '@nestjs/common';
import { LayoutResolver } from './layout.resolver';

@Module({
    providers: [LayoutResolver]
})
export class LayoutModule {}
