type noop = (this: any, ...args: any[]) => any;
export declare function useMemoizedFn<T extends noop>(fn: T): T;
export default useMemoizedFn;
