import classnames from 'classnames';
import Cookies from 'js-cookie';
import { FormClassName } from '@/amis-types';
import { FormatTime, getTime, getRoleId, getUserName } from '@/utils/utils'
// import { getTreeParents, getRoleId, getDepartmentId, getnowTime } from '@/utils/utils'
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
    label: '入库',
    level: 'success',
    // size: 'xs',
    actionType: 'dialog',
    dialog: {
      // size: 'xs',
      title: '入库',
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
          url: "/iotapi/amis/Device1/${objectId}", ///${objectId}
          requestAdaptor: function (api: any) {
            console.log('api数据查看', api.data);
            let setAcl = api.data.ACL
            for (let i in setAcl) {
              if (i != getRoleId() && setAcl[i].write && setAcl[i].write == true) {
                setAcl[i].write = false
                // console.log('替换成功');
              }
            }
            setAcl[api.data.dept.objectId] = {
              "read": true,
              "write": true
            }
            let ctt = api.data.content
            let nowpeople = ''
            for (let o in ctt.pinfo) {
              if (o != 'people') {
                nowpeople = nowpeople + ctt.pinfo[o]
                // console.log('替换成功');
              }
            }
            ctt.pinfo.people = nowpeople

            ctt.fqinfo.opinion = api.data.objection
            ctt.fqinfo.isaudit = api.data.isaudit

            //保存添加审核员意见信息
            ctt.personel = api.data.dept
            let list = ctt.personlist
            list.push(api.data.dept)
            ctt.personlist = list
            // console.log('setAcl', setAcl);
            // 合并录入数据
            let infosList:any = []
            ctt.fqinfo.taskList.forEach((info: any, index: Number) => {
              let newobj = {}
              let scinfo = {}
              let yrinfo = {}
              ctt.taskList?.forEach((e: any) => {
                if (e.pronumber == info.pronumber) {
                  // let obj = {}
                  scinfo = e
                  return
                  // console.log('newobj', newobj)

                }
              });
              ctt.yrinfo?.taskList?.forEach((e: any) => {
                if (e.pronumber == info.pronumber) {
                  yrinfo = e
                  return
            
                }
              });
              let obj =  Object.assign(newobj,info,scinfo,yrinfo)
              // console.log('info', obj);
              infosList.push(obj)

            });
            console.log('infosList',infosList);
            
            return {
              ...api,
              data: {
                "ACL": setAcl,
                content: ctt
                // "detail": {
                //   payout: "已派发"
                // },
                // // "devaddr": `G${new Date().getTime()}`,
                // "isEnable": true,
                // "name": `G${new Date().getTime()}`,
                // "profile": {},
                // "route": {},
                // product: {
                //   className: "Product",
                //   objectId: "d5f1b2dcd8",
                //   __type: "Pointer"
                // }

              }
            };
          },
        },
        controls: [
          { type: 'static', name: 'content', label: '唯一码', visibleOn: "false" },
          { name: 'ACL', type: 'input-text', visibleOn: "false", label: '权限' },
          {
            "label": "审核",
            "type": "select",
            "name": "isaudit",
            "options": [
              {
                "label": "合格",
                "value": "合格"
              },
              {
                "label": "不合格",
                "value": "不合格"
              }
            ],
            required: true
          },
          {
            label: '审核意见',
            type: 'input-text',
            name: 'objection',
            value: '合格通过'
          },
          {
            name: 'dept',
            type: 'nested-select',
            label: '派发人员',
            // labelField: 'label',
            // valueField: 'value',
            selectMode: "tree",
            // source: "/usemock/getgongyi",
            source: {
              method: "get",
              url: '/usemock/usertree', //'/iotapi/roletree',  // /usemock/usercrtree "/iotapi/amis/Dict", //"/iotapi/classes/Dict", 
              // headers: {
              //     sessionToken: Cookies.get('authorization')
              // },
              // data: {},
              adaptor: function (payload: any, response: any, api: any) {
                console.log("payloadtree", payload);
                // payload.data.options =  getTreeParents(payload.data.options)
                console.log("转换树options", payload.data.options);
                return {
                  ...payload,
                  status: 0,
                  msg: 'ok'
                };
              },
              responseData: {
                options: "${options|pick:label~label,value~value,children~children}"
              }
            },
            required: true
          },
          // { type: 'text', name: 'content.mynumber', label: '派发数量' },
        ]
      }
    },
    visibleOn: "content.fqinfo.isstart=='已完成'"
  };
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
              label: '分切管理',
              labelClassName: 'text-lg p-md font-bold'
            }
          ],
          columnClassName: 'bg-white'
        },
        {
          body: [
            // created(),
            {
              type: 'crud',
              mode: 'table',
              api: {
                method: 'get',
                url: `/iotapi/classes/Device`,
                adaptor: function (payload: any, response: any, api: any) {
                  console.log("payloadtree", payload);
                  // let options =  getuserList(payload.data.rows)
                  // console.log('fasfaf',options);

                  // payload.data.options =  getTreeParents(payload.data.options)
                  // console.log("转换树options", payload.data.options);
                  return {
                    // ...payload,
                    data: {
                      count: payload.data.count,
                      rows: payload.data.rows
                    },
                    status: 0,
                    msg: 'ok'
                  };
                },
                // responseData: {
                //   "$": "$$",
                //   count: '${total}',
                //   rows: '${items}'
                // }
              },
              defaultParams: {
                skip: 0,
                limit: 10,
                order: '-createdAt',
                count: 'objectId',
                where: {
                  "product": "d5f1b2dcd8", // "d5f1b2dcd8", 
                  "detail.payout": "已派发",
                  "content.c_process": '分切车间'
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
                    placeholder: '按工单编号查询'
                  },
                  // {
                  //   name: 'starttime',
                  //   type: 'input-datetime',
                  //   minDate: '${starttime}',
                  //   placeholder: '起始时间',
                  //   inputClassName: 'w-md',
                  //   format: "YYYY-MM-DD hh:mm:ss"
                  // },
                  // {
                  //   name: 'endtime',
                  //   type: 'input-datetime',
                  //   maxDate: '${endtime}',
                  //   placeholder: '结束时间',
                  //   inputClassName: 'w-md',
                  //   format: "YYYY-MM-DD hh:mm:ss"
                  // },
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
              // rowClassNameExpr: "<%= data.detail.payout !=='已派发'? 'bg-light' : '' %>",
              columns: [

                {
                  name: 'devaddr',
                  label: '工单编号',
                },
                {
                  name: 'content.personel.label',
                  label: '负责人',
                },
                {
                  name: 'content.product',
                  label: '产品名称'
                },
                {
                  name: 'content.number',
                  label: '生产计划数',
                },
                {
                  name: 'content.fqinfo.compnum',
                  label: '完成数量'
                },
                // {
                //   name: 'content.out_number',
                //   label: '产出数量'
                // },
                // {
                //   name: 'content.fail_number',
                //   label: '不合格数量'
                // },
                {
                  name: 'content.fqinfo.isstart',
                  label: '工单生产状态'
                },
                // {
                //   name: 'content.out_sche',
                //   label: '生产进度'
                // },
                {
                  name: 'content.starttime',
                  label: '计划开工时间'
                },
                {
                  name: 'content.endtime',
                  label: '计划完工时间'
                },
                {
                  name: 'content.mhour',
                  label: '工长'
                },
                {
                  name: "content.fqinfo.isaudit",
                  label: "审核状态",
                  type: "mapping",
                  map: {
                    "待审核": "<span class='label label-info'>待审核</span>",
                    "合格": "<span class='label label-success'>合格</span>",
                    "不合格": "<span class='label label-danger'>不合格</span>",
                  }
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
                          body: [
                            {
                              name: 'devaddr',
                              type: 'static',
                              label: '订单编号',
                              // required: true,
                              // disabledOn: "false"
                            },
                            {
                              name: 'content.material.name',
                              type: 'static', //'select',
                              label: '产出物料',
                              searchable: true,
                              extractValue: true,
                              // required: true
                            },
                            {
                              name: 'content.step',
                              type: 'static', //nested-select
                              label: '工艺步骤',
                              // value: "content.step",
                              labelField: 'label',
                              valueField: 'label',
                              selectMode: "tree",
                              // source: "/usemock/getgongyi",
                              required: true
                            },
                            {
                              name: 'content.number',
                              type: 'static',
                              // value: "${content.material}",
                              label: '计划生产数量',
                            },
                            {
                              name: 'content.compnum',
                              type: 'static',
                              // value: "${content.material}",
                              label: '实际生产数量',
                            },
                            {
                              name: 'content.isstart',
                              type: 'static',
                              // value: "${content.material}",
                              label: '任务状态',
                            },
                            {
                              name: 'content.starttime',
                              type: 'static',
                              label: '任务开始时间',
                            },
                            {
                              name: 'content.endtime',
                              type: 'static',
                              label: '任务结束时间',
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
                              source: '${content.fqinfo.taskList}',
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
                                  name: "date",
                                  label: "日期",
                                  groupName: "${devaddr}"
                                },
                                {
                                  name: "desc",
                                  label: "品名",
                                  groupName: "${devaddr}"
                                }
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
              headerToolbar: [],
              footerToolbar: [
                "switch-per-page",
                {
                  align: 'left',
                  type: 'pagination'
                },
                { align: 'left', type: 'statistics' }
              ],
              alwaysShowPagination: true,
              perPageAvailable: [10, 20, 50, 100],
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
