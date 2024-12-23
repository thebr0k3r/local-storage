"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class StorageManager {
    path;
    data;
    constructor(path) {
        this.path = path;
        const file = (0, fs_1.readFileSync)(path, 'utf-8');
        this.data = JSON.parse(file);
    }
    get size() {
        return Object.keys(this.data).length;
    }
    hasItem(key) {
        return (key in this.data);
    }
    getItem(key) {
        if (!this.hasItem(key))
            return undefined;
        return this?.data?.[key];
    }
    setItem(key, data) {
        this.data[key] = data;
        this.write();
    }
    deleteItem(key) {
        delete this.data[key];
        this.write();
    }
    transform(fn) {
        fn.call(undefined, { data: this.data });
        this.write();
    }
    toObject() {
        return { ...this.data };
    }
    write() {
        (0, fs_1.writeFileSync)(this.path, JSON.stringify(this.data));
    }
}
exports.default = StorageManager;
