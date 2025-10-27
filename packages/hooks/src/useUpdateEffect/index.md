---
nav:
  path: /hooks
---
# useUpdateEffect
`useUpdateEffect` 用法等同于 `useEffect`，但是会忽略首次执行，只在依赖更新时执行。

### 代码演示

### 基础用法
<code hideActions='["CSB"]' src="./demo/demo.tsx" />
// hideActions='["CSB"]' 是一个属性，用于隐藏某些操作按钮。
// 会隐藏“在 CodeSandbox 打开”这个按钮，
// 用户无法直接通过按钮将该 demo 发送到 CodeSandbox 在线运行。


### API
API与`useEffect`完全一致

```typescript
useUpdateEffect(
    effect: React.EffectCallback,
    deps?: React.DependencyList
)
```