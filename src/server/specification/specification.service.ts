import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { Specification, Category, SpecificationItem } from './domain/specification.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

export type QueryFields = (keyof Specification)[];

@Injectable()
export class SpecificationService {
    constructor(
        @InjectRepository(Specification)
        private readonly specificationRepository: MongoRepository<Specification>
    ) {}

    async findOne(id: string, fields: (keyof Specification)[]) {
        const findOptions = fields && fields.length > 0 ? { select: fields } : undefined;
        return await this.specificationRepository.findOne(id, findOptions);
    }

    async findCategory(
        specificationId: string,
        criteria: { [key in keyof Category]?: unknown },
        fields?: Partial<(keyof Category)[]>
    ): Promise<Array<{ [key in keyof Category]?: unknown }>> {
        // TODO 字段筛选应该使用查询语句在数据库中完成
        const spec = await this.specificationRepository.findOne(specificationId, {
            select: ['id', 'categories'],
        });
        if (!spec) {
            return [];
        }
        const result = [];
        const toValidKey = Object.keys(criteria);
        spec.categories.forEach(cate => {
            let matched = true;
            let resultItem = {};
            for (let i = 0; i < toValidKey.length; i++) {
                const key = toValidKey[i];
                if (cate[key] instanceof ObjectID) {
                    // TODO: fix 修改入参
                    cate[key] = cate[key].toString();
                }
                if (cate[key] !== criteria[key]) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                if (fields) {
                    fields.forEach(key => {
                        resultItem[key] = cate[key]
                    });
                } else {
                    resultItem = cate;
                }
                result.push(resultItem);
            }
        });
        return result;
    }

    async findItems(specificationId: string, categoryId: string, names: Array<string>) {
        const category = await this.findCategory(
            specificationId,
            { id: categoryId },
            ['items']
        );
        if (!category.length) {
            return []
        }
        const items = category[0].items as Array<{ name: string }>;
        if (!names || names.length === 0) {
            return items;
        }
        const nameSet = new Set(names);
        return items.filter(i => i.name in nameSet);
    }

    async create(specification: Partial<Specification>) {
        return await this.specificationRepository.save(specification);
    }

    async addCategory(specificationId: string, category: Partial<Category>) {
        // TODO 效率太差，需要优化
        const spec = await this.specificationRepository.findOne(specificationId);
        const newSpec = {
            categories: [...spec.categories, {
                ...category,
                id: new ObjectID(),
            }],
        }
        await this.specificationRepository.update(specificationId, newSpec);
        return category;
    }

    async saveItem(specificationId: string, categoryId: string, item: SpecificationItem) {
        const spec = await this.specificationRepository.findOne(specificationId, {
            select: ['id', 'categories'],
        });
        const cate = spec.categories.filter(c => {
            return c.id && c.id instanceof ObjectID && c.id.toHexString() === categoryId;
        })[0];
        if (cate.items.length === 0) {
            cate.items = [item];
        } else {
            let isOverWrite = false;
            const items = cate.items.map(i => {
                if (i.name === item.name) {
                    isOverWrite = true;
                    return item;
                }
                return i;
            });
            if (!isOverWrite) {
                items.push(item);
                cate.items = items;
            }
        }
        await this.specificationRepository.update(specificationId, spec);
        return item;
    }
}
