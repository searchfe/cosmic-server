import { Module } from '@nestjs/common';
import { DesignSystemResolver } from './design-system.resolver';
import { DesignSystemService } from './design-system.service';
import { AtomModule } from './atom/atom.module';

@Module({
    imports: [
        AtomModule,
    ],
    providers: [DesignSystemResolver, DesignSystemService]
})
export class DesignSystemModule { }
