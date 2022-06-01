import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import { getTreeParents, getuserList, getRoleId, getDepartmentId, getnowTime } from '@/utils/utils'
//生产报工
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
//派发
function distDialog() {
    return {
        type: 'button',
        label: '派发',
        level: 'success',
        // size: 'xs',
        actionType: 'dialog',
        dialog: {
            // size: 'xs',
            title: '派发任务',
            // data: {
            //     '&': '$$',
            // },
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
                    url: "/iotapi/amis/Device/${objectId}", ///${objectId}
                    requestAdaptor: function (api: any) {
                        console.log('api数据查看', api.data);
                        let setAcl = api.data.ACL
                        let index = 0
                        for (let i in setAcl) {
                            if (setAcl[i].write && setAcl[i].write == true) { //i !=getRoleId()&&
                                setAcl[i].write = false
                                // console.log('替换成功');
                            }
                            index++
                        }
                        setAcl[api.data.dept.objectId] = {
                            "read": true,
                            "write": true
                        }
                        console.log('setAcl', setAcl);
                        // setAcl[getRoleId()] = {
                        //     "read": true,
                        //     "write": true
                        // }
                        // setAcl['role:浙江保舒康'] = {
                        //     "read": true,
                        //     "write": false
                        // }
                        // let list = []
                        let ctt = api.data.content
                        let list = ctt.personlist
                        ctt.personel = api.data.dept
                        list.push(api.data.dept)
                        ctt.personlist = list
                        ctt.compnum = 0
                        ctt.isstart = '未开始'
                        // ctt.desc = "收到货,第一时间拆包装,质量非常好,与卖家描述一致,完全超出我的 期望值,包装很仔细"
                        ctt.taskList = []
                        ctt.tag = 1
                        return {
                            ...api,
                            data: {
                                content: ctt, // 获取暴露的 api 中的 data 变量
                                "ACL": setAcl,
                                "detail": {
                                    payout: "已派发",

                                },
                                // "devaddr": `G${new Date().getTime()}`,
                                "isEnable": true,
                                // "name": `G${new Date().getTime()}`,
                                "profile": {},
                                "route": {},
                                product: {
                                    className: "Product",
                                    objectId: "d5f1b2dcd8",
                                    __type: "Pointer"
                                }

                            }
                        };
                    },
                },
                controls: [
                    { type: 'static', name: 'content', label: '唯一码', visibleOn: "false" },
                    { name: 'ACL', type: 'input-text', visibleOn: "false", label: '权限' },
                    // {
                    //     type: 'select', 
                    //     name: 'devaddr',
                    //      label: '派发人员', 
                    //      searchable: true,
                    //     // source: "/usemock/getWuliao",
                    //     source: {
                    //         method: "get",
                    //         url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                    //         convertKeyToPath: true,
                    //         data: whereData,

                    //         responseData: {
                    //             options: "${items | pick:label~data.name, value~data
                    // } "
                    // }
                    //     },
                    // },
                    {
                        name: 'dept',
                        type: 'select', //nested
                        label: '派发人员',
                        // labelField: 'label',
                        // valueField: 'value',
                        selectMode: "tree",
                        // source: "/usemock/getgongyi",
                        source: {
                            method: "get",
                            url: "/iotapi/roleuser", //'/usemock/usertree', //'/iotapi/roletree',  // /usemock/usercrtree "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                            // headers: {
                            //     sessionToken: Cookies.get('authorization')
                            // },
                            data: {
                                where: { "objectId": "259fbc6e7b" },
                                include: true,
                                limit: 50
                            },
                            adaptor: function (payload: any, response: any, api: any) {
                                console.log("payloadtree", payload);
                                let options = getuserList(payload.data.rows)
                                // console.log('fasfaf',options);

                                // payload.data.options =  getTreeParents(payload.data.options)
                                // console.log("转换树options", payload.data.options);
                                return {
                                    data: {
                                        options
                                    },
                                    status: 0,
                                    msg: 'ok'
                                };
                            },
                            // responseData: {
                            //     options: "${options|pick:label~label,value~value,children~children}"
                            // }
                        },
                        required: true
                    },
                    // { type: 'text', name: 'content.mynumber', label: '派发数量' },
                ]
            }
        },
        visibleOn: "detail.payout!=='已派发'"
    };
}

const whereData = {
    // skip: 0,
    // limit: 20,
    keys: "objectId,title,data",
    // order: "-createdAt",
    where: {
        parent: '9470abe2e7'
    }

}
const schema = {
    type: 'page',
    data: {
        "roleId": localStorage.getItem("roleId"),
        "departmentId": localStorage.getItem("departmentId"),
    },
    // "initApi": {
    //   "url": "iotapi/classes/Device/${parse_objectid}",
    //   "method": "get",
    //   "adaptor": "return {\r\n  \"status\":0,\r\n  \"msg\":\"\",\r\n  \"data\":response.data.content\r\n  }",
    //   "headers": {
    //     "store": "localStorage",
    //     "dgiotReplace": "parse_objectid"
    //   },
    //   "dataType": "json"
    // },
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
                            label: '生产计划',
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
                                // api: '/usemock/device/listAll',
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
                                    api: {
                                        method: 'post',
                                        url: '/iotapi/amis/Device1',

                                        // headers: {
                                        //     sessionToken: Cookies.get('authorization')
                                        // },
                                        requestAdaptor: function (api: any) {
                                            let setAcl = {}
                                            console.log("roleid", getRoleId());
                                            setAcl[getRoleId()] = {
                                                "read": true,
                                                "write": true
                                            }
                                            setAcl['role:浙江保舒康'] = {
                                                "read": true,
                                                "write": false
                                            }
                                            console.log('测试', api);
                                            let list = []
                                            let ctt = api.data.content
                                            let person = {
                                                label: localStorage.getItem('nick'),
                                                objectId: getRoleId()
                                            }
                                            list.push(person)
                                            ctt.personlist = list
                                            console.log('image',ctt.image)
                                            return {
                                                ...api,
                                                data: {
                                                    ...api.data, // 获取暴露的 api 中的 data 变量
                                                    //   foo: 'bar' // 新添加数据
                                                    "ACL": setAcl,
                                                    content: ctt,
                                                    "detail": {
                                                        payout: "未派发"
                                                    },
                                                    "devaddr": `GDH${getnowTime()}`,
                                                    "isEnable": true,
                                                    // "name": `GDH${getnowTime()}`,
                                                    "profile": {},
                                                    "route": {},
                                                    product: {
                                                        className: "Product",
                                                        objectId: "d5f1b2dcd8", //"d5f1b2dcd8",
                                                        __type: "Pointer"
                                                    }
                                                }
                                            };
                                        },
                                        // requestAdaptor: function (api: any) {
                                        //     return {
                                        //         ...api.data,
                                        //         data: {
                                        //             content: { ...api.data.content },
                                        //             "ACL": {
                                        //                 "*": {
                                        //                     "read": true,
                                        //                     "write": false
                                        //                 }
                                        //             },
                                        //             "detail": {},
                                        //             "devaddr": `工厂_devaddr_${new Date().getTime()}`,
                                        //             "isEnable": true,
                                        //             "name": `工厂_name_${new Date().getTime()}`,
                                        //             "profile": {},
                                        //             "route": {},
                                        //         }
                                        //     }
                                        // },
                                    },
                                    // "closeOnEsc": true,
                                    // mode: "normal",
                                    body: [
                                        {
                                            name: 'content.material',
                                            type: 'select',
                                            label: '产出物料',
                                            searchable: true,
                                            // source: "/usemock/getWuliao",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: {
                                                    // skip: 0,
                                                    // limit: 20,
                                                    keys: "objectId,title,data",
                                                    //   orderBy: "objectId",
                                                    where: {
                                                        // parent:{
                                                        parent: 'bb7d4be836'
                                                        // }

                                                    }

                                                },

                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data}"
                                                }
                                            },
                                            // deferApi: "/usemock/device/listAll",
                                            required: false
                                        },
                                        {
                                            name: 'content.code',
                                            type: 'select', //input-text
                                            label: '唯一码',
                                            searchable: true,
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: {
                                                    // skip: 0,
                                                    // limit: 20,
                                                    keys: "objectId,title,data",
                                                    //   orderBy: "objectId",
                                                    where: {
                                                        // parent:{
                                                        parent: 'c7d3f249d2'
                                                        // }

                                                    }

                                                },

                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data}"
                                                }
                                            },
                                            // required: true
                                        },
                                        {
                                            type: "input-file",
                                            name: "content.image",
                                            label: "图片上传",
                                            // asBlob:true,
                                            receiver: {
                                                url: '/iotapi/upload',
                                                method: 'post',
                                                adaptor: function (payload: any, response: any, api: any) {
                                                    // // console.log("这是对低代码数据的处理",payload);
                                                    // let data = payload.data.rows[0].data.body[0].options;
                                                    // // console.log("这是对低代码数据的处理",payload,data);
                                                    // payload.data = {} //重新定义data
                                                    // payload.data.options = data;
                                                    // // console.log("这是对低代码数据的处理222",payload);
                                                    // console.log('上传图片',payload,response);
                                                    
                                                    return {
                                                        ...payload,
                                                        status: 0,
                                                        msg: 'ok'
                                                    };
                                                },
                                                // headers: {
                                                //     'content-type': 'multipart/form-data'
                                                //     // sessionToken: Cookies.get('authorization')
                                                // },
                                                // data: {

                                                // }

                                            },
                                            autoFill: {
                                                myUrl: "${path}"
                                              }
                                        },
                                        {
                                          "type": "input-text",
                                          "name": "myUrl",
                                          "label": "url"
                                        },
                                        {
                                            name: 'content.name',
                                            type: 'input-text',
                                            label: '工单名称',
                                            required: true
                                        },
                                        {
                                            name: 'content.desc',
                                            type: 'input-text',
                                            label: '描述',
                                            required: true
                                        },
                                        {
                                            name: 'content.unit',
                                            type: 'select',
                                            label: '计量单位',
                                            searchable: true,
                                            // source: "/usemock/getWuliao",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: {
                                                    // skip: 0,
                                                    // limit: 20,
                                                    keys: "objectId,title,data",
                                                    //   orderBy: "objectId",
                                                    where: {
                                                        // parent:{
                                                        parent: 'e201133194'
                                                        // }

                                                    }
                                                },
                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data}"
                                                }
                                            },
                                            // deferApi: "/usemock/device/listAll",
                                            required: false
                                        },
                                        {
                                            name: 'content.priority',
                                            type: 'select',
                                            label: '优先级',
                                            searchable: true,
                                            // source: "/usemock/getWuliao",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                convertKeyToPath: true,
                                                data: {
                                                    // skip: 0,
                                                    // limit: 20,
                                                    keys: "objectId,title,data",
                                                    //   orderBy: "objectId",
                                                    where: {
                                                        // parent:{
                                                        parent: '5c96f31928'
                                                        // }

                                                    }

                                                },

                                                responseData: {
                                                    options: "${items|pick:label~data.name,value~data}"
                                                }
                                            },
                                            // deferApi: "/usemock/device/listAll",
                                            required: false
                                        },
                                        {
                                            name: 'content.step',
                                            type: 'nested-select',
                                            label: '工艺步骤',
                                            // labelField: 'label',
                                            // valueField: 'label',
                                            selectMode: "tree",
                                            // source: "/usemock/getgongyi",
                                            source: {
                                                method: "get",
                                                url: '/iotapi/relation',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                                                // headers: {
                                                //     sessionToken: Cookies.get('authorization')
                                                // },
                                                data: {
                                                    destClass: "_Role",
                                                    destId: localStorage.getItem("departmentId"),//getRoleId(),
                                                    destField: "views",
                                                    srcClass: "View"
                                                },
                                                adaptor: function (payload: any, response: any, api: any) {
                                                    // console.log("这是对低代码数据的处理",payload);
                                                    let data = payload.data.rows[0].data.body[0].options;
                                                    // console.log("这是对低代码数据的处理",payload,data);
                                                    payload.data = {} //重新定义data
                                                    payload.data.options = data;
                                                    // console.log("这是对低代码数据的处理222",payload);

                                                    return {
                                                        ...payload,
                                                        status: 0,
                                                        msg: 'ok'
                                                    };
                                                },
                                                // responseData: {
                                                //     options: "${results[0].data.body[0]|pick:label~objectId,value~value,children~children}"
                                                // }
                                            },
                                            // required: true
                                        },
                                        // {
                                        //     name: 'content.workshop',
                                        //     type: 'input-text',
                                        //     label: '生产车间'
                                        // },
                                        {
                                            name: 'content.doctime',
                                            type: 'input-date',
                                            // minDate: '${starttime}',
                                            label: '单据日期',
                                            inputClassName: 'w-md',
                                            value: "today",
                                            format: "YYYY-MM-DD", // hh:mm:ss
                                            required: true
                                        },
                                        {
                                            name: 'content.starttime',
                                            type: 'input-datetime',
                                            // maxDate: '${starttime}',
                                            placeholder: '计划开始时间',
                                            label: '计划开始时间',
                                            inputClassName: 'w-md',
                                            value: "now",
                                            format: "YYYY-MM-DD HH:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'content.endtime',
                                            type: 'input-datetime',
                                            maxDate: '${endtime}',
                                            placeholder: '计划结束时间',
                                            label: '计划结束时间',
                                            inputClassName: 'w-md',
                                            value: "+1day",
                                            format: "YYYY-MM-DD HH:mm:ss",
                                            required: true
                                        },
                                        {
                                            name: 'content.number',
                                            type: 'input-number',
                                            label: '数量',
                                            value: 1,
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
                                method: 'get',
                                url: `/iotapi/classes/Device`,
                                // data: {
                                //     // "skip": "${page}",
                                //     // "limit": "${perPage}",
                                //     // "count": "objectId"
                                // },
                                // "adaptor": "return {\n    ...payload,\n    count:payload.count,\n results:payload.results \n}",

                                // responseData: {
                                //     "$": "$$",
                                //     count: '${count}',
                                //     rows: '${rows}'
                                // },
                                adaptor: function (payload: any, response: any, api: any) {
                                    console.log("payloadtree", payload);
                                    // let options =  getuserList(payload.data.rows)
                                    // console.log('fasfaf',options);

                                    // payload.data.options =  getTreeParents(payload.data.options)
                                    // console.log("转换树options", payload.data.options);
                                    return {
                                        data: {
                                            count: payload.data.count,
                                            rows: payload.data.rows
                                        },
                                        status: 0,
                                        msg: 'ok'
                                    };
                                },
                                // adaptor: function (payload: any, response: any, api: any) {
                                //     console.log("payload111111",payload,response);
                                //     // payload.count = payload.items.length

                                //     return {
                                //         ...payload,
                                //         data:{
                                //             count:payload.data.count,
                                //             items:payload.data.rows,
                                //         },
                                //         status: 0,
                                //         msg: 'ok'
                                //     };
                                // }
                            },
                            defaultParams: {
                                skip: 0,
                                limit: 10,
                                order: '-createdAt',
                                // orderBy:'objectId',
                                // orderDir: 'desc',
                                count: 'objectId',
                                where: {
                                    "product": "d5f1b2dcd8", // "d5f1b2dcd8", 
                                }
                            },
                            // "source":"${results}",
                            // perPage: 10,
                            pageField: 'skip',
                            perPageField: 'limit',
                            filter: {
                                body: [
                                    {
                                        mode: 'inline',
                                        name: 'where.devaddr.$regex',
                                        size: 'md',
                                        type: 'input-text',
                                        placeholder: '按单据号查询'
                                    },
                                    {
                                        name: 'where.content.starttime.$gt',
                                        type: 'input-datetime',
                                        // minDate: '${starttime}',
                                        placeholder: '起始时间',
                                        inputClassName: 'w-md',
                                        format: "YYYY-MM-DD hh:mm:ss"
                                    },
                                    {
                                        name: 'where.content.starttime.$lt',
                                        type: 'input-datetime',
                                        // maxDate: '${endtime}',
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
                                    { label: "重置", type: "reset", size: 'md' }
                                ],
                                title: '',
                                submitText: ''
                            },
                            rowClassNameExpr: "<%= data.detail.payout !=='已派发'? 'bg-light' : '' %>",
                            columns: [
                                {
                                    name: 'devaddr',
                                    label: '单据编号',
                                },
                                {
                                    name: 'content.code.code',
                                    label: '单据类型',
                                },
                                {
                                    name: 'content.code.code',
                                    label: '唯一码',
                                },
                                // {
                                //     name: 'content.starttime',
                                //     label: '生产开始时间'
                                // },
                                {
                                    name: 'content.doctime',
                                    label: '单据日期',
                                    width: 100
                                },
                                {
                                    name: 'content.isstart',
                                    label: '单据状态'
                                },
                                {
                                    name: 'content.type',
                                    label: '产品类型'
                                },
                                {
                                    name: 'content.material.code',
                                    label: '物料编码'
                                },
                                {
                                    name: 'content.material.name',
                                    label: '物料名称'
                                },
                                {
                                    name: 'content.basedata.model',
                                    label: '规格型号'
                                },
                                {
                                    name: 'content.workshop',
                                    label: '生产车间'
                                },
                                {
                                    name: 'content.unit.name',
                                    label: '单位'
                                },
                                {
                                    name: 'content.number',
                                    label: '数量'
                                },
                                {
                                    name: 'content.compnum',
                                    label: '已完成'
                                },
                                {
                                    name: 'detail.payout',
                                    label: '业务状态',
                                    width: 80
                                },
                                {
                                    name: 'content.priority.name',
                                    label: '需求优先级'
                                },
                                {
                                    name: 'content.number',
                                    label: '领料状态'
                                },
                                {
                                    name: 'content.step',
                                    label: '工艺步骤'
                                },
                                // {
                                //     name: 'content.product',
                                //     label: '生产单元'
                                // },
                                {
                                    name: 'content.personel.label',
                                    label: '派发人员'
                                },
                                // {
                                //     type: 'operation',
                                //     label: '关键工艺参数',
                                //     width: 100,
                                //     buttons: [
                                //         detailsDialog()
                                //     ]
                                // },
                                {
                                    type: 'operation',
                                    label: '操作',
                                    fixed: 'right',
                                    width: 190,
                                    buttons: [
                                        {
                                            type: 'button',
                                            label: '查看',
                                            drawer: {
                                                body: {
                                                    body: [
                                                        {
                                                            name: 'devaddr',
                                                            type: 'input-text', //'select',
                                                            label: '订单号',
                                                            // searchable: true,
                                                            extractValue: true,
                                                            required: true
                                                        },
                                                        {
                                                            name: 'content.material.name',
                                                            type: 'input-text', //'select',
                                                            label: '产出物料',
                                                            searchable: true,
                                                            extractValue: true,
                                                            required: true
                                                        },
                                                        {
                                                            name: 'content.code.code',
                                                            type: 'input-text',
                                                            label: '唯一码',
                                                            // required: true,
                                                            disabledOn: "${false}"
                                                        },
                                                        {
                                                            name: 'content.step',
                                                            type: 'input-text', //nested-select
                                                            label: '工艺步骤',
                                                            value: "content.step",
                                                            labelField: 'label',
                                                            valueField: 'label',
                                                            selectMode: "tree",
                                                            // source: "/usemock/getgongyi",
                                                            required: true
                                                        },
                                                        {
                                                            name: 'content.starttime',
                                                            type: 'input-text',
                                                            // minDate: '${starttime}',
                                                            // placeholder: '起始时间',
                                                            label: '起始时间',
                                                            // format: "YYYY-MM-DD hh:mm:ss",
                                                            // inputClassName: 'w-md',
                                                            // required: true
                                                        },
                                                        {
                                                            name: 'content.endtime',
                                                            type: 'input-text',
                                                            label: '结束时间',
                                                        },
                                                        {
                                                            name: 'content.number',
                                                            type: 'input-text',
                                                            label: '计划数量',
                                                            required: true
                                                        },
                                                        {
                                                            mode: 'inline',
                                                            name: 'title1',
                                                            type: 'static',
                                                            label: '人员过程',
                                                            value: '',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            source: '${content.personlist}', //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            columns: [
                                                                {
                                                                    name: "objectId",
                                                                    label: "编号",
                                                                },
                                                                {
                                                                    name: "label",
                                                                    label: "姓名"
                                                                },
                                                            ]
                                                        }
                                                    ],
                                                    type: 'form',
                                                    // initApi: '/iotapi/amis/Device/${objectId}'
                                                },
                                                title: '查看'
                                            },
                                            actionType: 'drawer'
                                        },
                                        distDialog(),
                                        {
                                            api: {
                                                method: 'delete',
                                                url: '/iotapi/amis/Device/${objectId}',
                                                headers: {
                                                    sessionToken: Cookies.get('authorization')
                                                }
                                            },
                                            type: 'button',
                                            label: '删除',
                                            level: 'danger',
                                            actionType: 'ajax',
                                            confirmText: '确认要删除？'
                                        },
                                        {
                                            type: 'button',
                                            label: '任务',
                                            level: 'info',
                                            drawer: {
                                                body: {
                                                    body: [

                                                        {
                                                            mode: 'inline',
                                                            name: 'title1',
                                                            type: 'static',
                                                            label: '任务完成详情',
                                                            value: '',
                                                            labelClassName: 'text-lg p-md font-bold'
                                                        },
                                                        {
                                                            type: "crud",
                                                            source: '${content.taskList}',
                                                            // api: "/usemock/keystep", //"/usemock/device/listAll",
                                                            syncLocation: false,
                                                            headerToolbar: [
                                                                "export-excel",
                                                            ],
                                                            columns: [
                                                                {
                                                                    name: "dingdan",
                                                                    label: "订单号",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "pname",
                                                                    label: "品名",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "date",
                                                                    label: "日期",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "long",
                                                                    label: "长",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "width",
                                                                    label: "宽",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "height",
                                                                    label: "高",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "kweight",
                                                                    label: "克重",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "mweight",
                                                                    label: "毛重",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "mweight",
                                                                    label: "接头数",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "check",
                                                                    label: "品检",
                                                                    groupName: "${devaddr}"
                                                                },
                                                                {
                                                                    name: "fenqie",
                                                                    label: "分切",
                                                                    groupName: "${devaddr}"
                                                                },
                                                            ]
                                                        }
                                                    ],
                                                    type: 'form',


                                                },
                                                size: "xl",
                                                title: '查看任务详情'
                                            },
                                            actionType: 'drawer',
                                            visibleOn: "detail.payout=='已派发'"
                                        },
                                    ]
                                }
                            ],
                            headerToolbar: [
                                "export-excel",
                            ],
                            footerToolbar: [
                                // {
                                //     type: 'tpl',
                                //     tpl: '定制内容示例：当前有 ${count} 条数据。',
                                //     className: 'v-middle'
                                // },
                                "switch-per-page",
                                {
                                    align: 'left',
                                    type: 'pagination'
                                },
                                // { align: 'left', type: 'statistics' }
                            ],
                            perPageAvailable: [10, 20, 50, 100, 200],
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

    messages: {}
    // bodyClassName: 'bg-light'
};
console.log('打印schema', schema);

export {
    schema
    // ,
    // amisPageName
};
