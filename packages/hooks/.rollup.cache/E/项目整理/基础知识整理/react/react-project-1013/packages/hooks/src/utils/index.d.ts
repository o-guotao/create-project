export declare const isObject: (value: unknown) => value is Record<any, any>;
export declare const isFuction: (value: unknown) => value is (...args: any) => any;
export declare const isString: (value: unknown) => value is string;
export declare const isNumber: (value: unknown) => value is Number;
export declare const isBoolean: (value: unknown) => value is boolean;
export declare const isUndef: (value: unknown) => value is undefined;
export declare const isDev: boolean;
