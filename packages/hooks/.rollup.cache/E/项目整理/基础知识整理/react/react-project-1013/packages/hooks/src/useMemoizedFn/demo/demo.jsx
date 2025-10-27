/**
 * title: 基础用法
 * desc: useMemoizedFn 与 useCallback 可以实现同样的效果。
 */
import React, { useState, useCallback } from 'react';
import { useMemoizedFn } from '../index';
export default () => {
    const [count, setCount] = useState(0);
    const callbackFn = useCallback(() => {
        console.log(`Current count is ${count}`);
    }, [count]);
    const memoizedFn = useMemoizedFn(() => {
        console.log(`Current count is ${count}`);
    });
    return (<>
      <p>count: {count}</p>
      <button type="button" onClick={() => {
            setCount((c) => c + 1);
        }}>
        Add Count
      </button>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={callbackFn}>
          call callbackFn
        </button>
        <button type="button" onClick={memoizedFn} style={{ marginLeft: 8 }}>
          call memoizedFn
        </button>
      </div>
    </>);
};
//# sourceMappingURL=demo.jsx.map