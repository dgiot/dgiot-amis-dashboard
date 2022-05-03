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
    "title": "15616",
    data:{
        "objectId":window.location
        },
    "body": [
        {
            "type": "grid",
            "columns": [
                {
                    "type": "panel",
                    "title": "本地配置示例 支持交互${objectId}",
                    "name": "chart-local",
                    "body": [
                        {
                            "type": "chart",
                            "config": {
                                "title": {
                                    "text": "极坐标双数值轴"
                                },
                                "legend": {
                                    "data": [
                                        "line"
                                    ]
                                },
                                "polar": {
                                    "center": [
                                        "50%",
                                        "54%"
                                    ]
                                },
                                "tooltip": {
                                    "trigger": "axis",
                                    "axisPointer": {
                                        "type": "cross"
                                    }
                                },
                                "angleAxis": {
                                    "type": "value",
                                    "startAngle": 0
                                },
                                "radiusAxis": {
                                    "min": 0
                                },
                                "series": [
                                    {
                                        "coordinateSystem": "polar",
                                        "name": "line",
                                        "type": "line",
                                        "showSymbol": false,
                                        "data": [
                                            [
                                                0,
                                                0
                                            ],
                                            [
                                                0.03487823687206265,
                                                1
                                            ],
                                            [
                                                0.06958655048003272,
                                                2
                                            ],
                                            [
                                                0.10395584540887964,
                                                3
                                            ],
                                            [
                                                0.13781867790849958,
                                                4
                                            ],
                                            [
                                                0.17101007166283433,
                                                5
                                            ],
                                            [
                                                0.2033683215379001,
                                                6
                                            ],
                                            [
                                                0.2347357813929454,
                                                7
                                            ],
                                            [
                                                0.26495963211660245,
                                                8
                                            ],
                                            [
                                                0.2938926261462365,
                                                9
                                            ],
                                            [
                                                0.3213938048432697,
                                                10
                                            ]
                                        ]
                                    }
                                ],
                                "animationDuration": 2000
                            },
                            "clickAction": {
                                "actionType": "dialog",
                                "dialog": {
                                    "title": "详情",
                                    "body": [
                                        {
                                            "type": "tpl",
                                            "tpl": "<span>当前选中值 ${value|json}<span>"
                                        },
                                        {
                                            "type": "chart",
                                            "api": "/amis/api/mock2/chart/chart1"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "panel",
                    "title": "远程图表示例(返回值带function)",
                    "className":'fw-b',
                    "name": "chart-remote",
                    "body": [
                        // {
                        //     "type": "chart",
                        //     "api": "/amis/api/mock2/chart/chart1"
                        // }
                        {
                            "type": "chart",
                            "config": {
                              "xAxis": {
                                "data": [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun"
                                ],
                                "type": "category"
                              },
                              "yAxis": {
                                "type": "value"
                              },
                              "series": [
                                {
                                  "data": [
                                    820,
                                    932,
                                    901,
                                    934,
                                    1290,
                                    1330,
                                    1320
                                  ],
                                  "type": "bar"
                                }
                              ]
                            },
                            "replaceChartOption": true
                          }
                    ]
                }
            ]
        },
        {
            "type": "panel",
            "title": "Form+chart组合",
            "body": [
                {
                    "type": "form",
                    "title": "过滤条件",
                    "target": "chart1,chart2",
                    "submitOnInit": true,
                    "className": "m-b",
                    "wrapWithPanel": false,
                    "mode": "inline",
                    "body": [
                        {
                            "type": "input-date",
                            "label": "开始日期",
                            "name": "starttime",
                            "value": "-8days",
                            "maxDate": "${endtime}"
                        },
                        {
                            "type": "input-date",
                            "label": "结束日期",
                            "name": "endtime",
                            "value": "-1days",
                            "minDate": "${starttime}"
                        },
                        {
                            "type": "input-text",
                            "label": "条件",
                            "name": "name",
                            "addOn": {
                                "type": "submit",
                                "label": "搜索",
                                "level": "primary"
                            }
                        }
                    ],
                    "actions": []
                },
                {
                    "type": "divider"
                },
                {
                    "type": "grid",
                    "className": "m-t-lg",
                    "columns": [
                        {
                            "type": "chart",
                            "name": "chart1",
                            "initFetch": false,
                            "api": "/amis/api/mock2/chart/chart?name=$name&starttime=${starttime}&endtime=${endtime}"
                        },
                        {
                            "type": "chart",
                            "name": "chart2",
                            "initFetch": false,
                            "api": "/amis/api/mock2/chart/chart2?name=$name"
                        }
                    ]
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
