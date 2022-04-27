import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
// 详情对话框
function detailsDialog() {
    return {
        type: 'button',
        label: '查看',
        level: 'info',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            title: '查看关键工艺参数 ',
            closeOnEsc: true,
            actions: [{ type: 'button', label: '关闭', level: 'primary', actionType: 'close' }],
            body: {
                type: 'service',
                api: '/usemock/keystep',
                className: classnames(FormClassName.label5x),
                body: [
                    {
                        type: "table",
                        title: "工艺参数",
                        source: "$list",
                        style: "hieght:150px",
                        columns: [
                            {
                                name: "name",
                                label: "参数名称",
                                width: 80
                            },
                            {
                                name: "value",
                                label: "参数值",
                                width: 80
                            }
                        ]
                    }
                ]
            }
        }
    };
}
const whereData = {
    // skip: 0,
    // limit: 20,
    keys: "objectId,title,data",
    // order: "-createdAt",
    where: {
        dict: 'bb7d4be836'
    }

}
const schema = {
    type: 'page',
    body: [
        {
            type: 'grid',
            columns: [
                {
                    md: 12,
                    body: [
                        {
                            mode: 'inline',
                            name: 'title',
                            type: 'static',
                            label: '生产报工',
                            labelClassName: 'text-lg p-md font-bold'
                        }
                    ],
                    columnClassName: 'bg-white'
                },
                {
                    body: [
                        {
                            icon: 'fa fa-plus pull-left',
                            type: 'button',
                            actionType: 'dialog',
                            label: '新建',
                            level: 'primary',
                            className: 'm-b-sm',
                            dialog: {
                                closeOnEsc: true,
                                api: '/usemock/device/listAll',
                                actions: [
                                    {
                                        label: "取消",
                                        actionType: "close",
                                        type: "button"
                                    },
                                    {
                                        label: "提交",
                                        actionType: "confirm",
                                        type: "button",
                                        level: "primary"
                                    },
                                ],
                                body: {
                                    api: 'post:/amis/api/mock2/sample',
                                    // "closeOnEsc": true,
                                    // mode: "normal",
                                    body: [
                                        {
                                            name: 'engine',
                                            type: 'select',
                                            label: '产出物料',
                                            searchable: true,
                                            // source: "/usemock/getWuliao",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: whereData,
                                                // requestAdaptor:function (api:any){
                                                //     return {
                                                //         ...api.data,
                                                //         data:{
                                                //             ...api.data,
                                                //             where:{
                                                //                 "type":"metaData"
                                                //                 }
                                                //         }
                                                //     }
                                                // },
                                                // adaptor:"return {\n    ...payload,\n status: 0 \n,msg:'ok'}",
                                                // Adaptor: function (payload:any, response:any, api:any) {
                                                //     return {
                                                //       ...payload,
                                                //        data: {
                                                //         // ...payload, // 获取暴露的 api 中的 data 变量
                                                //         where:{
                                                //             "type":"metaData"
                                                //         }
                                                //        }
                                                //     };
                                                //   },
                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data.code}"
                                                }
                                            },
                                            // deferApi: "/usemock/device/listAll",
                                            required: true
                                        },
                                        {
                                            name: 'code',
                                            type: 'input-text',
                                            label: '唯一码',
                                            required: true
                                        },
                                        {
                                            name: 'step',
                                            type: 'nested-select',
                                            label: '工艺步骤',
                                            selectMode: "tree",
                                            source: "/usemock/getgongyi",
                                            required: true
                                        },
                                        // {
                                        //     name: 'step',
                                        //     type: 'chained-select',
                                        //     label: '工艺步骤',
                                        //     selectMode: "tree",
                                        //     leftMode: "tree",
                                        //     options: "${items}",
                                        //     source: {
                                        //         method: "get",
                                        //         url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                        //         data: {
                                        //             skip: 0,
                                        //             limit: 20,
                                        //             // keys: "objectId,title",
                                        //             order: "-createdAt",
                                        //             where: { 
                                        //                 "type": "technology",
                                        //                 "dict":"${value|default:undefined}"
                                                
                                        //         }
                                        //             // "myName": "${name|default:undefined}",
                                        //             //    'where.dict': '15166',

                                        //         },
                                        //         responseData: {
                                        //             options: "${items|pick:label~data.title,value~objectId}"
                                        //         }

                                        //     },
                                        //     deferApi: "/amis/api/mock2/form/departUser?ref=${ref}&dep=${value}",
                                        //     required: true
                                        // },
                                        {
                                            name: 'product',
                                            type: 'nested-select',
                                            label: '生产单元',
                                            labelField:'label',
                                            valueField:'objectId',
                                            source: {
                                                method: "get",
                                                url:  '/iotapi/roletree', //'/iotapi/amis/_Role', 
                                                data:{},
                                                adaptor: function (payload:any, response:any, api:any) {
                                                    return {
                                                      ...payload,
                                                      status:0,
                                                       msg:'ok'
                                                    };
                                                  },
                                                responseData: {
                                                    options: "${rows|pick:label~label,value~objectId,children~children}"
                                                }
                                            },
                                            required: true
                                        },
                                        {
                                            name: 'starttime',
                                            type: 'input-datetime',
                                            minDate: '${starttime}',
                                            placeholder: '起始时间',
                                            label: '起始时间',
                                            inputClassName: 'w-md',
                                            format: "YYYY-MM-DD hh:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'endtime',
                                            type: 'input-datetime',
                                            maxDate: '${endtime}',
                                            placeholder: '结束时间',
                                            label: '结束时间',
                                            inputClassName: 'w-md',
                                            format: "YYYY-MM-DD hh:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'number',
                                            type: 'input-text',
                                            label: '数量',
                                            required: true
                                        },
                                    ],
                                    type: 'form'
                                },
                                title: '产出信息'
                            }
                        },
                        {
                            type: 'crud',
                            mode: 'table',
                            api: {
                                url: '/usemock/device/listAll',
                                // data: {
                                //     // "skip": "${page}",
                                //     // "limit": "${perPage}",
                                //     // "count": "objectId"
                                // },
                                // "adaptor": "return {\n    ...payload,\n    count:payload.count,\n results:payload.results \n}",

                                responseData: {
                                    // "$":"$$",
                                    count: '${count}',
                                    rows: '${list}'
                                }
                            },
                            // "source":"${results}",
                            perPage: 10,
                            filter: {
                                body: [
                                    {
                                        mode: 'inline',
                                        name: 'keywords',
                                        size: 'md',
                                        type: 'input-text',
                                        placeholder: '按物料代码/唯一码查询'
                                    },
                                    {
                                        name: 'starttime',
                                        type: 'input-datetime',
                                        minDate: '${starttime}',
                                        placeholder: '起始时间',
                                        inputClassName: 'w-md',
                                        format: "YYYY-MM-DD hh:mm:ss"
                                    },
                                    {
                                        name: 'endtime',
                                        type: 'input-datetime',
                                        maxDate: '${endtime}',
                                        placeholder: '结束时间',
                                        inputClassName: 'w-md',
                                        format: "YYYY-MM-DD hh:mm:ss"
                                    },
                                    // {
                                    //     type: 'button',
                                    //     label: '查询',
                                    //     level: 'primary',
                                    //     actionType: 'submit'
                                    // },
                                    { label: '查询', level: 'primary', type: 'submit', size: 'md' },
                                ],
                                title: '',
                                submitText: ''
                            },
                            columns: [
                                {
                                    name: 'id',
                                    label: '物料'
                                },
                                {
                                    name: 'title',
                                    label: '唯一码'
                                },
                                {
                                    name: 'ntype',
                                    label: '生产开始时间'
                                },
                                {
                                    name: 'createtime',
                                    label: '生产开始时间'
                                },
                                {
                                    name: 'endtime',
                                    label: '生产结束时间'
                                },
                                {
                                    name: 'step',
                                    label: '工艺步骤'
                                },
                                {
                                    name: 'danyuan',
                                    label: '生产单元'
                                },
                                {
                                    name: 'num',
                                    label: '数量'
                                },
                                {
                                    type: 'operation',
                                    label: '关键工艺参数',
                                    width: 100,
                                    buttons: [
                                        detailsDialog()
                                    ]
                                },
                                {
                                    type: 'operation',
                                    label: '操作',
                                    buttons: [
                                        {
                                            type: 'button',
                                            label: '编辑',
                                            drawer: {
                                                body: {
                                                    api: 'post:/amis/api/mock2/sample/${id}',
                                                    body: [
                                                        {
                                                            name: 'engine',
                                                            type: 'select',
                                                            label: '产出物料',
                                                            searchable: true,
                                                            // source: "/usemock/getWuliao",
                                                            source: {
                                                                method: "get",
                                                                url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                                data: {
                                                                    skip: 0,
                                                                    limit: 20,
                                                                    keys: "objectId,title",
                                                                    order: "-createdAt",
                                                                    //    'where.dict': '15166',

                                                                },
                                                                // requestAdaptor:function (api:any){
                                                                //     return {
                                                                //         ...api.data,
                                                                //         data:{
                                                                //             ...api.data,
                                                                //             where:{
                                                                //                 "type":"metaData"
                                                                //                 }
                                                                //         }
                                                                //     }
                                                                // },
                                                                // adaptor:"return {\n    ...payload,\n status: 0 \n,msg:'ok'}",
                                                                // Adaptor: function (payload:any, response:any, api:any) {
                                                                //     return {
                                                                //       ...payload,
                                                                //        data: {
                                                                //         // ...payload, // 获取暴露的 api 中的 data 变量
                                                                //         where:{
                                                                //             "type":"metaData"
                                                                //         }
                                                                //        }
                                                                //     };
                                                                //   },
                                                                responseData: {
                                                                    options: "${results|pick:label~title,value~objectId}"
                                                                }
                                                            },
                                                            // deferApi: "/usemock/device/listAll",
                                                            required: true
                                                        },
                                                        {
                                                            name: 'code',
                                                            type: 'input-text',
                                                            label: '唯一码',
                                                            required: true
                                                        },
                                                        {
                                                            name: 'step',
                                                            type: 'nested-select',
                                                            label: '工艺步骤',
                                                            selectMode: "tree",
                                                            source: "/usemock/getgongyi",
                                                            required: true
                                                        },
                                                        {
                                                            name: 'browser',
                                                            type: 'input-text',
                                                            label: '生产单元',
                                                            required: true
                                                        },
                                                        {
                                                            name: 'starttime',
                                                            type: 'input-datetime',
                                                            minDate: '${starttime}',
                                                            placeholder: '起始时间',
                                                            label: '起始时间',
                                                            inputClassName: 'w-md',
                                                            required: true
                                                        },
                                                        {
                                                            name: 'endtime',
                                                            type: 'input-datetime',
                                                            maxDate: '${endtime}',
                                                            placeholder: '结束时间',
                                                            label: '结束时间',
                                                            inputClassName: 'w-md',
                                                            required: true
                                                        },
                                                        {
                                                            name: 'number',
                                                            type: 'input-text',
                                                            label: '数量',
                                                            required: true
                                                        },
                                                        {
                                                            mode: 'inline',
                                                            name: 'title1',
                                                            type: 'static',
                                                            label: '关键工艺参数',
                                                            value: '',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            api: "/usemock/keystep", //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            columns: [

                                                                {
                                                                    name: "name",
                                                                    label: "参数名称"
                                                                },
                                                                {
                                                                    name: "value",
                                                                    label: "参数值"
                                                                },
                                                                {
                                                                    type: "operation",
                                                                    label: "操作",
                                                                    buttons: [
                                                                        {
                                                                            label: "删除",
                                                                            type: "button",
                                                                            actionType: "ajax",
                                                                            level: "danger",
                                                                            confirmText: "确认要删除？",
                                                                            api: "delete:/amis/api/mock2/sample/${id}"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    type: 'form',
                                                    initApi: '/amis/api/mock2/sample/${id}'
                                                },
                                                title: '新增表单'
                                            },
                                            actionType: 'drawer'
                                        },
                                        {
                                            api: 'delete:/amis/api/mock2/sample/${id}',
                                            type: 'button',
                                            label: '删除',
                                            level: 'danger',
                                            actionType: 'ajax',
                                            confirmText: '确认要删除？'
                                        }
                                    ]
                                }
                            ],
                            headerToolbar: [],
                            footerToolbar: [
                                {
                                    type: 'tpl',
                                    tpl: '定制内容示例：当前有 ${count} 条数据。',
                                    className: 'v-middle'
                                },
                                {
                                    align: 'left',
                                    type: 'pagination'
                                }
                            ],
                            alwaysShowPagination: true,
                            syncLocation: false
                        }
                    ]
                }
            ]
        }
    ],
    style: {
        backgroundColor: ''
    },
    // "initApi": {
    //   "url": "iotapi/classes/Device/parse_objectid",
    //   "method": "get",
    //   "adaptor": "return {\r\n  \"status\":0,\r\n  \"msg\":\"\",\r\n  \"data\":response.data.basedata\r\n  }",
    //   "headers": {
    //     "store": "localStorage",
    //     "dgiotReplace": "parse_objectid"
    //   },
    //   "dataType": "json"
    // },
    messages: {}
    // bodyClassName: 'bg-light'
};
export {
    schema
    // ,
    // amisPageName
};
