export type MongoProjection<T> = Partial<Record<keyof T, 1 | 0>>;
