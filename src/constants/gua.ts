import type { TaiXuanGua, GuaInfo } from '../types';
import taixuanData from './taixuan-data.json';

/**
 * 将四位编码转换为 TaiXuanGua 类型
 */
function parseCode(code: number): TaiXuanGua {
  const str = code.toString().padStart(4, '1');
  const digits = [
    parseInt(str[0]),
    parseInt(str[1]),
    parseInt(str[2]),
    parseInt(str[3]),
  ];

  if (digits.some(d => d < 1 || d > 3 || isNaN(d))) {
    throw new Error(`无效的卦象编码: ${code}`);
  }

  return digits as TaiXuanGua;
}

/**
 * 计算索引 (1-81)
 */
function codeToIdx(code: number): number {
  const [d1, d2, d3, d4] = parseCode(code);
  return (d1 - 1) * 27 + (d2 - 1) * 9 + (d3 - 1) * 3 + (d4 - 1) + 1;
}

type JsonData = Record<string, { name: string; zan: string; yao: Record<string, string> }>;

/**
 * 太玄经 81 首卦象数据（含赞辞和爻辞）
 */
export const GUA_DATA: GuaInfo[] = Object.entries(taixuanData as JsonData)
  .map(([codeStr, data]) => {
    const code = parseInt(codeStr);
    return {
      index: codeToIdx(code),
      name: data.name,
      code: parseCode(code),
      zan: data.zan,
      yao: data.yao as unknown as GuaInfo['yao'],
    };
  })
  .sort((a, b) => a.index - b.index);

/**
 * 卦象索引 Map，用于 O(1) 查询
 */
export const GUA_MAP = new Map(GUA_DATA.map(g => [g.index, g]));
