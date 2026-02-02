/**
 * 太玄经三进制数字类型
 * 1 = 一 (阳)
 * 2 = 二 (中)
 * 3 = 三 (阴)
 */
export type TaiXuanDigit = 1 | 2 | 3;

/**
 * 太玄卦象 - 由4个三进制数字组成
 * 从下到上: [初, 二, 三, 四]
 */
export type TaiXuanGua = [TaiXuanDigit, TaiXuanDigit, TaiXuanDigit, TaiXuanDigit];

/**
 * 爻辞 - 9个爻位
 */
export interface YaoInfo {
  初一: string;
  次二: string;
  次三: string;
  次四: string;
  次五: string;
  次六: string;
  次七: string;
  次八: string;
  上九: string;
}

/**
 * 卦象信息
 */
export interface GuaInfo {
  /** 序号 1-81 */
  index: number;
  /** 卦名 */
  name: string;
  /** 四进制编码 */
  code: TaiXuanGua;
  /** 赞辞 */
  zan?: string;
  /** 爻辞 */
  yao?: YaoInfo;
}

/**
 * 起卦结果
 */
export interface DivinationResult {
  /** 卦象信息 */
  gua: GuaInfo;
  /** 时间戳 */
  timestamp: number;
}
