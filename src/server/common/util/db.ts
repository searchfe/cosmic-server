import { MongoProjection } from '../types';

export function fileds2MongoQuery(includes: Array<string>, excludes: Array<string> = []) {
    const result: MongoProjection = {};
    includes.forEach(field => {
        result[field] = 1;
    });
    excludes.forEach(field => {
        if (result[field] === undefined) {
            result[field] = 0;
        }
    });
    return result;
}

export function isSuccessfulQuery(result: Record<string, unknown>) {
    return result && result.ok && result.n;
}
