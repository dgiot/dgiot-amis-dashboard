import { enum2object } from '@/utils/enum';
import { statusMapper } from '@/pages/amis/enum-data';
import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import { serverHost } from './server-api';

const amisPageName = 'detail2';

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
                url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$match.params.detail2`
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
                { type: 'static', name: 'shipAddr', label: '地址' }
            ]
        }
    ]
};

export { schema, amisPageName };
