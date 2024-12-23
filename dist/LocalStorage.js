"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const StorageManager_1 = __importDefault(require("./StorageManager"));
class LocalStorage {
    options;
    static STORAGE = 'localStorage.json';
    constructor(options = {}) {
        this.options = options;
        this.options.path = options?.path || `${(0, path_1.join)(__dirname).split('node_modules')?.at(0)}${LocalStorage.STORAGE}`;
    }
    static defaultStorage(initData) {
        const storage = new LocalStorage();
        if (!storage.hasStorage()) {
            storage.createStorage(initData);
        }
        return storage.getStorage();
    }
    createStorage(data) {
        if (this.hasStorage()) {
            throw Error('Store already exist');
        }
        (0, fs_1.writeFileSync)(this.options.path, JSON.stringify(data || {}));
    }
    getStorage() {
        if (!this.hasStorage()) {
            throw Error('Store not exist');
        }
        return new StorageManager_1.default(this.options.path);
    }
    deleteStorage() {
        if (!this.hasStorage()) {
            throw Error('Store not exist');
        }
        return (0, fs_1.unlinkSync)(this.options.path);
    }
    hasStorage() {
        return (0, fs_1.existsSync)(this.options.path);
    }
}
exports.default = LocalStorage;
