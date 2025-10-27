import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import useToggle from '../index'

// act 用来处理异步操作
// 所有的异步操作都要放到act函数中执行
// 所有状态更新被刷新
// 组件重新渲染完成

const callToggle = (hook: any) => {
    act(() => {
        hook.result.current[1].toggle()
    })
}

describe('useToggle', () => {
    it('test on init', () => {
        const hook = renderHook(() => useToggle());
        expect(hook.result.current[0]).toBeFalsy()
    })


    it('test on methods', async () => {
        const hook = renderHook(() => useToggle('hello'));
        expect(hook.result.current[0]).toBe('hello')
        callToggle(hook)
        expect(hook.result.current[0]).toBeFalsy()
        act(() => {
            hook.result.current[1].setLeft()
        })
        expect(hook.result.current[0]).toBe('hello')
        act(() => {
            hook.result.current[1].setRight()
        })
        expect(hook.result.current[0]).toBeFalsy()
    })

    it("test on optional", () => {
        const hook = renderHook(() => useToggle("hello", "wrold"));
        callToggle(hook)
        expect(hook.result.current[0]).toBe("wrold")
        act(() => {
            hook.result.current[1].set("wrold")
        })
        callToggle(hook)
        expect(hook.result.current[0]).toBe("hello")

    })
})