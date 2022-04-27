import React from 'react';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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
    // http://121.5.171.21/swagger/
    cookieWhitelist: ['login']
};
// HTTP 状态码错误说明
const errorMsg = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

class Request {
    // 全局响应数据转换处理
    protected static transformResponse(response: AxiosResponse): any {
        console.log('全局响应数据转换处理', response);
        return response.data ?? null;
    }

    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    public get(url: string, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.get(url, config).then((response) => Request.transformResponse(response));
    }

    public delete(url: string, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.delete(url, config).then((response) => Request.transformResponse(response));
    }

    public head(url: string, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.head(url, config).then((response) => Request.transformResponse(response));
    }

    public options(url: string, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.options(url, config).then((response) => Request.transformResponse(response));
    }

    public post(url: string, data?: any, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.post(url, data, config).then((response) => Request.transformResponse(response));
    }

    public put(url: string, data?: any, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.put(url, data, config).then((response) => Request.transformResponse(response));
    }

    public patch(url: string, data?: any, config?: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.patch(url, data, config).then((response) => Request.transformResponse(response));
    }

    public request(config: AxiosRequestConfig) {
        // @ts-ignore
        return this.axiosInstance.request(config).then((response) => Request.transformResponse(response));
    }
}

/** 创建一个axios实例对象 */
function axiosCreate(config?: AxiosRequestConfig): AxiosInstance {
    return axios.create({
        validateStatus: () => true,
        ...config
    });
}

const axiosInstance = axiosCreate({
    validateStatus: (status) => status >= 200 && status < 300
});

// 全局请求拦截
axiosInstance.interceptors.request.use(
    (request) => {
        const { hash } = location;
        console.log(axiosSettings.routingWhitelist.indexOf(hash));
        // @ts-ignore
        request.headers[`${axiosSettings.tokenName}`] = Cookies.get(`${axiosSettings.tokenTableName}`);
        return request;
    },
    (error) => {
        notification.error({
            message: '请求发送失败',
            description: '发送请求给服务端失败，请检查电脑网络，再重试'
        });
        return Promise.reject(error);
    }
);
// 全局拦截配置
axiosInstance.interceptors.response.use(
   
    (response) => response,
    (error) => {
        const { response } = error;
        if (!error || !response) {
            notification.error({ message: '服务器异常', description: '请求服务端异常' });
            return Promise.reject(error);
        }
        
        if (response?.status === 401) {
            // TODO 跳转到登录页面
            console.log('输出地址',location)
        }
        const {
            data: { message, validMessageList }
        } = response;
        if (validMessageList) {
            notification.error({
                message: '请求参数校验失败',
                description: (
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {(validMessageList as any[]).map((item, index) => (
                            <li key={index}>
                                {item.filed}: {item.errorMessage}({item.code})
                            </li>
                        ))}
                    </ul>
                )
            });
            return Promise.reject(error.response);
        } else if (message) {
            const errorText = message ?? errorMsg[response.status] ?? '服务器异常';
            notification.error({ message: errorText });
        }
        return Promise.reject(error);
    }
);

const request = new Request(axiosInstance);

export { errorMsg, axiosCreate, request };
