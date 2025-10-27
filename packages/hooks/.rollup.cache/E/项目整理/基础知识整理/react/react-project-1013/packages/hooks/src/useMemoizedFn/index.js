import { useMemo, useRef } from "react";
import { isFuction, isDev } from "../utils/index";
export function useMemoizedFn(fn) {
    if (isDev) {
        if (!isFuction(fn)) {
            console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
        }
    }
    // useRef 返回的对象在组件整个生命周期内不会变，即 fnRef 和 memoizedFn 的引用始终不变。
    const fnRef = useRef(fn);
    // 用 useMemo 包裹，确保只有当 fn 变化时才更新 fnRef.current，
    // 这样可以避免闭包陷阱和不必要的赋值。 但 fnRef.current 的值可以随时改变。
    fnRef.current = useMemo(() => fn, [fn]);
    const memoizedFn = useRef();
    // memoizedFn 只在首次渲染时赋值，之后始终保持同一个函数引用。
    if (!memoizedFn.current) {
        memoizedFn.current = function (...args) {
            // 这个函数内部调用的是 fnRef.current，即始终是最新的逻辑。
            // 每次组件渲染时，fnRef.current 都会被更新为最新的 fn（因为 fnRef.current = useMemo(() => fn, [fn])）。
            // 所以，无论外部 fn 如何变化，壳函数始终调用的是 fnRef.current，也就是最新的 fn。
            return fnRef.current.apply(this, args);
        };
    }
    return memoizedFn.current;
}
export default useMemoizedFn;
//# sourceMappingURL=index.js.map