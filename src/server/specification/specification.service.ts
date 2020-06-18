import { Injectable } from '@nestjs/common';
import { Specification } from './domain/specification.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

type PartialSpecification = Partial<Specification>;
@Injectable()
export class SpecificationService {
    constructor(@InjectRepository(Specification)
    private readonly specificationRepository: Repository<Specification>) {}

    async create(specification: PartialSpecification): Promise<InsertResult> {
        return await this.specificationRepository.insert(specification);
    }

    async modify(id: PartialSpecification): Promise<UpdateResult>
    async modify(id: string, specificationInput: PartialSpecification): Promise<UpdateResult>
    async modify(id: PartialSpecification | string, specificationInput?: PartialSpecification): Promise<UpdateResult> {
        specificationInput = specificationInput || id as PartialSpecification;
        const specification = await this.specificationRepository.findOne(specificationInput.id || id as string);
        return await this.specificationRepository.update(specification, specification);
    }

    async findOne(id: string): Promise<Specification> {
        return await this.specificationRepository.findOne(id);
    }
}
