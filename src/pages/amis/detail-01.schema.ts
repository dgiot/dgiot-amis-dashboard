import { enum2object } from '@/utils/enum';
import { statusMapper } from '@/pages/amis/enum-data';
import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import { serverHost } from './server-api';

const amisPageName = 'detail';

let globalData: AmisPageGlobalData | undefined;

const initGlobalData: AmisPage['initGlobalData'] = (initGlobalData) => {
    globalData = initGlobalData;
};

const shouldPageUpdate: AmisPage['shouldPageUpdate'] = (nextGlobalData) => {
    const {
        location: { query }
    } = nextGlobalData;
    let flag = true;
    if (globalData?.location?.query && query && globalData?.location?.query.orderId === query.orderId) {
        flag = false;
    }
    globalData = nextGlobalData;
    console.log('####################### flag -> ', flag);
    return flag;
};

const schema = {
    type: 'page',
    name: 'page',
    title: '',
    toolbar: [],
    body: [
        {
            type: 'form',
            name: 'form',
            wrapWithPanel: false,
            mode: 'inline',
            className: classnames(FormClassName.label4x),
            // debug: true,
            initApi: {
                method: 'get',
                url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$location.query.orderId`
                // url: `${serverHost}/iotapi/curd-page@getDetail?orderId`,
                // data: {
                //   orderId: window[amisPageName]?.orderId ?? "1021652540551041025"
                // }
            },
            controls: [
                { type: 'static', name: 'orderId', label: '订单ID' },
                { type: 'html', html: '<br />' },
                { type: 'static', name: 'orderCode', label: '订单编号' },
                { type: 'html', html: '<br />' },
                { type: 'mapping', name: 'status', label: '订单状态', map: enum2object(statusMapper) },
                { type: 'html', html: '<br />' },
                { type: 'static', name: 'shipName', label: '收货人' },
                { type: 'html', html: '<br />' },
                { type: 'static', name: 'shipMobile', label: '手机号' },
                { type: 'html', html: '<br />' },
                { type: 'static', name: 'shipAddr', label: '地址' },
                { type: 'html', html: '<br />' },
                { type: 'static', name: 'time', label: '时间' }
            ]
        }
    ]
};

export { schema, amisPageName, initGlobalData, shouldPageUpdate };
