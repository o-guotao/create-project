export const isObject = (value) => value !== null && typeof value === 'object';
export const isFuction = (value) => typeof value === 'function';
export const isString = (value) => typeof value === 'string';
export const isNumber = (value) => typeof value === 'number';
export const isBoolean = (value) => typeof value === 'boolean';
export const isUndef = (value) => typeof value === 'undefined';
export const isDev = process.env.NODE_ENV === 'development';
//# sourceMappingURL=index.js.map