import type { TaiXuanDigit, TaiXuanGua, DivinationResult } from '../types';
import { lookupByCode } from './lookup';

/**
 * 生成单个三进制数字 (1, 2, 3)
 */
function randomDigit(): TaiXuanDigit {
  return (Math.floor(Math.random() * 3) + 1) as TaiXuanDigit;
}

/**
 * 生成随机卦象编码
 */
function generateCode(): TaiXuanGua {
  return [randomDigit(), randomDigit(), randomDigit(), randomDigit()];
}

/**
 * 起卦 - 生成随机卦象
 * @returns 占卜结果，包含卦象信息和时间戳
 */
export function generate(): DivinationResult {
  const code = generateCode();
  const gua = lookupByCode(code);
  return {
    gua,
    timestamp: Date.now(),
  };
}

/**
 * 蓍草模拟法 - 模拟传统蓍草起卦
 * 每次分蓍得到余数，映射为三进制数字
 */
export function generateByShi(): DivinationResult {
  const shiDigit = (): TaiXuanDigit => {
    // 模拟49根蓍草分堆取余
    const total = 49;
    const left = Math.floor(Math.random() * (total - 1)) + 1;
    const remainder = left % 4;
    // 余数 0,1 -> 1; 2 -> 2; 3 -> 3
    if (remainder <= 1) return 1;
    if (remainder === 2) return 2;
    return 3;
  };
  const code: TaiXuanGua = [shiDigit(), shiDigit(), shiDigit(), shiDigit()];
  return { gua: lookupByCode(code), timestamp: Date.now() };
}

/**
 * 骰子简易法 - 掷骰子起卦
 * 点数 1,2 -> 1; 3,4 -> 2; 5,6 -> 3
 */
export function generateByDice(): DivinationResult {
  const diceDigit = (): TaiXuanDigit => {
    const dice = Math.floor(Math.random() * 6) + 1;
    if (dice <= 2) return 1;
    if (dice <= 4) return 2;
    return 3;
  };
  const code: TaiXuanGua = [diceDigit(), diceDigit(), diceDigit(), diceDigit()];
  return { gua: lookupByCode(code), timestamp: Date.now() };
}

/**
 * 双硬币法 - 抛两枚硬币起卦
 * 两正 -> 1; 一正一反 -> 2; 两反 -> 3
 */
export function generateByCoins(): DivinationResult {
  const coinDigit = (): TaiXuanDigit => {
    const c1 = Math.random() < 0.5;
    const c2 = Math.random() < 0.5;
    if (c1 && c2) return 1;
    if (!c1 && !c2) return 3;
    return 2;
  };
  const code: TaiXuanGua = [coinDigit(), coinDigit(), coinDigit(), coinDigit()];
  return { gua: lookupByCode(code), timestamp: Date.now() };
}

/**
 * 报数/数字法 - 用户输入数字起卦
 * @param num 任意正整数
 */
export function generateByNumber(num: number): DivinationResult {
  const n = Math.abs(Math.floor(num));
  const d1 = ((Math.floor(n / 1000) % 3) + 1) as TaiXuanDigit;
  const d2 = ((Math.floor(n / 100) % 3) + 1) as TaiXuanDigit;
  const d3 = ((Math.floor(n / 10) % 3) + 1) as TaiXuanDigit;
  const d4 = ((n % 3) + 1) as TaiXuanDigit;
  const code: TaiXuanGua = [d1, d2, d3, d4];
  return { gua: lookupByCode(code), timestamp: Date.now() };
}
