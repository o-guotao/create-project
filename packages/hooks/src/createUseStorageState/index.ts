import { useState } from "react";
import { isFuction, isUndef } from "../utils/index";
import useUpdateEffect from "../useUpdateEffect/index";
import useMemoizedFn from "../useMemoizedFn/index";


export type SetState<S> = S | ((prevState?: S) => S);
export interface Options<T> {
    defaultValue?: T | (() => T);
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    onError?: (error: Error) => void;

}


export function createUseStorageState(getStorage: () => Storage | undefined) {

    function useStorageState<T>(key: string, options?: Options<T>) {
        let storage: Storage | undefined;
        const {
            defaultValue,
            onError = (e: Error) => console.error(e),
        } = options || {};
        try {
            storage = getStorage();
        } catch (error) {
            onError(error as Error)
        }

        const serializer = (value: T) => {
            if (options?.serializer) {
                return options.serializer(value)
            } else {
                return JSON.stringify(value)

            }
        }

        const deserializer = (value: string): T => {
            if (options?.deserializer) {
                return options.deserializer(value)
            } else {
                return JSON.parse(value)
            }
        }

        function getStorageValue() {
            try {
                const raw = storage?.getItem(key);
                if (raw) {
                    return deserializer(raw)
                }
            } catch (error) {
                onError(error as Error)
            }

            if (isFuction(defaultValue)) {
                return defaultValue()
            }
            return defaultValue
        }

        const [state, setState] = useState(getStorageValue);

        useUpdateEffect(() => {
            setState(getStorageValue())
        }, [key])

        const updateState = (value?: SetState<T>) => {
            const currentState = isFuction(value) ? value(state) : value;
            setState(currentState)

            if (isUndef(currentState)) {
                storage?.removeItem(key)
            } else {
                try {
                    storage?.setItem(key, serializer(currentState))
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return [state, useMemoizedFn(updateState)] as const;
    }

    return useStorageState;
}
