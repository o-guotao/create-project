---
nav:
  path: /hooks
---

# useMemoizedFn
持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，
会重新生成函数，导致函数地址变化

```js
const [state, setState] = useState('');

// 在state变化时，会重新生成函数,func地址变化
const func = useCallback(() => {}, [state]);
```
使用useMemoizedFn.函数，可以忽略第二个参数deps，函数地址不会变化

```js
const [state, setState] = useState('');
//func地址不会变化
const func = useMemoizedFn(() => {});
```
## 代码演示

### 基础用法
<code hideActions='["CSB"]' src="./demo/demo.tsx" />

### 性能提升
<code hideActions='["CSB"]' src="./demo/demo2.tsx" />

## API
```typescript
const fn = useMemoizedFn<T>(fn:T):T;
```

### Result
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| fn | 持久化的函数 | `(...args: any[]) => any)` |

### Params
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 持久化的函数 | `(...args: any[]) => any)` | - |
