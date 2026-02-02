import type { TaiXuanGua, GuaInfo } from '../types';
import taixuanData from './taixuan-data.json';

/**
 * 将四位编码转换为 TaiXuanGua 类型
 */
function parseCode(code: number): TaiXuanGua {
  const str = code.toString();
  return [
    parseInt(str[0]) as 1 | 2 | 3,
    parseInt(str[1]) as 1 | 2 | 3,
    parseInt(str[2]) as 1 | 2 | 3,
    parseInt(str[3]) as 1 | 2 | 3,
  ];
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
