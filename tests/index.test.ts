import { describe, it, expect } from 'vitest';
import {
  generate,
  generateByShi,
  generateByDice,
  generateByCoins,
  generateByNumber,
  lookupByIndex,
  lookupByCode,
  generateMultiple,
  searchByName,
  formatResult,
} from '../src';

describe('起卦方法', () => {
  it('随机起卦', () => {
    const result = generate();
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
    expect(result.timestamp).toBeGreaterThan(0);
  });

  it('蓍草模拟法', () => {
    const result = generateByShi();
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('骰子简易法', () => {
    const result = generateByDice();
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('双硬币法', () => {
    const result = generateByCoins();
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('报数法', () => {
    const result = generateByNumber(1234);
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });
});

describe('边界测试', () => {
  it('数字法应该是确定性的', () => {
    const r1 = generateByNumber(1234);
    const r2 = generateByNumber(1234);
    expect(r1.gua.index).toBe(r2.gua.index);
    expect(r1.gua.code).toEqual(r2.gua.code);
  });

  it('应该处理负数', () => {
    const result = generateByNumber(-1234);
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('应该处理小数', () => {
    const result = generateByNumber(12.34);
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('lookupByIndex 应该拒绝无效索引', () => {
    expect(() => lookupByIndex(0)).toThrow('索引必须在 1-81 之间');
    expect(() => lookupByIndex(82)).toThrow('索引必须在 1-81 之间');
    expect(() => lookupByIndex(-1)).toThrow('索引必须在 1-81 之间');
  });

  it('lookupByCode 应该正确查询', () => {
    const gua = lookupByCode([1, 1, 1, 1]);
    expect(gua.index).toBe(1);
    expect(gua.code).toEqual([1, 1, 1, 1]);
  });
});

describe('实用功能测试', () => {
  it('批量起卦', () => {
    const results = generateMultiple(5);
    expect(results).toHaveLength(5);
    results.forEach(r => {
      expect(r.gua.index).toBeGreaterThanOrEqual(1);
      expect(r.gua.index).toBeLessThanOrEqual(81);
    });
  });

  it('按名称搜索', () => {
    const results = searchByName('中');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(g => {
      expect(g.name).toContain('中');
    });
  });

  it('格式化结果', () => {
    const result = generate();
    const formatted = formatResult(result);
    expect(formatted).toContain(result.gua.name);
    expect(formatted).toContain(`第 ${result.gua.index} 首`);
    expect(formatted).toContain('编码：');
  });
});

describe('概率分布测试', () => {
  it('骰子法应该均匀分布', () => {
    const counts = [0, 0, 0];
    for (let i = 0; i < 3000; i++) {
      const code = generateByDice().gua.code;
      code.forEach(d => counts[d - 1]++);
    }
    counts.forEach(c => {
      expect(c).toBeGreaterThan(3500);
      expect(c).toBeLessThan(4500);
    });
  });
});
