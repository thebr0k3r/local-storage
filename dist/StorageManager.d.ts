import type { JsonObject, TransformFn } from "./types";
declare class StorageManager<T extends JsonObject> {
    private path;
    private data;
    constructor(path: string);
    get size(): number;
    hasItem(key: keyof T): boolean;
    getItem<K extends keyof T>(key: K): NonNullable<T>[K] | undefined;
    setItem<K extends keyof T>(key: K, data: T[K]): void;
    deleteItem<K extends keyof T>(key: K): void;
    transform(fn: TransformFn<T>): void;
    toObject(): T;
    private write;
}
export default StorageManager;
