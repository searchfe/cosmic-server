import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextResolver } from './text.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from './text.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Text.name, schema: TextSchema }
        ]),
    ],
    providers: [TextService, TextResolver]
})
export class TextModule { }
