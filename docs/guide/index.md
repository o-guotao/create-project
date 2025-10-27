# gt-hooks
## 能力支持
### 1. 可靠的代码
使用TS构建，提供类型定义文件

### 2. 完善的文档
提供完善的文档，包括API说明、代码示例等

### 3. 完善的测试
提供完善的测试用例，确保代码质量

## 设计目的
抽取业务中常用的hooks ，提升开发效率，减少重复造轮子的时间成本

## 技术选型
1. 项目管理：pnpm + workspace
2. 核心框架：React19 + TypeScript 5.x
  - 作用：Hooks开发与类型安全
3. 打包工具：Rollup + plugins
  - 作用：生产级打包
4. 测试工具：vitest + React Testing Library
  - 作用：单元测试+Hooks模拟测试
  - 完善的测试用例  确保代码质量
5. 工程化：Eslint + Prettier + Husky + Lint-staged
  - 作用：代码规范和钩子
6. 站点：dumi2
  - 作用：交互文档演示 
  - 为组件开发场景而生的文档工具
7. CI/CD: GitHub Actions
  - 作用：站点的自动化构建和部署