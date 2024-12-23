import type { JsonObject, TransformFn } from "./types"
import { readFileSync, writeFileSync } from "fs"

class StorageManager<T extends JsonObject> {

    private data: T

    constructor(private path: string) {
        const file = readFileSync(path, 'utf-8')
        this.data = JSON.parse(file)
    }

    get size() {
        return Object.keys(this.data).length
    }

    hasItem(key: keyof T) {
        return (key in this.data)
    }

    getItem<K extends keyof T>(key: K) {
        if (!this.hasItem(key)) return undefined
        return this?.data?.[key]
    }

    setItem<K extends keyof T>(key: K, data: T[K]) {
        this.data[key] = data
        this.write()
    }

    deleteItem<K extends keyof T>(key: K) {
        delete this.data[key]
        this.write()
    }

    transform(fn: TransformFn<T>) {
        fn.call(undefined, { data: this.data })
        this.write()
    }

    toObject() {
        return { ...this.data }
    }

    private write() {
        writeFileSync(this.path, JSON.stringify(this.data))
    }

}

export default StorageManager