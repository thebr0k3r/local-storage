export declare type StorageOptions = {
    path?: string;
};
export declare type TransformFn<T> = (args: {
    data: T;
}) => void;
export declare type JsonObject = Record<string, any>;
