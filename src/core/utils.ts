import type { GuaInfo, DivinationResult } from '../types';
import { GUA_DATA } from '../constants/gua';
import { generate } from './generate';

/**
 * 批量起卦
 * @param count 起卦次数
 * @param method 起卦方法，默认为随机起卦
 */
export function generateMultiple(
  count: number,
  method: () => DivinationResult = generate
): DivinationResult[] {
  return Array.from({ length: count }, () => method());
}

/**
 * 获取所有卦象
 */
export function getAllGua(): GuaInfo[] {
  return [...GUA_DATA];
}

/**
 * 按名称搜索卦象
 * @param keyword 搜索关键词
 */
export function searchByName(keyword: string): GuaInfo[] {
  return GUA_DATA.filter(g => g.name.includes(keyword));
}

/**
 * 格式化占卜结果
 * @param result 占卜结果
 */
export function formatResult(result: DivinationResult): string {
  const { gua, timestamp } = result;
  const parts = [
    `【${gua.name}】第 ${gua.index} 首`,
    `编码：${gua.code.join('-')}`,
    `时间：${new Date(timestamp).toLocaleString('zh-CN')}`,
  ];

  if (gua.zan) {
    parts.push('', gua.zan);
  }

  return parts.join('\n');
}
