export type SetState<S> = S | ((prevState?: S) => S);
export interface Options<T> {
    defaultValue?: T | (() => T);
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    onError?: (error: Error) => void;
}
export declare function createUseStorageState(getStorage: () => Storage | undefined): <T>(key: string, options?: Options<T>) => readonly [T | undefined, (value?: SetState<T>) => void];
