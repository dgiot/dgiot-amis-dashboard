import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import {FormatTime,getTime } from '@/utils/utils'
//165b80ab1e 生产工单
// 详情对话框
function detailsDialog() {
  return {
    type: 'button',
    label: '查看',
    level: 'info',
    // size: 'xs',
    actionType: 'dialog',
    dialog: {
      title: '查看关键工艺参数',
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
            console.log(api.data.dept);

            let setAcl = {}
            setAcl['role:' + api.data.dept] = {
              "read": true,
              "write": true
            }
            let ctt = api.data.content
            ctt.personel = api.data.dept
            return {
              ...api,
              data: {
                content: ctt, // 获取暴露的 api 中的 data 变量
                //   foo: 'bar' // 新添加数据
                // "ACL": {
                //     "role:开发者": {
                //         "read": true,
                //         "write": true
                //     }
                // },
                // "content":{

                // },
                "ACL": setAcl,
                "detail": {
                  payout: "已派发"
                },
                "devaddr": `工厂_devaddr_${new Date().getTime()}`,
                "isEnable": true,
                "name": `工厂_name_${new Date().getTime()}`,
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
          { type: 'static', name: 'content.code', label: '唯一码' },
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
            type: 'nested-select',
            label: '派发人员',
            labelField: 'label',
            valueField: 'value',
            selectMode: "tree",
            // source: "/usemock/getgongyi",
            source: {
              method: "get",
              url: '/iotapi/roletree',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
              // headers: {
              //     sessionToken: Cookies.get('authorization')
              // },
              data: {},
              adaptor: function (payload: any, response: any, api: any) {
                return {
                  ...payload,
                  status: 0,
                  msg: 'ok'
                };
              },
              responseData: {
                options: "${rows|pick:label~label,value~objectId,children~children}"
              }
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

//新建
function created(){
  return    {
    type: 'button',
    label: '新建',
    icon: 'fa fa-plus pull-left',
    level: 'primary',
    className: 'm-b-sm',
    drawer: {
      body: {
        api: {
                  method: 'post',
                  url: '/iotapi/amis/Device',

                  // headers: {
                  //     sessionToken: Cookies.get('authorization')
                  // },
                  requestAdaptor: function (api: any) {
                    // let setAcl = {}
                    // setAcl['role:'+api.data.dept] = {
                    //     "read": true,
                    //     "write": true
                    // }
                    let ctt = api.data.content
                    ctt.code = "GDD"+new Date().getTime()
                    ctt.starttime = getTime()
                    return {
                      ...api,
                      data: {
                        ...api.data, // 获取暴露的 api 中的 data 变量
                        //   foo: 'bar' // 新添加数据
                        "ACL": {
                          "role:开发者": {
                            "read": true,
                            "write": true
                          }
                        },
                        // "detail": { 
                        // },
                        "content":ctt,
                        // "devaddr": `GYB${new Date().getTime()}`,
                        "isEnable": true,
                        "name": `生产工单_name_${new Date().getTime()}`,
                        "profile": {},
                        "route": {},
                        product: {
                          className: "Product",
                          objectId: "165b80ab1e",
                          __type: "Pointer"
                        }
                      }
                    };
                  },
                },

        body: [
          {
            mode: 'inline',
            name: 'proplan3',
            type: 'static',
            label: '生产工单',
            // value: '',
            labelClassName: 'text-lg p-md font-bold'
        },
          {
            name: 'devaddr',
            type: 'input-text', //nested-select
            label: '工单编号',
            value:`GDD${new Date().getTime()}`,
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
            required: true
          },
          {
            mode: 'inline',
            name: 'plan1',
            type: 'static',
            label: '生产计划',
            // value: '',
            labelClassName: 'text-lg p-md font-bold'
        },
          {
            name: 'content.proplan',
            type: 'input-text', //'select',
            label: '生产计划',
            // searchable: true,
            // extractValue: true,
            // source: {
            //     method: "get",
            //     url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
            //     data: whereData,

            //     // requestAdaptor:function (api:any){
            //     //     return {
            //     //         ...api.data,
            //     //         data:{
            //     //             ...api.data,
            //     //             where:{
            //     //                 "type":"metaData"
            //     //                 }
            //     //         }
            //     //     }
            //     // },

            //     // Adaptor: function (payload:any, response:any, api:any) {
            //     //     return {
            //     //       ...payload,
            //     //        data: {
            //     //         // ...payload, // 获取暴露的 api 中的 data 变量
            //     //         where:{
            //     //             "type":"metaData"
            //     //         }
            //     //        }
            //     //     };
            //     //   },
            //     responseData: {
            //         options: "${items|pick:label~data.name,value~data}"
            //     }
            // },
            // deferApi: "/usemock/device/listAll",
            required: true
          },
          // {
          //   name: 'content.code',
          //   type: 'input-text',
          //   label: '唯一码',
          //   // required: true,
          //   disabledOn: "${false}"
          // },
          {
            name: 'content.people',
            type: 'input-text', //nested-select
            label: '负责人',
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
            required: true
          },
          {
            name: 'content.starttime',
            type: 'input-datetime',
            minDate: '${starttime}',
            placeholder: '起始时间',
            label: '工单开工时间',
            inputClassName: 'w-md',
            value: "now",
            format: "YYYY-MM-DD hh:mm:ss",
            required: true
        },
        {
            name: 'content.endtime',
            type: 'input-datetime',
            maxDate: '${endtime}',
            placeholder: '结束时间',
            label: '工单完工时间',
            inputClassName: 'w-md',
            value: "+1day",
            format: "YYYY-MM-DD hh:mm:ss",
            required: true
        },
        {
          mode: 'inline',
          name: 'plan2',
          type: 'static',
          label: '生产相关',
          // value: '',
          labelClassName: 'text-lg p-md font-bold'
      },
          {
            name: 'content.product',
            type: 'input-text',
            label: '产品名称',
            required: true
          },
          {
            name: 'content.proid',
            type: 'input-text',
            label: '产品编号',
            required: true
          },
          {
            name: 'content.prospe',
            type: 'input-text',
            label: '产品规格',
            required: true
          },
          {
            name: 'content.unit',
            type: 'input-text',
            label: '单位',
            required: true
          },
          {
            name: 'content.pro_number',
            type: 'input-text',
            label: '生产数量',
          },
          {
            name: 'content.fail_number',
            type: 'input-text',
            label: '不合格数量',
          },
          {
            name: 'content.out_number',
            type: 'input-text',
            label: '产出数量',
          },
          {
            name: 'content.out_status',
            type: 'input-text',
            label: '工单生产状态',
            required: true
          },
          {
            name: 'content.is_over',
            type: 'input-text',
            label: '是否结束',
            required: true
          },
          {
            name: 'content.desc',
            type: 'input-text',
            label: '备注',
            required: true
          },
          {
            name: 'content.out_sche',
            type: 'input-text',
            label: '生产进度',
            value:"0"
          },
        ],
        type: 'form',
        // initApi: '/iotapi/amis/Device/${objectId}'
      },
      title: '新增数据'
    },
    actionType: 'drawer'
  }
}

const whereData = {
  // skip: 0,
  // limit: 20,
  keys: "objectId,title,data",
  // order: "-createdAt",
  where: {
    parent: '165b80ab1e'
  }

}
const schema = {
  type: 'page',
  data: {
    "userid": window.location
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
              label: '生产工单管理',
              labelClassName: 'text-lg p-md font-bold'
            }
          ],
          columnClassName: 'bg-white'
        },
        {
          body: [
            created(),
            {
              type: 'crud',
              mode: 'table',
              api: {
                method: 'get',
                url: `/iotapi/amis/Device`,
                // data: {
                //     // "skip": "${page}",
                //     // "limit": "${perPage}",
                //     // "count": "objectId"
                // },
                // "adaptor": "return {\n    ...payload,\n    count:payload.count,\n results:payload.results \n}",

                responseData: {
                  "$": "$$",
                  count: '${total}',
                  rows: '${items}'
                }
              },
              defaultParams: {
                skip: 1,
                limit: 10, order: '-createdAt',
                count: 'objectId',
                where: { "product": "165b80ab1e" }
              },
              // "source":"${results}",
              // perPage: 10,
              pageField: 'skip',
              perPageField: 'limit',
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
              // rowClassNameExpr: "<%= data.detail.payout !=='已派发'? 'bg-light' : '' %>",
              columns: [
                {
                  name: 'content.proplan',
                  label: '生产计划',
                },
                {
                  name: 'devaddr',
                  label: '工单编号',
                },
                {
                  name: 'content.people',
                  label: '负责人',
                },
                {
                  name: 'content.product',
                  label: '产品名称'
                },
                {
                  name: 'content.pro_number',
                  label: '生产数量'
                },
                {
                  name: 'content.out_number',
                  label: '产出数量'
                },
                {
                  name: 'content.fail_number',
                  label: '不合格数量'
                },
                {
                  name: 'content.out_status',
                  label: '工单生产状态'
                },
                {
                  name: 'content.out_sche',
                  label: '生产进度'
                },
                {
                  name: 'content.starttime',
                  label: '计划开工时间'
                },
                {
                  name: 'content.endtime',
                  label: '计划完工时间'
                },
                {
                  type: 'operation',
                  label: '操作',
                  buttons: [
                    {
                      type: 'button',
                      label: '查看',
                      drawer: {
                        body: {

                          // api: {
                          //     method: 'put',
                          //     url: '/iotapi/amis/Device/${objectId}',

                          //     headers: {
                          //         sessionToken: Cookies.get('authorization')
                          //     },
                          //     requestAdaptor: function (api: any) {
                          //         return {
                          //             ...api,
                          //             data: {
                          //                 ...api.data, // 获取暴露的 api 中的 data 变量
                          //                 //   foo: 'bar' // 新添加数据
                          //                 "ACL": {
                          //                     "role:开发者": {
                          //                         "read": true,
                          //                         "write": true
                          //                     }
                          //                 },
                          //                 "detail": {},
                          //                 "devaddr": `工厂_devaddr_${new Date().getTime()}`,
                          //                 "isEnable": true,
                          //                 "name": `工厂_name_${new Date().getTime()}`,
                          //                 "profile": {},
                          //                 "route": {},
                          //                 product: {
                          //                     className: "Product",
                          //                     objectId: "d5f1b2dcd8",
                          //                     __type: "Pointer"
                          //                 }
                          //             }
                          //         };
                          //     },
                          // },

                          body: [
                            {
                              name: 'content.material.name',
                              type: 'input-text', //'select',
                              label: '产出物料',
                              searchable: true,
                              extractValue: true,
                              // source: {
                              //     method: "get",
                              //     url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
                              //     data: whereData,

                              //     // requestAdaptor:function (api:any){
                              //     //     return {
                              //     //         ...api.data,
                              //     //         data:{
                              //     //             ...api.data,
                              //     //             where:{
                              //     //                 "type":"metaData"
                              //     //                 }
                              //     //         }
                              //     //     }
                              //     // },

                              //     // Adaptor: function (payload:any, response:any, api:any) {
                              //     //     return {
                              //     //       ...payload,
                              //     //        data: {
                              //     //         // ...payload, // 获取暴露的 api 中的 data 变量
                              //     //         where:{
                              //     //             "type":"metaData"
                              //     //         }
                              //     //        }
                              //     //     };
                              //     //   },
                              //     responseData: {
                              //         options: "${items|pick:label~data.name,value~data}"
                              //     }
                              // },
                              // deferApi: "/usemock/device/listAll",
                              required: true
                            },
                            {
                              name: 'content.code',
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
                              name: 'content.product',
                              type: 'input-text',
                              // value: "${content.material}",
                              label: '生产单元',
                              required: true
                            },
                            {
                              name: 'content.starttime',
                              type: 'input-datetime',
                              minDate: '${starttime}',
                              placeholder: '起始时间',
                              label: '起始时间',
                              format: "YYYY-MM-DD hh:mm:ss",
                              inputClassName: 'w-md',
                              required: true
                            },
                            {
                              name: 'content.endtime',
                              type: 'input-datetime',
                              maxDate: '${endtime}',
                              placeholder: '结束时间',
                              label: '结束时间',
                              format: "YYYY-MM-DD hh:mm:ss",
                              inputClassName: 'w-md',
                              required: true
                            },
                            {
                              name: 'content.number',
                              type: 'input-text',
                              label: '数量',
                              required: true
                            },
                            // {
                            //     mode: 'inline',
                            //     name: 'title1',
                            //     type: 'static',
                            //     label: '关键工艺参数',
                            //     value: '',
                            //     labelClassName: 'text-lg p-md font-bold'
                            // },
                            // {
                            //     type: "crud",
                            //     api: "/usemock/keystep", //"/usemock/device/listAll",
                            //     syncLocation: false,
                            //     columns: [

                            //         {
                            //             name: "name",
                            //             label: "参数名称"
                            //         },
                            //         {
                            //             name: "value",
                            //             label: "参数值"
                            //         },
                            //         {
                            //             type: "operation",
                            //             label: "操作",
                            //             buttons: [
                            //                 {
                            //                     label: "删除",
                            //                     type: "button",
                            //                     actionType: "ajax",
                            //                     level: "danger",
                            //                     confirmText: "确认要删除？",
                            //                     api: {
                            //                         method: 'delete',
                            //                         url: '/iotapi/amis/Device/${objectId}',
                            //                         headers:{
                            //                             sessionToken:Cookies.get('authorization')
                            //                         }
                            //                     },
                            //                     // api: "delete:/amis/api/mock2/sample/${id}"
                            //                 }
                            //             ]
                            //         }
                            //     ]
                            // }
                          ],
                          type: 'form',
                          // initApi: '/iotapi/amis/Device/${objectId}'
                        },
                        title: '查看'
                      },
                      actionType: 'drawer'
                    },
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
                    }
                  ]
                }
              ],
              headerToolbar: [],
              footerToolbar: [
                // {
                //     type: 'tpl',
                //     tpl: '定制内容示例：当前有 ${count} 条数据。',
                //     className: 'v-middle'
                // },
                {
                  align: 'left',
                  type: 'pagination'
                },
                { align: 'left', type: 'statistics' }
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

  messages: {}
};
export {
  schema
};
