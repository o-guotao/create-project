import { useRef } from "react";
export const createUpdateEffect = (hook) => (effect, deps) => {
    // 首次不执行，依赖更新时执行effect的hook
    const isMounted = useRef(false);
    hook(() => {
        //组件卸载时 isMounted 置为false，防止内存泄漏
        return () => {
            isMounted.current = false;
        };
    });
    hook(() => {
        if (isMounted.current) {
            return effect();
        }
        isMounted.current = true;
    }, deps);
};
export default createUpdateEffect;
/*
 * 总结
 * createUpdateEffect 生成的 Hook 只会在依赖变化时执行 effect，首次挂载时不会执行。
 * 适合用在只关心“更新”而不关心“首次渲染”的副作用场景。
 * 通过传入 useEffect 或 useLayoutEffect，可以灵活控制副作用的执行时机。
 */ 
//# sourceMappingURL=index.js.map