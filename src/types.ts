export type StorageOptions = {
    path?: string
}

export type TransformFn<T> = (args: { data: T }) => void

export type JsonObject = Record<string, any>