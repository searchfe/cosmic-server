import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Draft, DraftSchema } from './schema/draft.schema';

import { DraftResolver } from './draft.resolver';
import { DraftService } from './draft.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Draft.name, schema: DraftSchema },
        ]),
    ],
    providers: [
        DraftService,
        DraftResolver,
    ],
})
export class DraftModule {}
