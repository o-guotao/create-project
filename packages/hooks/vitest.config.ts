import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, //使用全局变量
        environment: 'jsdom', //模拟浏览器环境
        setupFiles: ['./tests/setup.ts'],
        coverage: {
             provider: 'istanbul', // or 'v8' 覆盖率分析工具
             reporter: ['text', 'json', 'html'], //测试覆盖率报告器
             include: ['src/**/*.ts'],//测试覆盖率范围
        },
  },
})