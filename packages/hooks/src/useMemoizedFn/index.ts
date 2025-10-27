import { useMemo, useRef } from "react"
import { isFuction, isDev } from "../utils/index";

// 泛指任意函数类型
type noop = (this: any, ...args: any[]) => any

// PickFunction<T> 其实就是“重新声明一个和 T 完全一样签名的函数类型”，包括 this、参数、返回值。
type PickFunction<T extends noop> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>

export function useMemoizedFn<T extends noop>(fn: T) {
    if (isDev) {
        if (!isFuction(fn)) {
            console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`)
        }
    }

    // useRef 返回的对象在组件整个生命周期内不会变，即 fnRef 和 memoizedFn 的引用始终不变。
    const fnRef = useRef<T>(fn)

    // 用 useMemo 包裹，确保只有当 fn 变化时才更新 fnRef.current，
    // 这样可以避免闭包陷阱和不必要的赋值。 但 fnRef.current 的值可以随时改变。

    fnRef.current = useMemo(() => fn, [fn])

    const memoizedFn = useRef<PickFunction<T>>()
    // memoizedFn 只在首次渲染时赋值，之后始终保持同一个函数引用。

    if (!memoizedFn.current) {
        memoizedFn.current = function (this: any, ...args: any[]) {
            // 这个函数内部调用的是 fnRef.current，即始终是最新的逻辑。
            // 每次组件渲染时，fnRef.current 都会被更新为最新的 fn（因为 fnRef.current = useMemo(() => fn, [fn])）。
            // 所以，无论外部 fn 如何变化，壳函数始终调用的是 fnRef.current，也就是最新的 fn。

            return fnRef.current.apply(this, args)
        }
    }


    return memoizedFn.current as T
}

export default useMemoizedFn


/**
 *
 * 作用：返回一个“引用永远不变，但内部逻辑始终最新”的函数。
 * 典型场景：
 * 作为依赖传递给 useEffect、useCallback、事件监听等，避免因函数引用变化导致的重复注册或副作用。
 * 解决闭包陷阱，保证拿到的 always 是最新的逻辑。
 *
 * 总结：
 * 1. 返回一个“引用永远不变，但内部逻辑始终最新”的函数。
 * 2. 典型场景：作为依赖传递给 useEffect、useCallback、事件监听等，避免因函数引用变化导致的重复注册或副作用。
 * 3. 解决闭包陷阱，保证拿到的 always 是最新的逻辑。
 * const [count, setCount] = useState(0);
    const handleClick = useMemoizedFn(() => {
      alert(count);
    });
 * 每次 count 变化，组件会重新渲染，新的 () => { alert(count) } 作为 fn 传入 useMemoizedFn。
 * useMemoizedFn 内部会把 fnRef.current 更新为最新的 fn。
 * 但 handleClick 这个函数引用始终不变。
 * 当你点击按钮时，handleClick 实际调用的是 fnRef.current，也就是 alert 的是最新的 count。
 */