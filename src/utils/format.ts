import numeral from 'numeral';
import dayjs, { OpUnitType } from 'dayjs';
import 'dayjs/locale/zh-cn';

// ------------------------------------------------------------------------------------------------- 数字相关
// numeral -->  http://numeraljs.com/
// big.js  -->  https://github.com/MikeMcl/big.js#readme

/**
 * 字符串转数字
 * @param str 字符串
 */
const strToNumber = (str: string) => {
    return numeral(str).value();
};

/**
 * 金额格式化，如：123,456,789.12
 * @param val 金额数值
 */
const numberToMoney = (val: string) => {
    return numeral(val).format('0,00.00');
};

/**
 * 四舍五入取整数
 * @param val 原始数字
 */
const numberRound = (val: number) => {
    return strToNumber(numeral(val).format('0'));
};

/**
 * 格式化数字
 * @param num 原始数字
 * @param format 格式，如：0.000%、0,00.00
 */
const numberFormat = (num: number, format?: string) => {
    if (!format) {
        return `${num}`;
    } else {
        return numeral(num).format(format, Math.floor);
    }
};

// ------------------------------------------------------------------------------------------------- 时间相关
// https://dayjs.fenxianglu.cn/
dayjs.locale('zh-cn');

const dateFormatArray = [
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD',
    'YYYY/MM/DD HH:mm:ss',
    'YYYY/MM/DD HH:mm',
    'YYYY/MM/DD',
    'YYYYMMDD HH:mm:ss',
    'YYYYMMDD HH:mm',
    'YYYYMMDD',
    'YYYY.MM.DD HH:mm:ss',
    'YYYY.MM.DD HH:mm',
    'YYYY.MM.DD',
    'MM-DD-YYYY HH:mm:ss',
    'MM-DD-YYYY HH:mm',
    'MM-DD-YYYY',
    'MM/DD/YYYY HH:mm:ss',
    'MM/DD/YYYY HH:mm',
    'MM/DD/YYYY',
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DDTHH:mm:ss[Z]',
    'YYYY-MM-DDTHH:mm:ss', // 2017-12-14T16:34:10
    'YYYY-MM-DDTHH:mm:ss.SSS', // 2017-12-14T16:34:10.234
    'YYYY-MM-DDTHH:mm', // 2017-12-14T16:34
    'HH:mm:ss', // 16:34:10
    'HH:mm:ss.SSS', // 16:34:10.234
    'HH:mm', // 16:34
    'YYYY-MM', // 2017-12
    'YYYY-[W]WW', // 2017-W50
    'YYYY-[W]WW' // 2017-W50
];

/**
 * 转Dayjs对象
 */
const toDayjs = (obj: any): null | dayjs.Dayjs => {
    let res: null | dayjs.Dayjs = null;
    const typeStr = Object.prototype.toString.call(obj);
    switch (`${typeStr}`.toLowerCase()) {
        case '[object string]':
            res = dayjs(obj, dateFormatArray);
            break;
        case '[object number]':
            if (Number.isNaN(obj)) {
                return res;
            }
            // 解析传入的一个 Unix 时间戳 (毫秒) (13 位数字，从1970年1月1日 UTC 午夜开始所经过的毫秒数) dayjs(1318781876406)
            // 解析传入的一个 Unix 时间戳 (秒) (10 位数字，从1970年1月1日 Utc 午夜开始所经过的秒数) 创建一个 Day.js 对象 dayjs.unix(1318781876)
            res = dayjs(obj);
            break;
        case '[object array]':
            res = dayjs((obj as Array<any>).join('-'), dateFormatArray);
            break;
        case '[object date]':
            res = dayjs(obj);
            break;
    }
    return res;
};

/**
 * 时间格式化
 * @param val 时间
 * @param fmt 格式，如：YYYY-MM-DD HH:mm:ss
 */
const dateFormat = (val: any, fmt: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    const date = toDayjs(val);
    if (date) {
        return date.format(fmt);
    } else {
        return `${val}`;
    }
};

/**
 * 时间格式化
 * @param val 时间
 * @param fmt 格式，如：YYYY-MM-DD HH:mm:ss
 */
const dateToStr = (val: Date, fmt: string = 'YYYY-MM-DD HH:mm:ss') => {
    let str: string = dayjs(val).format(fmt);
    if (str === 'Invalid date') {
        str = '-';
    }
    return str;
};

/**
 * 字符串转Date对象
 * @param str 时间字符串
 */
const strToDate = (str: string) => {
    return dayjs(str, dateFormatArray).toDate();
};

/**
 * 获取明天的当前时间
 */
const tomorrow = () => {
    return dayjs().add(1, 'day');
};

/**
 * 获取昨天的当前时间
 */
const yesterday = () => {
    return dayjs().subtract(1, 'day');
};

/**
 * 时间减运算
 * @param howLong   时间长度
 * @param unit      时间单位
 * @param date      被运算的时间(默认当前时间)
 */
const dateSubtract = (howLong: number, unit: OpUnitType, date?: any): dayjs.Dayjs => {
    if (!date) date = new Date();
    return dayjs(date).subtract(howLong, unit);
};

/**
 * 时间加运算
 * @param howLong   时间长度
 * @param unit      时间单位
 * @param date      被运算的时间(默认当前时间)
 */
const dateAdd = (howLong: number, unit: OpUnitType, date?: any): dayjs.Dayjs => {
    if (!date) date = new Date();
    return dayjs(date).add(howLong, unit);
};

// ------------------------------------------------------------------------------------------------- 其他
/**
 * 把一个时间变成当前时间的距离时间，例如： N分钟前、N秒前、M年N分钟X秒前
 * @param agoDate       时间Date对象
 * @param level         需要显示的层级(默认1)
 * @param maxTimeStamp  转换的最大时间差距(默认7天)
 * @param timeUnit      时间单位数组，默认值 ["年", "个月", "天", "小时", "分钟", "秒"]
 */
const howLongAgo = (agoDate: Date, level?: number, maxTimeStamp?: number, timeUnit?: string[]): string => {
    if (level === null || level === undefined) level = 1;
    if (maxTimeStamp === null || maxTimeStamp === undefined) maxTimeStamp = 7 * 24 * 60 * 60 * 1000;
    if (timeUnit === null || timeUnit === undefined) timeUnit = ['年', '个月', '天', '小时', '分钟', '秒'];
    const byTime = [365 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
    let ct = new Date().getTime() - dayjs(agoDate).toDate().getTime();
    const suffix = ct > 0 ? '前' : '后';
    ct = ct < 0 ? -1 * ct : ct;
    if (ct > maxTimeStamp) {
        return dateToStr(agoDate);
    }
    const sb = [];
    for (let i = 0; i < byTime.length; i++) {
        if (ct < byTime[i]) {
            continue;
        }
        const temp = Math.floor(ct / byTime[i]);
        ct %= byTime[i];
        if (temp > 0 && timeUnit[i]) {
            sb.push(temp + timeUnit[i]);
        }
        // 一下控制最多输出几个时间单位：
        // 一个时间单位如：N分钟前
        // 两个时间单位如：M分钟N秒前
        // 三个时间单位如：M年N分钟X秒前
        // 以此类推
        if (sb.length >= level) {
            break;
        }
    }
    if (sb.length <= 0) return '刚刚';
    return `${sb.join('')}${suffix}`;
};

/**
 * 时间毫秒数转成易读的时间，如：1ms、1s2ms、1m2s3ms
 * @param time     时间毫秒数
 * @param level    需要显示的层级(默认3)
 * @param timeUnit 时间单位数组，默认值 ["Y", "M", "D", "h", "m", "s", "ms"]
 */
const howLong = (time: number, level?: number, timeUnit?: string[]): string => {
    if (level === null || level === undefined) level = 3;
    if (timeUnit === null || timeUnit === undefined) timeUnit = ['Y', 'M', 'D', 'h', 'm', 's', 'ms'];
    if (!time) return '-';
    if (time === 0) return '0ms';
    const byTime: number[] = [365 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000, 1];
    const prefix = time >= 0 ? '' : '-';
    let ct: number = time >= 0 ? time : time * -1;
    const sb: string[] = [];
    for (let i = 0; i < byTime.length; i++) {
        if (ct < byTime[i]) {
            continue;
        }
        const temp: number = Math.floor(ct / byTime[i]);
        ct %= byTime[i];
        if (temp > 0 && timeUnit[i]) {
            sb.push(temp + timeUnit[i]);
        }
        // 一下控制最多输出几个层级：
        // 一层如：1ms
        // 二层如：1s2ms
        // 三层如：1m2s3ms
        // 以此类推
        if (sb.length >= level) {
            break;
        }
    }
    return `${prefix}${sb.join('')}`;
};

const B: number = 8.0;
const KB: number = B * 1024;
const MB: number = KB * 1024;
const GB: number = MB * 1024;
const TB: number = GB * 1024;
const BytesArray: { value: number; unit: string }[] = [
    { value: TB, unit: 'TB' },
    { value: GB, unit: 'GB' },
    { value: MB, unit: 'MB' },
    { value: KB, unit: 'KB' },
    { value: B, unit: 'B' }
];
/**
 * 比特大小转易读的数据大小格式，如：2.3MB
 * @param num 数据比特大小bit(8bit=1b)
 */
const bytesFormat = (num: number): string => {
    const prefix = num >= 0 ? '' : '-';
    num = num >= 0 ? num : num * -1;
    if (!num) return '-';
    if (num === 0) return '0B';
    for (let i = 0; i < BytesArray.length; i++) {
        const { value, unit } = BytesArray[i];
        const result: number = num / value;
        if (result >= 1.0) {
            return `${prefix}${numeral(result).format('0,000.00')} ${unit}`;
        }
    }
    return '-';
};

export {
    // 数字相关
    strToNumber,
    numberToMoney,
    numberRound,
    numberFormat,
    // 时间相关
    toDayjs,
    dateFormat,
    dateToStr,
    strToDate,
    tomorrow,
    yesterday,
    dateSubtract,
    dateAdd,
    // 其他
    howLongAgo,
    howLong,
    bytesFormat
};
