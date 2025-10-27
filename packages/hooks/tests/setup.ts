import {afterEach} from 'vitest'
import {cleanup} from '@testing-library/react'

// 全局配置
afterEach (() => {
    // 每个测试用例后清理测试
    cleanup()
})