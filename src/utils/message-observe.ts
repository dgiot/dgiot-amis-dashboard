import { noValue } from './utils';
import { logger } from '@/utils/logger';

const log = logger.getLogger('src/utils/message-observe.ts');

/** 订阅消息key类型 */
type SubscribeKey = string | string[];

/** 消息通知函数 */
interface Handler<T = any> {
    /**
     * 消息通知函数
     * @param data  通知消息
     * @param key   消息key
     */
    (data: T, key: string): void;
}

/** 取消订阅 */
interface CancelSubscribe {
    /** 订阅的消息key */
    key: SubscribeKey;
    /** 取消当前订阅 */
    cancel: () => void;
}

class ObserveStore {
    // 消息数据
    private store: { [key: string]: any } = {};
    // 消息订阅者注册表
    private observeStoreTable: { [key: string]: Handler[] } = {};

    constructor() {
        this.init();
    }

    // 初始化
    private init(): void {
        // 更改store值就会自动publish消息 - 实现
        this.store = new Proxy<any>(
            {},
            {
                get: (target: any, key: string): any => {
                    return target[key];
                },
                // 代理object赋值操作,设置值的时候,触发订阅时的回调函数
                set: (target: any, key: string, value: any): boolean => {
                    if (noValue(key)) return false;
                    target[key] = value;
                    // 消息通知订阅者
                    const observerArr = this.observeStoreTable[key];
                    if (noValue(observerArr) || observerArr.length <= 0) return true;
                    observerArr.forEach((handler) => {
                        try {
                            handler(value, key);
                        } catch (err) {
                            log.error('消息通知函数执行失败,messageKey=', key, ' | messageValue=', value);
                        }
                    });
                    return true;
                }
            }
        );
    }

    // 取消注册订阅者
    private unregisterObserver<T = any>(messageKey: string, handler?: Handler<T>): void {
        const observerArr = this.observeStoreTable[messageKey];
        if (noValue(observerArr) || observerArr.length <= 0) return;
        if (noValue(handler)) {
            this.observeStoreTable[messageKey] = [];
        } else {
            observerArr.forEach((obsHandler: Handler, index) => {
                if (obsHandler !== handler) return;
                this.observeStoreTable[messageKey].splice(index, 1);
            });
        }
    }

    // 注册订阅者
    private registerObserver<T = any>(messageKey: string, handler: Handler<T>): void {
        let observerArr = this.observeStoreTable[messageKey];
        if (noValue(observerArr) || observerArr.length <= 0) {
            observerArr = [];
            this.observeStoreTable[messageKey] = observerArr;
        }
        observerArr.push(handler);
        // if (noValue(messageKey)) return;
        // const sourceValue = this.store[messageKey];
        // if (noValue(sourceValue)) return;
        // handler(sourceValue, messageKey);
    }

    /** 获取存储对象,修改这个对象属性即可publish消息 */
    public getStore(): { [key: string]: any } {
        return this.store;
    }

    /**
     * 取消订阅
     * @param key     订阅的消息key
     * @param handler 指定取消的监听函数
     */
    public unsubscribe<T = any>(key: SubscribeKey, handler?: Handler<T>): void {
        if (key instanceof Array) {
            key.forEach((k) => this.unregisterObserver<T>(k, handler));
        } else {
            this.unregisterObserver<T>(key, handler);
        }
    }

    /**
     * 消息订阅
     * @param key     订阅的消息key
     * @param handler 监听函数
     */
    public subscribe<T = any>(key: SubscribeKey, handler: Handler<T>): CancelSubscribe {
        const cancelSubscribe: CancelSubscribe = {
            key,
            cancel: () => {}
        };
        if (key instanceof Array) {
            key.forEach((k) => this.registerObserver<T>(k, handler));
            cancelSubscribe.cancel = () => key.forEach((k) => this.unsubscribe(k, handler));
        } else {
            this.registerObserver<T>(key, handler);
            cancelSubscribe.cancel = () => this.unsubscribe(key, handler);
        }
        return cancelSubscribe;
    }

    /**
     * 消息订阅(只订阅一次)
     * @param key     订阅的消息key
     * @param handler 监听函数
     */
    public subscribeOnce<T = any>(key: string, handler: Handler<T>): void {
        const cancelSubscribe = this.subscribe(key, (data: T) => {
            try {
                handler(data, key);
            } catch (err) {
                log.error('消息通知函数执行失败,messageKey=', key, ' | value=', data);
            }
            cancelSubscribe.cancel();
        });
    }

    /**
     * 发送消息(触发订阅监听函数)
     * @param key     消息key
     * @param message 消息值
     */
    public publish<T = any>(key: SubscribeKey, message: T): void {
        if (key instanceof Array) {
            key.forEach((k) => (this.store[k] = message));
        } else {
            this.store[key] = message;
        }
    }
}

const observeStore = new ObserveStore();

export { Handler, CancelSubscribe, ObserveStore, observeStore };
