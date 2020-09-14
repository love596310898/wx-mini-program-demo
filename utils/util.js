import BigNumber from 'bignumber.js';
/**
 * 格式化模块
 * @description 各种格式化工具函数, 如时间格式化, 价格格式化等等
 */

/**
 * 格式化数字, 保留精度
 * @param {number} originNumber     数字
 * @param {number} precision        数字精度
 */
const formatNumber = (originNumber = 0, precision = 2) => {
  if (Number.isNaN(Number(originNumber))) {
    throw new Error('数字格式错误');
  }

  const number = new BigNumber(Number(originNumber));
  let numberString = number.toFixed();

  // 保留两位小数
  const splitNumberString = numberString.split('.');
  // 如果没有小数位, 则直接补齐精度位数的0
  if (splitNumberString.length === 1) {
    numberString = `${numberString}${precision === 0 ? '' : '.'}${'0'.repeat(precision)}`;
  }
  // 如果有小数位, 则补齐缺少的精度位数
  else {
    const integer = splitNumberString[0];
    let decimal = splitNumberString[1];
    if (decimal.length > precision) {
      decimal = decimal.slice(0, precision);
    }
    else {
      decimal = `${decimal}${'0'.repeat(precision - decimal.length)}`;
    }
    numberString = `${integer}${precision === 0 ? '' : '.'}${decimal}`;
  }
  return numberString;
};

export {
  formatNumber,
};