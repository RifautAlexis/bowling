export function deepCopy<T>(myObject: T): T {
    return JSON.parse(JSON.stringify(myObject));
}