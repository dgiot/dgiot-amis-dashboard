import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import {FormatTime,getTime } from '@/utils/utils'
//36d6cc689d 工艺流程
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
                    ctt.code = "GYB"+new Date().getTime()
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
                        "name": `工艺流程_name_${new Date().getTime()}`,
                        "profile": {},
                        "route": {},
                        product: {
                          className: "Product",
                          objectId: "36d6cc689d",
                          __type: "Pointer"
                        }
                      }
                    };
                  },
                },
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
            name: 'content.proname',
            type: 'input-text', //'select',
            label: '工艺名称',
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
          {
            name: 'devaddr',
            type: 'input-text', //nested-select
            label: '计划编号',
            value:`GYB${new Date().getTime()}`,
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
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
            name: 'content.fin_product',
            type: 'input-text', //nested-select
            label: '选择成品',
            // labelField: 'label',
            // valueField: 'label',
            // selectMode: "tree",
            // source: "/usemock/getgongyi",
            required: true
          },
          {
            name: 'content.step',
            type: 'input-text',
            label: '工序',
            required: true
          },
          {
              mode: 'inline',
              name: 'title1',
              type: 'static',
              label: '工序清单',
              // value: '',
              labelClassName: 'text-lg p-md font-bold'
          },
          {
              type: "crud",
              api: "/usemock/keystep", //"/usemock/device/listAll",
              syncLocation: false,
              name: 'detail',
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
                              // api: {
                              //     method: 'delete',
                              //     url: '/iotapi/amis/Device/${objectId}',
                              //     headers:{
                              //         sessionToken:Cookies.get('authorization')
                              //     }
                              // },
                              // api: "delete:/amis/api/mock2/sample/${id}"
                          }
                      ]
                  }
              ]
          }
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
    parent: '36d6cc689d'
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
              label: '工艺流程管理',
              labelClassName: 'text-lg p-md font-bold'
            }
          ],
          columnClassName: 'bg-white'
        },
        {
          body: [
            created(),
            // {
            //   icon: 'fa fa-plus pull-left',
            //   type: 'button',
            //   // actionType: 'dialog',
            //   label: '新建',
            //   level: 'primary',
            //   className: 'm-b-sm',
            //   drawer: {
            //     closeOnEsc: true,
            //     // api: '/usemock/device/listAll',
            //     actions: [
            //       {
            //         label: "取消",
            //         actionType: "close",
            //         type: "button"
            //       },
            //       {
            //         label: "提交",
            //         actionType: "confirm",
            //         type: "button",
            //         level: "primary"
            //       },
            //     ],
            //     body: {
            //       api: {
            //         method: 'post',
            //         url: '/iotapi/amis/Device',

            //         // headers: {
            //         //     sessionToken: Cookies.get('authorization')
            //         // },
            //         requestAdaptor: function (api: any) {
            //           return {
            //             ...api,
            //             data: {
            //               ...api.data, // 获取暴露的 api 中的 data 变量
            //               //   foo: 'bar' // 新添加数据
            //               "ACL": {
            //                 "role:开发者": {
            //                   "read": true,
            //                   "write": true
            //                 }
            //               },
            //               "detail": {
            //                 payout: "未派发"
            //               },
            //               "devaddr": `工厂_devaddr_${new Date().getTime()}`,
            //               "isEnable": true,
            //               "name": `工厂_name_${new Date().getTime()}`,
            //               "profile": {},
            //               "route": {},
            //               product: {
            //                 className: "Product",
            //                 objectId: "36d6cc689d",
            //                 __type: "Pointer"
            //               }
            //             }
            //           };
            //         },
            //         // requestAdaptor: function (api: any) {
            //         //     return {
            //         //         ...api.data,
            //         //         data: {
            //         //             content: { ...api.data.content },
            //         //             "ACL": {
            //         //                 "*": {
            //         //                     "read": true,
            //         //                     "write": false
            //         //                 }
            //         //             },
            //         //             "detail": {},
            //         //             "devaddr": `工厂_devaddr_${new Date().getTime()}`,
            //         //             "isEnable": true,
            //         //             "name": `工厂_name_${new Date().getTime()}`,
            //         //             "profile": {},
            //         //             "route": {},
            //         //         }
            //         //     }
            //         // },
            //       },
            //       // "closeOnEsc": true,
            //       // mode: "normal",
            //       body: [
            //         {
            //           name: 'content.material',
            //           type: 'select',
            //           label: '产出物料',
            //           searchable: true,
            //           // source: "/usemock/getWuliao",
            //           source: {
            //             method: "get",
            //             url: '/iotapi/amis/Dict',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
            //             convertKeyToPath: true,
            //             data: whereData,

            //             responseData: {
            //               options: "${items|pick:label~data.name,value~data}"
            //             }
            //           },
            //           // deferApi: "/usemock/device/listAll",
            //           required: false
            //         },
            //         {
            //           name: 'content.code',
            //           type: 'input-text',
            //           label: '唯一码',
            //           required: true
            //         },
            //         {
            //           type: 'custom',
            //           name: 'content.code',
            //           label: '',
            //           onMount: (dom: any, value: any, onChange: any, props: any) => {
            //             const button = document.createElement('button');
            //             let video = null;
            //             // let canvas = null;
            //             // let canvasElement = null;
            //             video = document.createElement('video');
            //             // canvasElement = document.getElementById('canvas');
            //             // canvas = canvasElement.getContext('2d');
            //             button.style.backgroundColor = "#ff0000"
            //             button.innerText = '扫码';
            //             button.onclick = event => {
            //               let video = null;
            //               video = document.createElement('video');
            //               let data = "11111"
            //               onChange(data); // 这个 onChange 方法只有放在表单项中才能调用
            //               const code = document.getElementsByName("content.code")[0];
            //               console.log("这是code", code);
            //               console.log("navigator", navigator);

            //               navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "environment" } }).then(function (stream) {
            //                 console.log(stream);

            //               })
            //               // code.value = '2222';
            //               // let e = document.createEvent('HTMLEvents');
            //               // e.initEvent("input", true, true);
            //               // let e = new Event('change');
            //               // // e.eventType = 'message';
            //               // code.dispatchEvent(e);

            //               // // 原文链接：https://blog.csdn.net/l198738655/article/details/107026783
            //               event.preventDefault();
            //             };
            //             dom.appendChild(button);
            //           }
            //         },
            //         {
            //           name: 'content.step',
            //           type: 'nested-select',
            //           label: '工艺步骤',
            //           labelField: 'label',
            //           valueField: 'value',
            //           selectMode: "tree",
            //           // source: "/usemock/getgongyi",
            //           source: {
            //             method: "post",
            //             url: '/iotapi/tree',  //"/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
            //             // headers: {
            //             //     sessionToken: Cookies.get('authorization')
            //             // },
            //             data: {
            //               class: "Device",
            //               filter: "{\"keys\":[\"parentId\",\"name\"]}",
            //               parent: "parentId"
            //             },
            //             adaptor: function (payload: any, response: any, api: any) {
            //               return {
            //                 ...payload,
            //                 status: 0,
            //                 msg: 'ok'
            //               };
            //             },
            //             responseData: {
            //               options: "${rows|pick:label~objectId,value~objectId,children~children}"
            //             }
            //           },
            //           required: true
            //         },
            //         // {
            //         //     name: 'step',
            //         //     type: 'chained-select',
            //         //     label: '工艺步骤',
            //         //     selectMode: "tree",
            //         //     leftMode: "tree",
            //         //     options: "${items}",
            //         //     source: {
            //         //         method: "get",
            //         //         url: "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
            //         //         data: {
            //         //             skip: 0,
            //         //             limit: 20,
            //         //             // keys: "objectId,title",
            //         //             order: "-createdAt",
            //         //             where: { 
            //         //                 "type": "technology",
            //         //                 "dict":"${value|default:undefined}"

            //         //         }
            //         //             // "myName": "${name|default:undefined}",
            //         //             //    'where.dict': '15166',

            //         //         },
            //         //         responseData: {
            //         //             options: "${items|pick:label~data.title,value~objectId}"
            //         //         }

            //         //     },
            //         //     deferApi: "/amis/api/mock2/form/departUser?ref=${ref}&dep=${value}",
            //         //     required: true
            //         // },
            //         {
            //           name: 'content.product',
            //           type: 'nested-select',
            //           label: '生产单元',
            //           labelField: 'label',
            //           valueField: 'label',
            //           source: {
            //             method: "get",
            //             url: '/iotapi/roletree', //'/iotapi/amis/_Role', 
            //             data: {},
            //             adaptor: function (payload: any, response: any, api: any) {
            //               return {
            //                 ...payload,
            //                 status: 0,
            //                 msg: 'ok'
            //               };
            //             },
            //             responseData: {
            //               options: "${rows|pick:label~label,value~label,children~children}"
            //             }
            //           },
            //           required: true
            //         },
            //         {
            //           name: 'content.starttime',
            //           type: 'input-datetime',
            //           minDate: '${starttime}',
            //           placeholder: '起始时间',
            //           label: '起始时间',
            //           inputClassName: 'w-md',
            //           value: "now",
            //           format: "YYYY-MM-DD hh:mm:ss",
            //           required: true
            //         },
            //         {
            //           name: 'content.endtime',
            //           type: 'input-datetime',
            //           maxDate: '${endtime}',
            //           placeholder: '结束时间',
            //           label: '结束时间',
            //           inputClassName: 'w-md',
            //           value: "+1day",
            //           format: "YYYY-MM-DD hh:mm:ss",
            //           required: true
            //         },
            //         {
            //           name: 'content.number',
            //           type: 'input-text',
            //           label: '数量',
            //           value: '1',
            //           required: true
            //         },
            //       ],
            //       type: 'form'
            //     },
            //     title: '产出信息'
            //   }
            // },
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
                where: { "product": "36d6cc689d" }
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
                  name: 'content.proname',
                  label: '工艺名称',
                },
                {
                  name: 'content.code',
                  label: '工艺编号',

                },
                {
                  name: 'content.starttime',
                  label: '创建时间'
                },
                {
                  name: 'content.step',
                  label: '工序'
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
  // bodyClassName: 'bg-light'
};
export {
  schema
  // ,
  // amisPageName
};
