import stringify from 'fast-json-stable-stringify';

/**
 * 保存数据到浏览器Local Storage
 * @param key   数据key
 * @param value 数据值(只能是Json对象)
 */
function setStore(key: string, value: any = ''): void {
    localStorage.setItem(key, stringify(value));
}

/**
 * 从浏览器Local Storage中读取数据
 * @param key       数据key
 * @param ignoreErr 是否忽略错误
 */
function getStore<T = any>(key: string, ignoreErr: boolean = true): T | null {
    let value: any = localStorage.getItem(key);
    if (value) {
        try {
            value = JSON.parse(value);
        } catch (err) {
            if (ignoreErr) {
                value = null;
            } else {
                throw err;
            }
        }
    } else {
        value = null;
    }
    return value;
}

/**
 * 从浏览器Local Storage中删除数据
 * @param key 数据key
 */
function removeStore<T = any>(key: string): T | null {
    const value = getStore<T>(key);
    localStorage.removeItem(key);
    return value;
}

/**
 * 清除浏览器Local Storage中的所以数据
 */
function clearStore(): void {
    localStorage.clear();
}

/**
 * 保存数据到浏览器Session Storage
 * @param key   数据key
 * @param value 数据值(只能是Json对象)
 */
function setSessionStore(key: string, value: any = ''): void {
    sessionStorage.setItem(key, stringify(value));
}

/**
 * 从浏览器Session Storage中读取数据
 * @param key       数据key
 * @param ignoreErr 是否忽略错误
 */
function getSessionStore<T = any>(key: string, ignoreErr: boolean = true): T | null {
    let value: any = sessionStorage.getItem(key);
    if (value) {
        try {
            value = JSON.parse(value);
        } catch (err) {
            if (ignoreErr) {
                value = null;
            } else {
                throw err;
            }
        }
    } else {
        value = null;
    }
    return value;
}

/**
 * 从浏览器Session Storage中删除数据
 * @param key 数据key
 */
function removeSessionStore<T = any>(key: string): T | null {
    const value = getStore<T>(key);
    sessionStorage.removeItem(key);
    return value;
}

/**
 * 清除浏览器Session Storage中的所以数据
 */
function clearSessionStore(): void {
    sessionStorage.clear();
}

interface GlobalDataItem {
    /** 保存的数据 */
    value: any;
    /** 数据过期时间(时间搓) */
    expireTime?: number;
}

/** 全局数据对象 */
const globalDataMap: Map<string, GlobalDataItem> = new Map<string, GlobalDataItem>();

// 删除过期数据
function removeExpireValue(): void {
    const now = new Date().getTime();
    const delKeys: string[] = [];
    globalDataMap.forEach((value, key) => {
        if (!value || !value.expireTime) return;
        if (now >= value.expireTime) delKeys.push(key);
    });
    delKeys.forEach((key) => globalDataMap.delete(key));
}

/**
 * 设置全局数据
 * @param key         数据key
 * @param value       数据值
 * @param expireTime  数据过期时间
 */
function setGlobalData(key: string, value: any, expireTime?: Date): void {
    removeExpireValue();
    if (value === null || value === undefined) return;
    const dataItem: GlobalDataItem = { value };
    if (expireTime) dataItem.expireTime = expireTime.getTime();
    globalDataMap.set(key, dataItem);
}

/**
 * 获取全局数据
 * @param key         数据key
 */
function getGlobalData<T = any>(key: string): T | null {
    removeExpireValue();
    const dataItem = globalDataMap.get(key);
    return dataItem ? dataItem.value : null;
}

/**
 * 删除全局数据
 * @param key 数据key
 */
function removeGlobalData<T = any>(key: string): T | null {
    removeExpireValue();
    const value = getGlobalData<T>(key);
    globalDataMap.delete(key);
    return value;
}

/**
 * 清除所以的全局数据
 */
function clearGlobalData(): void {
    globalDataMap.clear();
}

export {
    setStore,
    getStore,
    removeStore,
    clearStore,
    setSessionStore,
    getSessionStore,
    removeSessionStore,
    clearSessionStore,
    setGlobalData,
    getGlobalData,
    removeGlobalData,
    clearGlobalData
};
