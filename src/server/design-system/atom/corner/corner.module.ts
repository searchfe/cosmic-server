import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CornerResolver } from './corner.resolver';
import { Corner, CornerSchema } from './corner.schema';
import { CornerService } from './corner.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Corner.name, schema: CornerSchema
        }]),
    ],
    providers: [CornerResolver, CornerService]
})
export class CornerModule { }
