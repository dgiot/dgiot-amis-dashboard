// import classnames from 'classnames';
// import { FormClassName } from '@/amis-types';
// import { enum2object } from '@/utils/enum';
// import { orderTypeMapper, payStatusMapper, payTypeMapper, statusMapper } from '../../enum-data';
// import { serverHost } from '../../server-api';

// const amisPageName = 'dashboard';

// // 详情对话框
// function detailsDialog() {
//   return {
//     type: 'button',
//     label: '查看',
//     level: 'info',
//     size: 'xs',
//     actionType: 'dialog',
//     dialog: {
//       title: '查看订单 - ${orderCode}',
//       closeOnEsc: true,
//       actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
//       body: {
//         type: 'form',
//         // mode: "inline",
//         className: classnames(FormClassName.label5x),
//         initApi: {
//           method: 'get',
//           url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$orderId`
//         },
//         controls: [
//           { type: 'static', name: 'orderId', label: '订单ID' },
//           { type: 'static', name: 'orderCode', label: '订单编号' },
//           { type: 'mapping', name: 'status', label: '订单状态', map: enum2object(statusMapper) },
//           { type: 'static', name: 'shipName', label: '收货人' },
//           { type: 'static', name: 'shipMobile', label: '手机号' },
//           { type: 'static', name: 'shipAddr', label: '地址' }
//         ]
//       }
//     }
//   };
// }
//
// // 编辑对话框
// function editDialog() {
//   return {
//     type: 'button',
//     label: '编辑',
//     level: 'info',
//     size: 'xs',
//     actionType: 'dialog',
//     dialog: {
//       size: 'xs',
//       title: '编辑',
//       data: {
//         '&': '$$',
//         shipName: '${shipName}',
//         shipName2: '${shipName}'
//       },
//       body: {
//         type: 'form',
//         // mode: "inline",
//         className: classnames(FormClassName.flex_label5x),
//         // initApi: {
//         //   method: "get",
//         //   url: `${serverHost}/iotapi/curd-page@getDetail?orderId=$orderId`,
//         // },
//         api: {
//           method: 'put',
//           url: `${serverHost}/iotapi/curd-page@mockUpdate?orderId=$orderId`
//         },
//         controls: [
//           { type: 'text', name: 'orderId', label: '订单ID' },
//           { type: 'text', name: 'orderCode', label: '订单编号' },
//           { type: 'select', name: 'status', label: '订单状态', options: statusMapper },
//           { type: 'text', name: 'shipName', label: '收货人' },
//           { type: 'text', name: 'shipName2', label: '收货人2' },
//           { type: 'text', name: 'shipMobile', label: '手机号' },
//           { type: 'textarea', name: 'shipAddr', label: '地址' }
//         ]
//       }
//     }
//   };
// }
//
// // 删除对话框
// function deleteDialog() {
//   return {
//     type: 'button',
//     label: '删除',
//     level: 'danger',
//     size: 'xs',
//     actionType: 'ajax',
//     api: {
//       method: 'delete',
//       url: `${serverHost}/iotapi/curd-page@mockDelete?orderId=$orderId`
//     },
//     confirmText: '您确认要删除订单:${orderCode}?'
//   };
// }

const schema = {
    type: 'page',
    name: 'page',
    title: '',
    toolbar: [],
    body: [
        {
            type: 'crud',
            name: 'crud',
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            multiple: true,
            keepItemSelectionOnPageChange: false,
            draggable: true,
            hideQuickSaveBtn: false,
            autoJumpToTopOnPagerChange: false,
            affixHeader: false,
            syncResponse2Query: true,
            api: {
                method: 'get',
                url: 'http://amis-admin.msvc.top/!/amis-api/curd-page@curdQuery'
            },
            defaultParams: {
                pageNo: 1,
                pageSize: 10
            },
            pageField: 'pageNo',
            perPageField: 'pageSize',
            filterTogglable: true,
            filter: {
                title: '查询条件',
                className: 'form-label-4x form-input-14x',
                trimValues: true,
                submitOnChange: false,
                controls: [
                    {
                        type: 'text',
                        label: '订单编号',
                        name: 'orderCode',
                        placeholder: '通过关键字搜索',
                        clearable: true,
                        size: 'md'
                    },
                    {
                        type: 'text',
                        label: '手机号',
                        name: 'shipMobile',
                        placeholder: '通过关键字搜索',
                        clearable: true,
                        size: 'md'
                    },
                    {
                        type: 'select',
                        label: '订单状态',
                        name: 'status',
                        placeholder: '通过关键字搜索',
                        clearable: true,
                        size: 'md',
                        options: [
                            {
                                label: '待审核',
                                value: '-3'
                            },
                            {
                                label: '待支付',
                                value: '-2'
                            },
                            {
                                label: '待处理',
                                value: '-1'
                            },
                            {
                                label: '已接单',
                                value: '0'
                            },
                            {
                                label: '已出库',
                                value: '1'
                            },
                            {
                                label: '已签收',
                                value: '2'
                            },
                            {
                                label: '已驳回',
                                value: '3'
                            },
                            {
                                label: '拒收',
                                value: '4'
                            },
                            {
                                label: '已取消',
                                value: '5'
                            }
                        ],
                        submitOnChange: true
                    },
                    {
                        type: 'html',
                        html: '<br />'
                    },
                    {
                        type: 'select',
                        label: '支付状态',
                        name: 'payType',
                        placeholder: '请选择',
                        clearable: true,
                        size: 'md',
                        options: [
                            {
                                label: '未支付',
                                value: '1'
                            },
                            {
                                label: '已支付',
                                value: '2'
                            }
                        ],
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
                    {
                        label: '查询',
                        level: 'primary',
                        type: 'submit',
                        size: 'md'
                    },
                    {
                        label: '重置',
                        type: 'reset'
                    }
                ]
            },
            primaryField: 'orderId',
            columns: [
                {
                    name: 'orderCode',
                    label: '订单编号',
                    sortable: true
                },
                {
                    name: 'status',
                    label: '订单状态',
                    sortable: true,
                    type: 'mapping',
                    map: {
                        '0': '已接单',
                        '1': '已出库',
                        '2': '已签收',
                        '3': '已驳回',
                        '4': '拒收',
                        '5': '已取消',
                        '-3': '待审核',
                        '-2': '待支付',
                        '-1': '待处理'
                    }
                },
                {
                    name: 'shipName',
                    label: '收货人姓名',
                    sortable: true
                },
                {
                    name: 'shipMobile',
                    label: '手机号',
                    sortable: true
                },
                {
                    name: 'orderType',
                    label: '订单类型',
                    sortable: true,
                    type: 'mapping',
                    map: {
                        '1': 'O2O',
                        '2': 'B2C'
                    }
                },
                {
                    name: 'payStatus',
                    label: '支付方式',
                    sortable: true,
                    type: 'mapping',
                    map: {
                        '0': '现金支付',
                        '1': '微信支付',
                        '2': '支付宝',
                        '3': '三方平台线上支付',
                        '4': '小程序',
                        '5': '保险支付',
                        '45': '微信小程序+保险',
                        '-1': '暂无'
                    }
                },
                {
                    name: 'payType',
                    label: '支付状态',
                    sortable: true,
                    type: 'mapping',
                    map: {
                        '1': '未支付',
                        '2': '已支付'
                    }
                },
                {
                    name: 'payTime',
                    label: '支付时间',
                    sortable: true
                },
                {
                    name: 'payAmount',
                    label: '支付金额',
                    sortable: true
                },
                {
                    name: 'createAt',
                    label: '下单时间',
                    sortable: true
                },
                {
                    type: 'operation',
                    label: '操作',
                    width: 120,
                    toggled: true,
                    buttons: [
                        {
                            type: 'button',
                            label: '查看',
                            level: 'info',
                            size: 'xs',
                            actionType: 'dialog',
                            dialog: {
                                title: '查看订单 - ${orderCode}',
                                closeOnEsc: true,
                                actions: [
                                    {
                                        type: 'button',
                                        label: '关闭',
                                        level: 'primary',
                                        actionType: 'close'
                                    }
                                ],
                                body: {
                                    type: 'form',
                                    className: 'form-label-5x',
                                    initApi: {
                                        method: 'get',
                                        url: 'http://amis-admin.msvc.top/!/amis-api/curd-page@getDetail?orderId=$orderId'
                                    },
                                    controls: [
                                        {
                                            type: 'static',
                                            name: 'orderId',
                                            label: '订单ID'
                                        },
                                        {
                                            type: 'static',
                                            name: 'orderCode',
                                            label: '订单编号'
                                        },
                                        {
                                            type: 'mapping',
                                            name: 'status',
                                            label: '订单状态',
                                            map: {
                                                '0': '已接单',
                                                '1': '已出库',
                                                '2': '已签收',
                                                '3': '已驳回',
                                                '4': '拒收',
                                                '5': '已取消',
                                                '-3': '待审核',
                                                '-2': '待支付',
                                                '-1': '待处理'
                                            }
                                        },
                                        {
                                            type: 'static',
                                            name: 'shipName',
                                            label: '收货人'
                                        },
                                        {
                                            type: 'static',
                                            name: 'shipMobile',
                                            label: '手机号'
                                        },
                                        {
                                            type: 'static',
                                            name: 'shipAddr',
                                            label: '地址'
                                        }
                                    ]
                                }
                            }
                        },
                        {
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
                                    className: 'flex-form-label-5x',
                                    api: {
                                        method: 'put',
                                        url: 'http://amis-admin.msvc.top/!/amis-api/curd-page@mockUpdate?orderId=$orderId'
                                    },
                                    controls: [
                                        {
                                            type: 'text',
                                            name: 'orderId',
                                            label: '订单ID'
                                        },
                                        {
                                            type: 'text',
                                            name: 'orderCode',
                                            label: '订单编号'
                                        },
                                        {
                                            type: 'select',
                                            name: 'status',
                                            label: '订单状态',
                                            options: [
                                                {
                                                    label: '待审核',
                                                    value: '-3'
                                                },
                                                {
                                                    label: '待支付',
                                                    value: '-2'
                                                },
                                                {
                                                    label: '待处理',
                                                    value: '-1'
                                                },
                                                {
                                                    label: '已接单',
                                                    value: '0'
                                                },
                                                {
                                                    label: '已出库',
                                                    value: '1'
                                                },
                                                {
                                                    label: '已签收',
                                                    value: '2'
                                                },
                                                {
                                                    label: '已驳回',
                                                    value: '3'
                                                },
                                                {
                                                    label: '拒收',
                                                    value: '4'
                                                },
                                                {
                                                    label: '已取消',
                                                    value: '5'
                                                }
                                            ]
                                        },
                                        {
                                            type: 'text',
                                            name: 'shipName',
                                            label: '收货人'
                                        },
                                        {
                                            type: 'text',
                                            name: 'shipName2',
                                            label: '收货人2'
                                        },
                                        {
                                            type: 'text',
                                            name: 'shipMobile',
                                            label: '手机号'
                                        },
                                        {
                                            type: 'textarea',
                                            name: 'shipAddr',
                                            label: '地址'
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            type: 'button',
                            label: '删除',
                            level: 'danger',
                            size: 'xs',
                            actionType: 'ajax',
                            api: {
                                method: 'delete',
                                url: 'http://amis-admin.msvc.top/!/amis-api/curd-page@mockDelete?orderId=$orderId'
                            },
                            confirmText: '您确认要删除订单:${orderCode}?'
                        }
                    ]
                }
            ],
            bulkActions: [
                {
                    label: '批量操作1'
                },
                {
                    label: '批量操作2'
                }
            ],
            headerToolbar: [
                {
                    align: 'left',
                    type: 'button',
                    label: '主操作',
                    level: 'primary',
                    size: 'sm'
                },
                {
                    align: 'left',
                    type: 'button',
                    label: '次操作',
                    size: 'sm'
                },
                {
                    align: 'left',
                    type: 'bulkActions'
                },
                {
                    align: 'right',
                    type: 'columns-toggler'
                },
                {
                    align: 'right',
                    type: 'filter-toggler'
                },
                {
                    align: 'right',
                    type: 'drag-toggler'
                },
                {
                    align: 'right',
                    type: 'export-csv'
                },
                {
                    align: 'right',
                    type: 'export-excel'
                }
            ],
            footerToolbar: [
                {
                    align: 'right',
                    type: 'pagination'
                },
                {
                    align: 'right',
                    type: 'switch-per-page'
                },
                {
                    align: 'right',
                    type: 'statistics'
                }
            ]
        }
    ]
};

export {
    schema
    // ,
    // amisPageName
};
