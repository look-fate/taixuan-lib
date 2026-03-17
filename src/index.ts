// Types
export type {
  TaiXuanDigit,
  TaiXuanGua,
  GuaInfo,
  DivinationResult,
} from './types';

// Core functions
export {
  generate,
  generateByShi,
  generateByDice,
  generateByCoins,
  generateByNumber,
} from './core/generate';
export {
  lookupByCode,
  lookupByIndex,
  codeToIndex,
  indexToCode,
} from './core/lookup';
export {
  generateMultiple,
  getAllGua,
  searchByName,
  formatResult,
} from './core/utils';

// Constants
export { GUA_DATA } from './constants/gua';
