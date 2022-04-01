import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import { enum2object } from '@/utils/enum';
import { orderTypeMapper, payStatusMapper, payTypeMapper, statusMapper } from './enum-data';
import { serverHost } from './server-api';

const schema = {
    type: 'page',
    title: '',
    toolbar: [],
    body: [
        {
            type: 'crud',
            // --------------------------------------------------------------- 常规配置
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            draggable: false,
            hideQuickSaveBtn: false,
            autoJumpToTopOnPagerChange: false,
            affixHeader: false,
            syncResponse2Query: true,
            // --------------------------------------------------------------- 请求数据配置
            api: {
                method: 'get',
                url: `${serverHost}/iotapi/curd-page@curdQuery`
            },
            defaultParams: { pageNo: 1, pageSize: 10 },
            pageField: 'pageNo',
            perPageField: 'pageSize',
            // --------------------------------------------------------------- 查询条件表单配置
            // 条件过滤表单
            filterTogglable: true,
            filter: {
                // title: "",
                className: classnames(FormClassName.label4x, FormClassName.input14x),
                trimValues: true,
                submitOnChange: false,
                // submitText: "查询",
                controls: [
                    { type: 'text', label: '订单编号', name: 'orderCode', placeholder: '通过关键字搜索', clearable: true },
                    { type: 'text', label: '手机号', name: 'shipMobile', placeholder: '通过关键字搜索', clearable: true },
                    {
                        type: 'select',
                        label: '订单状态',
                        name: 'status',
                        placeholder: '通过关键字搜索',
                        clearable: true,
                        options: statusMapper
                    },
                    { type: 'html', html: '<br />' },
                    {
                        type: 'select',
                        label: '支付状态',
                        name: 'payType',
                        placeholder: '请选择',
                        clearable: true,
                        options: payStatusMapper
                    },
                    { type: 'datetime', label: '开始时间', name: 'createAtStart', placeholder: '选择时间', format: 'x', clearable: true },
                    { type: 'datetime', label: '结束时间', name: 'createAtEnd', placeholder: '选择时间', format: 'x', clearable: true },
                    { label: '查询', level: 'primary', type: 'submit' },
                    { label: '重置', type: 'reset' }
                ]
            },
            // --------------------------------------------------------------- 表格列配置
            primaryField: 'orderId',
            columns: [
                {
                    name: 'index',
                    label: '序号',
                    width: 50,
                    type: 'tpl',
                    tpl: '<%= (this.__super.pageNo - 1) * this.__super.pageSize + this.index + 1 %>'
                },
                // { name: "orderId", label: "订单编号", sortable: true },
                {
                    name: 'orderId',
                    label: '详情1',
                    type: 'link',
                    body: '${orderId}',
                    href: '#/nest-side/menu/00/detail?orderId=${orderId}',
                    sortable: true
                },
                { name: 'orderCode', label: '详情2', type: 'link', body: '详情2', href: '#/nest-side/menu/00/${orderId}', sortable: true },
                {
                    name: 'orderCode',
                    label: '详情3',
                    type: 'link',
                    body: '详情3',
                    href: '#/nest-side/menu/00/react/detail?orderId=${orderId}',
                    sortable: true
                },
                { name: 'status', label: '订单状态', sortable: true, type: 'mapping', map: enum2object(statusMapper) },
                { name: 'shipName', label: '收货人姓名', sortable: true },
                { name: 'shipMobile', label: '手机号', sortable: true },
                { name: 'orderType', label: '订单类型', sortable: true, type: 'mapping', map: enum2object(orderTypeMapper) },
                { name: 'payStatus', label: '支付方式', sortable: true, type: 'mapping', map: enum2object(payTypeMapper) },
                { name: 'payType', label: '支付状态', sortable: true, type: 'mapping', map: enum2object(payStatusMapper) },
                { name: 'payAmount', label: '支付金额', type: 'tpl', tpl: '${payAmount|round:2}', sortable: true },
                {
                    name: 'createAt',
                    label: '下单时间',
                    type: 'tpl',
                    tpl: '${createAt|date:YYYY-MM-DD:YYYY-MM-DD HH\\:mm\\:ss}',
                    sortable: true
                }
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            headerToolbar: [
                { align: 'left', type: 'button', label: '主操作', level: 'primary', size: 'sm' },
                { align: 'left', type: 'button', label: '次操作', size: 'sm' },
                { align: 'right', type: 'columns-toggler' }
            ],
            footerToolbar: [
                { align: 'right', type: 'pagination' },
                { align: 'right', type: 'switch-per-page' },
                { align: 'right', type: 'statistics' }
            ]
        }
    ]
};

export { schema };
