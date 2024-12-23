import type { JsonObject, StorageOptions } from "./types";
import StorageManager from "./StorageManager";
declare class LocalStorage {
    private options;
    private static STORAGE;
    constructor(options?: StorageOptions);
    static defaultStorage<T extends JsonObject>(initData?: T): StorageManager<T>;
    createStorage(data?: JsonObject): void;
    getStorage<T extends JsonObject>(): StorageManager<T>;
    deleteStorage(): void;
    hasStorage(): boolean;
}
export default LocalStorage;
