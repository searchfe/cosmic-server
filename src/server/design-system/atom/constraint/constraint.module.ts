import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstraintResolver } from './constraint.resolver';
import { ConstaintSchema, Constraint } from './constraint.schema';
import { ConstraintService } from './constraint.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Constraint.name, schema: ConstaintSchema
        }]),
    ],
    providers: [ConstraintResolver, ConstraintService]
})
export class ConstraintModule { }
