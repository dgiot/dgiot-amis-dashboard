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
                                            source: "/usemock/getWuliao",
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
                                data: {
                                    // "skip": "${page}",
                                    // "limit": "${perPage}",
                                    // "count": "objectId"
                                },
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
                                        inputClassName: 'w-md'
                                    },
                                    {
                                        name: 'endtime',
                                        type: 'input-datetime',
                                        maxDate: '${endtime}',
                                        placeholder: '结束时间',
                                        inputClassName: 'w-md'
                                    },
                                    {
                                        type: 'button',
                                        label: '查询',
                                        level: 'primary',
                                        actionType: 'submit'
                                    }
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
                                                            type: 'input-text',
                                                            label: 'Engine'
                                                        },
                                                        {
                                                            name: 'browser',
                                                            type: 'input-text',
                                                            label: 'Browser'
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
