/**
 * title: 基础用法
 * desc: useMemoizedFn 与 useCallback 可以实现同样的效果。
 */
import React, { useState, useCallback, useRef } from 'react';
import { useMemoizedFn } from '../index';

export default () => {
    const [count, setCount] = useState(0);

    const callbackFn = useCallback(() => {
        console.log(`Current count is ${count}`);
    }, [count]);

    const memoizedFn = useMemoizedFn(() => {
        console.log(`Current count is ${count}`);
    });

    return (
        <>
            <p>count: {count}</p>
            <button
                type="button"
                onClick={() => {
                    setCount((c) => c + 1);
                }}
            >
                Add Count
            </button>
            <div>
                <h3>component in useCallback</h3>
                <ExpensizeTree showCount={callbackFn}></ExpensizeTree>
            </div>
            <div>
                <h3>component in useMemoizedFn</h3>
                <ExpensizeTree showCount={memoizedFn}></ExpensizeTree>
            </div>

        </>
    );
};

const ExpensizeTree = React.memo<{ [ket: string]: any }>(({ showCount }) => {
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    return (
        <div>
            <p>renderCount: {renderCountRef.current}</p>
            <button onClick={showCount}>showCount</button>
        </div>
    )
})
