import { __awaiter } from "tslib";
import { renderHook } from "@testing-library/react";
import useUpdateEffect from "../index";
import { describe, expect, it } from "vitest";
describe('useUpdateEffect', () => {
    it('test on mounted', () => __awaiter(void 0, void 0, void 0, function* () {
        let mountedState = 1;
        const hook = renderHook(() => useUpdateEffect(() => {
            mountedState = 2;
        }));
        expect(mountedState).toBe(1);
        hook.rerender();
        expect(mountedState).toBe(2);
    }));
    it('test on optional', () => {
        let mountedState = 1;
        const hook = renderHook(() => useUpdateEffect(() => {
            mountedState = 3;
        }, [mountedState]));
        expect(mountedState).toBe(1);
        hook.rerender();
        expect(mountedState).toBe(1);
        mountedState = 2;
        hook.rerender();
        expect(mountedState).toBe(3);
    });
});
//# sourceMappingURL=index.test.js.map