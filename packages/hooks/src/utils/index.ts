export const  isObject = (value: unknown) : value is Record<any, any> => value !== null && typeof value === 'object' 

export const isFuction = (value: unknown) : value is (...args: any) => any => typeof value === 'function';

export const isString = (value: unknown) : value is string => typeof value === 'string'

export const isNumber = (value: unknown) : value is Number => typeof value === 'number' 
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';


export const isDev = process.env.NODE_ENV === 'development'