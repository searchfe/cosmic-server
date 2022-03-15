import { Module } from '@nestjs/common';
import { DesignSystemResolver } from './design-system.resolver';
import { DesignSystemService } from './design-system.service';
import { AtomModule } from './atom/atom.module';
import { ComponentModule } from './component/component.module';

@Module({
    imports: [
        AtomModule,
        ComponentModule,
    ],
    providers: [DesignSystemResolver, DesignSystemService]
})
export class DesignSystemModule { }
