import { Module } from '@nestjs/common';
import { DraftModule } from './draft/draft.module';


@Module({
    imports: [DraftModule],
})
export class WorkbenchModule {}
