import { Storage } from "./Storage";

export class LocalStorage<T> implements Storage<T> {
    public setItem(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
