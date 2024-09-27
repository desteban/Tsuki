export interface Storage<T> {
    setItem(key: string, value: T): void;
    getItem(key: string): T | null;
    removeItem(key: string): void;
}