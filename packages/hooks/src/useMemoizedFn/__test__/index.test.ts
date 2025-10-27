import { renderHook } from "@testing-library/react";

import { describe, it, expect } from "vitest";

import useMemoizedFn from "../index";
import { act, useState } from "react";



describe('useMemoizedFn', () => { 
    const useTestHook = () => {
        const [count, setCount] = useState(0);
        const memoizedFn = useMemoizedFn(() => count);

        return { memoizedFn, increment: () => setCount(count + 1) };
    };
    it('should return memoized function', () => {
        const { result } = renderHook(() => useTestHook());
        expect(result.current.memoizedFn()).toBe(0);

        act(() => {
            result.current.increment();
        })
          expect(result.current.memoizedFn()).toBe(1);

    })
});
