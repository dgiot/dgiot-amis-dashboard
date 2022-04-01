const B = 8.0;
const KB = B * 1024;
const MB = KB * 1024;
const GB = MB * 1024;
const TB = GB * 1024;
const BytesArray = [
  { value: TB, unit: 'TB' },
  { value: GB, unit: 'GB' },
  { value: MB, unit: 'MB' },
  { value: KB, unit: 'KB' },
  { value: B, unit: 'B' },
];
/**
 * 比特大小转易读的数据大小格式，如：2.3MB
 * @param num 数据比特大小bit(8bit=1b)
 */
const bytesFormat = num => {
  const prefix = num >= 0 ? '' : '-';
  num = num >= 0 ? num : num * -1;
  if (!num) return '-';
  if (num === 0) return '0B';
  for (let i = 0; i < BytesArray.length; i++) {
    const { value, unit } = BytesArray[i];
    const result = num / value;
    if (result >= 1.0) {
      return `${prefix}${result.toFixed(2)} ${unit}`;
    }
  }
  return '-';
};

const hasValue = value => value !== null && value !== undefined;

exports.bytesFormat = bytesFormat;
exports.hasValue = hasValue;
