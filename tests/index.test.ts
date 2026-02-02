import { describe, it, expect } from 'vitest';
import {
  generate,
  generateByShi,
  generateByDice,
  generateByCoins,
  generateByNumber,
} from '../src';

describe('起卦方法', () => {
  it('随机起卦', () => {
    const result = generate();
    expect(result.gua.index).toBeGreaterThanOrEqual(1);
    expect(result.gua.index).toBeLessThanOrEqual(81);
  });

  it('蓍草模拟法', () => {
    const result = generateByShi();
    console.log(result)
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
