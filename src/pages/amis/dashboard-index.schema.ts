import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import { enum2object } from '@/utils/enum';
import { orderTypeMapper, payStatusMapper, payTypeMapper, statusMapper } from './enum-data';
import { serverHost } from './server-api';

const amisPageName = 'dashboard';

// 详情对话框
function detailsDialog() {
    return {
        type: 'button',
        label: '查看',
        level: 'info',
        size: 'xs',
        actionType: 'dialog',
        dialog: {
            title: '查看订单 - ${orderCode}',
            closeOnEsc: true,
            actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
            body: {
                type: 'form',
                // mode: "inline",
                className: classnames(FormClassName.label5x),
                initApi: {
                    method: 'get',
                    url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$orderId`
                },
                controls: [
                    { type: 'static', name: 'orderId', label: '订单ID' },
                    { type: 'static', name: 'orderCode', label: '订单编号' },
                    { type: 'mapping', name: 'status', label: '订单状态', map: enum2object(statusMapper) },
                    { type: 'static', name: 'shipName', label: '收货人' },
                    { type: 'static', name: 'shipMobile', label: '手机号' },
                    { type: 'static', name: 'shipAddr', label: '地址' }
                ]
            }
        }
    };
}

// 编辑对话框
function editDialog() {
    return {
        type: 'button',
        label: '编辑',
        level: 'info',
        size: 'xs',
        actionType: 'dialog',
        dialog: {
            size: 'xs',
            title: '编辑',
            data: {
                '&': '$$',
                shipName: '${shipName}',
                shipName2: '${shipName}'
            },
            body: {
                type: 'form',
                // mode: "inline",
                className: classnames(FormClassName.flex_label5x),
                // initApi: {
                //   method: "get",
                //   url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$orderId`,
                // },
                api: {
                    method: 'put',
                    url: `${serverHost}/iotapi/curd-page@mockUpdate?orderId=$orderId`
                },
                controls: [
                    { type: 'text', name: 'orderId', label: '订单ID' },
                    { type: 'text', name: 'orderCode', label: '订单编号' },
                    { type: 'select', name: 'status', label: '订单状态', options: statusMapper },
                    { type: 'text', name: 'shipName', label: '收货人' },
                    { type: 'text', name: 'shipName2', label: '收货人2' },
                    { type: 'text', name: 'shipMobile', label: '手机号' },
                    { type: 'textarea', name: 'shipAddr', label: '地址' }
                ]
            }
        }
    };
}

// 删除对话框
function deleteDialog() {
    return {
        type: 'button',
        label: '删除',
        level: 'danger',
        size: 'xs',
        actionType: 'ajax',
        api: {
            method: 'delete',
            url: `${serverHost}/iotapi/curd-page@mockDelete?orderId=$orderId`
        },
        confirmText: '您确认要删除订单:${orderCode}?'
    };
}

const schema = {
    type: 'page',
    name: 'page',
    title: '',
    toolbar: [],
    body: [
        {
            type: 'crud',
            name: 'crud',
            // --------------------------------------------------------------- 常规配置
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            multiple: true,
            keepItemSelectionOnPageChange: false,
            // labelTpl: "${orderCode}",
            draggable: true,
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
            // interval: 3000,
            // silentPolling: true,
            // --------------------------------------------------------------- 查询条件表单配置
            // 条件过滤表单
            filterTogglable: true,
            filter: {
                title: '查询条件',
                className: classnames(FormClassName.label4x, FormClassName.input14x),
                trimValues: true,
                submitOnChange: false,
                // submitText: "查询",
                controls: [
                    { type: 'text', label: '订单编号', name: 'orderCode', placeholder: '通过关键字搜索', clearable: true, size: 'md' },
                    { type: 'text', label: '手机号', name: 'shipMobile', placeholder: '通过关键字搜索', clearable: true, size: 'md' },
                    {
                        type: 'select',
                        label: '订单状态',
                        name: 'status',
                        placeholder: '通过关键字搜索',
                        clearable: true,
                        size: 'md',
                        options: statusMapper,
                        submitOnChange: true
                    },
                    { type: 'html', html: '<br />' },
                    {
                        type: 'select',
                        label: '支付状态',
                        name: 'payType',
                        placeholder: '请选择',
                        clearable: true,
                        size: 'md',
                        options: payStatusMapper,
                        submitOnChange: true
                    },
                    {
                        type: 'datetime',
                        label: '开始时间',
                        name: 'createAtStart',
                        placeholder: '选择时间',
                        format: 'x',
                        clearable: true,
                        size: 'md'
                    },
                    {
                        type: 'datetime',
                        label: '结束时间',
                        name: 'createAtEnd',
                        placeholder: '选择时间',
                        format: 'x',
                        clearable: true,
                        size: 'md'
                    },
                    // {type: "divider"},
                    { label: '查询', level: 'primary', type: 'submit', size: 'md' },
                    { label: '重置', type: 'reset' }
                ]
            },
            // --------------------------------------------------------------- 表格列配置
            primaryField: 'orderId',
            columns: [
                { name: 'orderCode', label: '订单编号', sortable: true },
                { name: 'status', label: '订单状态', sortable: true, type: 'mapping', map: enum2object(statusMapper) },
                { name: 'shipName', label: '收货人姓名', sortable: true },
                { name: 'shipMobile', label: '手机号', sortable: true },
                { name: 'orderType', label: '订单类型', sortable: true, type: 'mapping', map: enum2object(orderTypeMapper) },
                { name: 'payStatus', label: '支付方式', sortable: true, type: 'mapping', map: enum2object(payTypeMapper) },
                { name: 'payType', label: '支付状态', sortable: true, type: 'mapping', map: enum2object(payStatusMapper) },
                { name: 'payTime', label: '支付时间', sortable: true },
                { name: 'payAmount', label: '支付金额', sortable: true },
                { name: 'createAt', label: '下单时间', sortable: true },
                {
                    type: 'operation',
                    label: '操作',
                    width: 120,
                    toggled: true,
                    buttons: [detailsDialog(), editDialog(), deleteDialog()]
                }
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            bulkActions: [{ label: '批量操作1' }, { label: '批量操作2' }],
            headerToolbar: [
                { align: 'left', type: 'button', label: '主操作', level: 'primary', size: 'sm' },
                { align: 'left', type: 'button', label: '次操作', size: 'sm' },
                { align: 'left', type: 'bulkActions' },
                { align: 'right', type: 'columns-toggler' },
                { align: 'right', type: 'filter-toggler' },
                { align: 'right', type: 'drag-toggler' },
                { align: 'right', type: 'export-csv' },
                { align: 'right', type: 'export-excel' }
            ],
            footerToolbar: [
                // {align: "right", type: "load-more"},
                { align: 'right', type: 'pagination' },
                { align: 'right', type: 'switch-per-page' },
                { align: 'right', type: 'statistics' }
            ]
        }
    ]
};

export { schema, amisPageName };
