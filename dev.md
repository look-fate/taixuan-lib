这是一个标准的 **TypeScript + pnpm + tsup** 现代库开发结构

```markdown
# TaiXuan-Lib 项目结构指南

### 1. 目录树 (Directory Structure)
```text
taixuan-lib/
├── src/                # 源代码目录
│   ├── index.ts        # 导出入口
│   ├── core/           # 核心逻辑 (起卦算法、三进制转换)
│   ├── constants/      # 静态数据 (81首名称、赞辞、符号映射)
│   └── types/          # TypeScript 类型定义 (TaiXuanGua, TaiXuanDigit)
├── tests/              # 单元测试 (建议使用 Vitest)
├── dist/               # 编译输出目录 (由 tsup 自动生成)
├── .gitignore          # 忽略 node_modules, dist
├── package.json        # 项目配置与脚本
├── pnpm-lock.yaml      # 依赖锁定
├── tsconfig.json       # TypeScript 配置文件
└── tsup.config.ts      # 库打包配置文件 (生成 CJS/ESM/DTS)

```

---

### 2. 关键配置文件 (Config Scaffolding)

#### **package.json** (库描述与导出配置)

```json
{
  "name": "taixuan-lib",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "tsup src/index.ts --watch",
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "lint": "eslint src",
    "test": "vitest"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "vitest": "^1.0.0"
  }
}

```

#### **tsup.config.ts** (快速打包配置)

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});

```

---

### 3. 开发与发布流程

**第一步：环境初始化**

```bash
pnpm init
pnpm add -D typescript tsup vitest
npx tsc --init

```

**第二步：核心模块拆解建议**

1. **Types**: 定义 `1 | 2 | 3` 为 `TaiXuanDigit`，定义 `[Digit, Digit, Digit, Digit]` 为 `Gua`。
2. **Constants**: 存储 81 首的映射表（JSON 或 Map）。
3. **Core**: 实现两个函数：`generate()` (起卦) 和 `lookup(code)` (查卦)。

**第三步：发布到 NPM**

```bash
# 1. 编译
pnpm run build

# 2. 登录 (首次需要)
npm login

# 3. 发布
# 如果包名以 @scope 开头，需加 --access public
npm publish

```
