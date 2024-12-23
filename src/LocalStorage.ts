import { writeFileSync, existsSync, unlinkSync } from "fs"
import { join } from "path"

import type { JsonObject, StorageOptions } from "./types"
import StorageManager from "./StorageManager"

class LocalStorage {

    private static STORAGE = 'localStorage.json'

    constructor(private options: StorageOptions = { path: '/' }) {
        this.options.path = join(__dirname, `${options.path}/${LocalStorage.STORAGE}`)
    }

    static defaultStorage<T extends JsonObject>(initData?: T) {

        const storage = new LocalStorage()

        if (!storage.hasStorage()) {
            storage.createStorage(initData)
        }

        return storage.getStorage<T>()
    }

    createStorage(data?: JsonObject) {
        if (this.hasStorage()) {
            throw Error('Store already exist')
        }
        writeFileSync(this.options.path!, JSON.stringify(data || {}))
    }

    getStorage<T extends JsonObject>() {
        if (!this.hasStorage()) {
            throw Error('Store not exist')
        }
        return new StorageManager<T>(this.options.path!)
    }

    deleteStorage() {
        if (!this.hasStorage()) {
            throw Error('Store not exist')
        }
        return unlinkSync(this.options.path!)
    }

    hasStorage() {
        return existsSync(this.options.path!)
    }
}

export default LocalStorage