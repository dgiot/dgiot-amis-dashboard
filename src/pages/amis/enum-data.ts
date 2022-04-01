import { EnumArray } from '@/utils/enum';

const statusMapper: EnumArray = [
    { label: '待审核', value: '-3' },
    { label: '待支付', value: '-2' },
    { label: '待处理', value: '-1' },
    { label: '已接单', value: '0' },
    { label: '已出库', value: '1' },
    { label: '已签收', value: '2' },
    { label: '已驳回', value: '3' },
    { label: '拒收', value: '4' },
    { label: '已取消', value: '5' }
];

const orderTypeMapper: EnumArray = [
    { label: 'O2O', value: '1' },
    { label: 'B2C', value: '2' }
];

const payTypeMapper: EnumArray = [
    { label: '暂无', value: '-1' },
    { label: '现金支付', value: '0' },
    { label: '微信支付', value: '1' },
    { label: '支付宝', value: '2' },
    { label: '三方平台线上支付', value: '3' },
    { label: '小程序', value: '4' },
    { label: '保险支付', value: '5' },
    { label: '微信小程序+保险', value: '45' }
];

const payStatusMapper: EnumArray = [
    { label: '未支付', value: '1' },
    { label: '已支付', value: '2' }
];

export { statusMapper, orderTypeMapper, payTypeMapper, payStatusMapper };
