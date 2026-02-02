import type { TaiXuanGua, GuaInfo } from '../types';
import { GUA_DATA } from '../constants/gua';

/**
 * 将三进制编码转换为索引 (1-81)
 * @param code 四位三进制编码 [1-3, 1-3, 1-3, 1-3]
 * @returns 索引 1-81
 */
export function codeToIndex(code: TaiXuanGua): number {
  const [d1, d2, d3, d4] = code;
  // 转换为 0-based 后计算: (d1-1)*27 + (d2-1)*9 + (d3-1)*3 + (d4-1) + 1
  return (d1 - 1) * 27 + (d2 - 1) * 9 + (d3 - 1) * 3 + (d4 - 1) + 1;
}

/**
 * 将索引转换为三进制编码
 * @param index 索引 1-81
 * @returns 四位三进制编码
 */
export function indexToCode(index: number): TaiXuanGua {
  if (index < 1 || index > 81) {
    throw new Error(`索引必须在 1-81 之间，收到: ${index}`);
  }
  const n = index - 1;
  const d1 = Math.floor(n / 27) + 1;
  const d2 = Math.floor((n % 27) / 9) + 1;
  const d3 = Math.floor((n % 9) / 3) + 1;
  const d4 = (n % 3) + 1;
  return [d1, d2, d3, d4] as TaiXuanGua;
}

/**
 * 根据编码查找卦象信息
 * @param code 四位三进制编码
 * @returns 卦象信息
 */
export function lookupByCode(code: TaiXuanGua): GuaInfo {
  const index = codeToIndex(code);
  return lookupByIndex(index);
}

/**
 * 根据索引查找卦象信息
 * @param index 索引 1-81
 * @returns 卦象信息
 */
export function lookupByIndex(index: number): GuaInfo {
  const gua = GUA_DATA.find((g) => g.index === index);
  if (!gua) {
    throw new Error(`未找到索引为 ${index} 的卦象`);
  }
  return gua;
}
