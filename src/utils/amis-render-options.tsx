// @ts-nocheck
import { CSSProperties } from 'react';
import copy from 'copy-to-clipboard';
import qs from 'qs';
import axios, { AxiosRequestConfig, Canceler, ResponseType } from 'axios';
import { message, notification } from 'antd';
import { RenderOptions } from 'amis/lib/factory';
import { logger } from '@/utils/logger';
import { axiosCreate, errorMsg } from '@/utils/request';
import { getUrlParam, hasValue } from '@/utils/utils';
import { TypeEnum, variableTypeOf } from '@/utils/typeof';
import Cookies from 'js-cookie';
const axiosSettings = {
    // token在localStorage、sessionStorage、cookie存储的key的名称
    tokenTableName: 'authorization',
    // token名称
    tokenName: 'sessionToken',
    // 最长请求时间
    requestTimeout: 1000 * 1 * 30,
    // 不经过cookie校验的路由,目前只写了首页
    routingWhitelist: ['blank/login', '/'],
    // 不经过cookie校验的接口,目前只写了登录接口
    // http://47.118.69.187/swagger/
    cookieWhitelist: ['login']
};
const log = logger.getLogger('src/utils/amis-render-options.tsx');

interface RequestConfig extends AxiosRequestConfig {
    cancelExecutor?: (cancel: Canceler) => void;
}

export interface FetcherConfig {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    data?: any;
    config: RequestConfig;
    responseType?: ResponseType;
    headers?: any;
}

const axiosInstance = axiosCreate();
// Dgiot Amis- 请求适配
axiosInstance.interceptors.request.use((request) => {
    log.info('全局请求拦截[开始] request -> ', request);
    const queryParams = getUrlParam(undefined, request.url);
    if (!queryParams) return request;
    // 适配 - 分页查询参数
    const { orderDir, orderBy } = queryParams;
    if (orderDir && orderBy && /(asc|desc)/.test(orderDir.toString())) {
        queryParams.orderField = orderBy;
        queryParams.sort = orderDir;
    }
    // 设置 请求头
    // @ts-ignore
    request.headers[`${axiosSettings.tokenName}`] = Cookies.get(`${axiosSettings.tokenTableName}`);
    // // 设置 accept
    // request.headers['accept'] = 'application/json'
    // 修改请求参数
    log.info('请求主体 》》', request);
    request.url = `${request.url?.split('?')[0]}?${qs.stringify(queryParams)}`;
    log.info('全局请求拦截[结束] request -> ', request);
    return request;
});
// Dgiot Amis- 响应适配
axiosInstance.interceptors.response.use((response) => {
    log.info('全局响应拦截[开始] response -> ', response);
    const { status, data, config } = response;
    if (status === 401) {
        // TODO 跳转到登录页面
        return response;
    }
    // 支持amis返回值
    if (variableTypeOf(data.status) === TypeEnum.number && (variableTypeOf(data.msg) === TypeEnum.string || hasValue(data.data)))
        return response;
    // 错误处理 - 500
    if (status >= 500) {
        response.status = 200;
        response.data = { status: -1, msg: data.message ?? errorMsg[status] ?? errorMsg['500'], data: null };
        return response;
    }
    // 错误处理 - 400
    if (status === 400) {
        response.status = 200;
        response.data = { status: -1, msg: data.message ?? '请求参数校验失败', data: null };
        // 数据校验适配
        if (data?.validMessageList?.length > 0) {
            response.data = { ...response.data, status: 422, errors: {} };
            (data.validMessageList as any[]).forEach(({ filed, errorMessage }) => {
                response.data.errors[filed] = errorMessage;
            });
        }
        return response;
    }
    if (status < 200 || status >= 300) return response;
    // 请求成功
    const aimsData = { status: 0, msg: '', data: data };
    response.data = aimsData;
    // 适配 - 分页查询
    // 适配iotapi
    log.info('config.url -> ', config.url);
    if (config.url.indexOf('iotapi') == -1) {
        const { records, total, searchCount, pages, rows, count, ...rest } = data;
        if (hasValue(records) && hasValue(total) && hasValue(searchCount) && hasValue(pages) && !hasValue(rows) && !hasValue(count)) {
            aimsData.data = { rows: records, count: total, searchCount, pages, ...rest };
        }
    } else {
        log.error('全局响应拦截[结束] data -> ', data);
        aimsData.data = { rows: data.results, count: data.results.length, searchCount: true, pages: 100 };
    }
    log.info('全局响应拦截[结束] response -> ', response, aimsData);
    return response;
});

const amisRenderOptions: RenderOptions = {
    /** 主题配置(default（默认主题）、cxd（云舍）和dark（暗黑）、antd) */
    theme: 'antd',
    /** 默认为 "global"，决定 store 是否为全局共用的，如果想单占一个 store，请设置不同的值 */
    session: 'global',
    /** 发送http请求 */
    fetcher: (fetcherConfig) => {
        const { url, method = 'get', responseType, config = {}, headers = {} } = fetcherConfig as FetcherConfig;
        let { data } = fetcherConfig as FetcherConfig;
        config.withCredentials = true;
        if (responseType) config.responseType = responseType;
        if (config.cancelExecutor) config.cancelToken = new axios.CancelToken(config.cancelExecutor);
        config.headers = headers;
        if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) config.params = data;
            return axiosInstance[method](url, config);
        } else if (data && data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
            data = JSON.stringify(data);
            config.headers['Content-Type'] = 'application/json';
        }
        return axiosInstance[method](url, data, config);
    },
    /** 是否取消http请求 */
    isCancel: (value) => axios.isCancel(value),
    /** 用来实现通知 */
    notify: (type, msg) => {
        if (!type) {
            log.warn('[Notify]', type, msg);
            return;
        }
        const style: CSSProperties = { width: 296 };
        if (type === 'error') {
            notification.error({ message: '系统错误', description: msg, style });
        } else if (type === 'success') {
            notification.success({ message: '系统消息', description: msg, style });
        } else {
            log.warn('[Notify]', type, msg);
        }
    },
    /** 用来实现警告提示 */
    // alert: msg => alert(msg),
    /** 用来实现确认框 */
    // confirm: (msg, title) => confirm(msg, title),
    /** 用来实现内容复制 */
    copy: (contents) => {
        if (copy(contents)) {
            message.success('内容已复制到粘贴板').then();
        } else {
            message.warn('内容复制到粘贴板失败').then();
        }
    },
    /** 用来实现页面跳转 */
    // jumpTo: (to, action, ctx) => {
    // },
    /** 地址替换，跟 jumpTo 类似 */
    updateLocation: (location: string /*目标地址*/, replace: boolean /*是replace，还是push?*/) => {
        if (replace) {
            history.pushState({}, document.title, `${document.location.pathname}${location}${document.location.hash}`);
        } else {
            history.replaceState({}, document.title, `${document.location.pathname}${location}${document.location.hash}`);
        }
    },
    /** 渲染器解析实现 */
    // rendererResolver:(path, schema, props) => {},
    /** 用来决定弹框容器 */
    // getModalContainer: () => document.getElementById(window.currentAmisId)!,
    getModalContainer: () => document.getElementById('amis-modal-container')!
    /** 用于懒加载自定义组件 */
    // loadRenderer:(schema, path, reRender) => {},
    /** 固顶间距，当你的有其他固顶元素时，需要设置一定的偏移量，否则会重叠 */
    // affixOffsetTop: 0,
    /** 固底间距，当你的有其他固底元素时，需要设置一定的偏移量，否则会重叠 */
    // affixOffsetBottom: 0,
    /** 内置 rich-text 为 frolaEditor，想要使用，请自行购买，或者用免费的 Tinymce，不设置 token 默认就是 Tinymce */
    // richTextToken: undefined,
};

export { amisRenderOptions };
