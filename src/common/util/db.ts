import type { MongoProjection } from '../types';


export function fileds2MongoProjection<T>(
    includes: Array<keyof T>,
    excludes: Array<keyof T> = [],
) {
    const result: Partial<MongoProjection<T>> = {};
    includes.forEach((field) => {
        result[field] = 1;
    });
    excludes.forEach((field) => {
        if (result[field] === undefined) {
            result[field] = 0;
        }
    });
    return result;
}

export function isSuccessfulQuery(result: Record<string, unknown> | any) {
    return result && result.ok && result.n;
}
