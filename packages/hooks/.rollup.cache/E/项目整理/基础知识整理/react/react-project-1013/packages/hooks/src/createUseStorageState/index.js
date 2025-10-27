import { useState } from "react";
import { isFuction, isUndef } from "../utils/index";
import useUpdateEffect from "../useUpdateEffect/index";
import useMemoizedFn from "../useMemoizedFn/index";
export function createUseStorageState(getStorage) {
    function useStorageState(key, options) {
        let storage;
        const { defaultValue, onError = (e) => console.error(e), } = options || {};
        try {
            storage = getStorage();
        }
        catch (error) {
            onError(error);
        }
        const serializer = (value) => {
            if (options === null || options === void 0 ? void 0 : options.serializer) {
                return options.serializer(value);
            }
            else {
                return JSON.stringify(value);
            }
        };
        const deserializer = (value) => {
            if (options === null || options === void 0 ? void 0 : options.deserializer) {
                return options.deserializer(value);
            }
            else {
                return JSON.parse(value);
            }
        };
        function getStorageValue() {
            try {
                const raw = storage === null || storage === void 0 ? void 0 : storage.getItem(key);
                if (raw) {
                    return deserializer(raw);
                }
            }
            catch (error) {
                onError(error);
            }
            if (isFuction(defaultValue)) {
                return defaultValue();
            }
            return defaultValue;
        }
        const [state, setState] = useState(getStorageValue);
        useUpdateEffect(() => {
            setState(getStorageValue());
        }, [key]);
        const updateState = (value) => {
            const currentState = isFuction(value) ? value(state) : value;
            setState(currentState);
            if (isUndef(currentState)) {
                storage === null || storage === void 0 ? void 0 : storage.removeItem(key);
            }
            else {
                try {
                    storage === null || storage === void 0 ? void 0 : storage.setItem(key, serializer(currentState));
                }
                catch (error) {
                    console.log(error);
                }
            }
        };
        return [state, useMemoizedFn(updateState)];
    }
    return useStorageState;
}
//# sourceMappingURL=index.js.map