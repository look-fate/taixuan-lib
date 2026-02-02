# TaiXuan-Lib 太玄经占卜库

一个基于 TypeScript 的太玄经（扬雄）占卜库，提供多种起卦方法和完整的 81 首卦象数据。

## 安装

```bash
npm install taixuan-lib
# 或
pnpm add taixuan-lib
```

## 特性

- 5 种起卦方法（随机、蓍草、骰子、硬币、报数）
- 完整 81 首卦象数据（含赞辞、爻辞）
- TypeScript 类型支持
- 同时支持 ESM 和 CommonJS

## 快速开始

```typescript
import { generate, lookupByIndex } from 'taixuan-lib';

// 随机起卦
const result = generate();
console.log(result.gua.name);  // 卦名
console.log(result.gua.zan);   // 赞辞
console.log(result.gua.yao);   // 爻辞
```

## 起卦方法

| 方法 | 函数 | 说明 |
|------|------|------|
| 随机 | `generate()` | 纯随机生成 |
| 蓍草 | `generateByShi()` | 模拟传统蓍草分堆 |
| 骰子 | `generateByDice()` | 1-2→一, 3-4→二, 5-6→三 |
| 硬币 | `generateByCoins()` | 两正→一, 一正一反→二, 两反→三 |
| 报数 | `generateByNumber(n)` | 根据输入数字起卦 |

## API

### 查询函数

```typescript
import { lookupByIndex, lookupByCode } from 'taixuan-lib';

// 按索引查询 (1-81)
const gua = lookupByIndex(1);

// 按编码查询
const gua2 = lookupByCode([1, 1, 1, 1]);
```

### 数据结构

```typescript
interface GuaInfo {
  index: number;        // 序号 1-81
  name: string;         // 卦名
  code: TaiXuanGua;     // 编码 [1-3, 1-3, 1-3, 1-3]
  zan?: string;         // 赞辞
  yao?: YaoInfo;        // 爻辞 (初一 ~ 上九)
}
```

## 许可证

MIT
