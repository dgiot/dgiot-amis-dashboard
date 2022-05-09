import lodash from 'lodash';
import { parse } from 'qs';

/**
 * 检查 name 是否是 o 对象的直接或继承属性。
 * @param o     对象
 * @param name  属性名
 */
const hasPropertyIn = (o: object, name: string): boolean => lodash.hasIn(o, name);

/**
 * 获取 prop 或者 state 值(prop优先)
 * @param propName  prop属性名
 * @param props     prop对象
 * @param state     state对象
 * @param stateName state属性名
 */
const getPropOrStateValue = <T>(propName: string, props: object, state: object, stateName?: string): T => {
    if (lodash.hasIn(props, propName)) return props[propName] as T;
    return state[stateName ?? propName] as T;
};

/**
 * 判断变量是否有值 value !== null && value !== undefined
 * @param value 目标变量
 */
const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined;
};

/**
 * 判断变量是否有值 value === null || value === undefined
 * @param value 目标变量
 */
const noValue = (value: any): boolean => {
    return value === null || value === undefined;
};

/**
 * 获取字符串值
 * @param value 变量值
 * @param force undefined、null 强制转换成空字符串
 */
const getStrValue = (value: any, force?: boolean): string | undefined | null => {
    if (!force && (value === undefined || value === null)) return value;
    return hasValue(value) ? `${value}` : '';
};

/**
 * 获取url querystring部分参数值
 * @param paramName 参数名称,不传则返回所有querystring参数
 * @param url       待解析的url,默认为location.href
 */
const getUrlParam = (paramName?: string, url?: string): any => {
    const str = url || window.location.href;
    const idx = str.indexOf('?');
    const hashIdx = str.indexOf('#');
    if (idx === -1) return undefined;
    const urlParams = parse(str.substring(idx + 1, hashIdx !== -1 ? hashIdx : undefined)) || {};
    if (paramName) return urlParams[paramName];
    return urlParams;
};

/**
 * 获取 PageLocation
 */
const getPageLocation = (): PageLocation => {
    const pathname = document.location.pathname;
    let search = document.location.search || '';
    search = search.startsWith('?') ? search.substr(1, search.length) : '';
    let hash = document.location.hash || '';
    hash = hash.startsWith('#') ? hash.substr(1, hash.length) : '';
    const query = parse(search);
    return { pathname, search, hash, query };
};

/**
 * 获取 RouterLocation
 */
const getRouterLocation = (): RouterLocation => {
    let hash = lodash.trim(document.location.hash);
    hash = hash.startsWith('#') ? hash.substr(1, hash.length) : '';
    const arr = hash.split('?');
    const path = arr && arr.length >= 1 ? arr[0] : '';
    const searchStr = arr && arr.length >= 2 ? arr[1] : '';
    const searchExists = lodash.trim(searchStr).length > 0;
    const search = searchExists ? searchStr : undefined;
    const query = searchExists ? parse(searchStr) : undefined;
    return { path, search, query };
};
const  FormatTime = (t:any)=> {
    if (t < 10) return "0" + t;
    return t;
  }
  const getTime = ()=> {
    var myDate = new Date();
    let yy = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let mm = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    mm = FormatTime(mm);
    let dd = myDate.getDate(); // 获取当前日(1-31)
    dd = FormatTime(dd);
    let hh = myDate.getHours(); // 获取当前小时数(0-23)
    hh = FormatTime(hh);
    let mt = myDate.getMinutes(); // 获取当前分钟数(0-59)
    mt = FormatTime(mt);
    let ss = myDate.getSeconds(); // 获取当前秒数(0-59)
    ss = FormatTime(ss);
    // let ms = myDate.getMilliseconds();
    //2021-10-22T10:13:39.229Z
    let currentTime =
      yy + "-" + mm + "-" + dd + " " + hh + ":" + mt + ":" + ss;
    return currentTime;
  }

export { hasPropertyIn, getPropOrStateValue, noValue, hasValue, getStrValue, getUrlParam, getPageLocation, getRouterLocation,FormatTime,getTime };
