import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import Cookies from 'js-cookie';
import { enum2object } from '@/utils/enum';
import { statusMapper } from '../../enum-data';
// import { serverHost } from '../../server-api';

// const amisPageName = 'curd';

// 详情对话框
function detailsDialog() {
    return {
        type: 'button',
        label: '查看',
        level: 'info',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            title: '查看设备 - ${orderCode}',
            closeOnEsc: true,
            actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
            body: {
                type: 'form',
                // mode: "inline",
                className: classnames(FormClassName.label5x),
                // initApi: {
                //     method: 'get',
                //     url: `/iotapi/classes/Device`
                // },
                controls: [
                    { type: 'static', name: 'name', label: '设备名称' },
                    { type: 'static', name: 'devaddr', label: '设备编号' },
                    { type: 'static', name: 'detail.brand', label: '设备品牌' },
                    { type: 'static', name: 'detail.devModel', label: '设备型号' },
                    { type: 'static', name: 'detail.address', label: '安装位置' },
                    { type: 'static', name: 'detail.desc', label: '描述' }
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
        level: 'success',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            // size: 'xs',
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
                    url: `/iotapi/classes/Device`
                },
                controls: [
                    { type: 'text', name: 'name', label: '设备名称' },
                    { type: 'text', name: 'devaddr', label: '设备地址' },
                    { type: 'select', name: 'objectId', label: '设备id' },
                    { type: 'text', name: 'createdAt', label: '创建时间' },
                    { type: 'text', name: 'isEnable', label: '启用设备状态' }
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
        // size: 'xs',
        actionType: 'ajax',
        api: {
            method: 'delete',
            url: '/iotapi/amis/Device/${objectId}',
            headers:{
                sessionToken:Cookies.get('authorization')
            }
        },
        confirmText: '您确认要删除该设备:${objectId}?'
    };
}
// 组态框
function konvaDialog() {
    return {
        label: '组态',
        type: 'button',
        level: 'secondary',
        actionType: 'link',
        link: '../dgiot-amis-dashboard/#/dashboard/konva/${devaddr}/${product.objectId}'
    };
}

const schema = {
    type: 'page',
    name: 'page',
    title: '',
    // toolbar: [],
    body: [
        {
            type: 'crud',
            name: 'crud',
            // --------------------------------------------------------------- 常规配置
            perPageAvailable: [10, 20, 50, 100],
            syncLocation: false,
            multiple: false,
            keepItemSelectionOnPageChange: false,
            // labelTpl: "${orderCode}",
            draggable: false,
            hideQuickSaveBtn: false,
            autoJumpToTopOnPagerChange: false,
            affixHeader: false,
            syncResponse2Query: true,
            // --------------------------------------------------------------- 请求数据配置
            api: {
                method: 'get',
                url: `/iotapi/amis/Device`,
                // "responseData": {
                //     "&": "$$",
                //     "items": "${results}"
                //   }
                // data: {
                //     "skip": '(${skip}-1)*${limit}',
                //     "limit": '${limit}',
                //     'order': '-createdAt',
                //     "count": "objectId"
                // },
            },
            // defaultParams: { limit: 20, skip: 0 ,order:'-createdAt',where: {'product':{"$ne":null},"name":{"$ne":null,"$exists":true}}},
            defaultParams: { skip: 1,
            limit: 10,  order: '-createdAt' },
            pageField: 'skip',
            perPageField: 'limit',
            // interval: 3000,
            silentPolling: false,
            // --------------------------------------------------------------- 查询条件表单配置
            // 条件过滤表单
            filterTogglable: false,
            filter: {
                title: '查询条件',
                className: classnames(FormClassName.label4x, FormClassName.input14x),
                trimValues: true,
                submitOnChange: false,
                // submitText: "查询",
                controls: [
                    { type: 'text', label: '设备名称', name: 'name', placeholder: '通过关键字搜索', clearable: true, size: 'md' },
                    { type: 'text', label: '设备地址', name: 'devaddr', placeholder: '通过关键字搜索', clearable: true, size: 'md' },
                    { type: 'text', label: '设备id', name: 'objectId', placeholder: '通过关键字搜索', clearable: true, size: 'md' },
                    // {type: "divider"},
                    { label: '查询', level: 'primary', type: 'submit', size: 'md' },
                    { label: '重置', type: 'reset' }
                ]
            },
            // --------------------------------------------------------------- 表格列配置
            primaryField: 'orderId',
            columns: [
                { name: 'name', label: '设备名称', sortable: true },
                { name: 'devaddr', label: '设备地址', sortable: true },
                { name: 'objectId', label: '设备id', sortable: true },
                { name: 'createdAt', label: '创建时间', sortable: true },
                { name: 'isEnable', label: '启用设备状态', sortable: true },
                {
                    type: 'operation',
                    label: '操作',
                    width: 200,
                    toggled: true,
                    buttons: [detailsDialog(),  konvaDialog(), deleteDialog()]
                }
            ],
            // --------------------------------------------------------------- 表格工具栏配置
            // bulkActions: [{ label: '批量操作1' }, { label: '批量操作2' }],
            headerToolbar: [
                // { align: 'left', type: 'button', label: '主操作', level: 'primary', size: 'sm' },
                // { align: 'left', type: 'button', label: '次操作', size: 'sm' },
                // { align: 'left', type: 'bulkActions' },
                // { align: 'right', type: 'columns-toggler' },
                // { align: 'right', type: 'filter-toggler' },
                // { align: 'right', type: 'drag-toggler' },
                // { align: 'right', type: 'export-csv' },
                // { align: 'right', type: 'export-excel' }
            ],
            footerToolbar: [
                // {align: "right", type: "load-more"},
                { align: 'left', type: 'switch-per-page' },
                { align: 'left', type: 'pagination' },
                { align: 'left', type: 'statistics' }
            ]
        }
    ]
};

export { schema };
