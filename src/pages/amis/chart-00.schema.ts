const schema = {
    type: 'page',
    toolbar: [
        {
            type: 'container',
            body: [
                {
                    type: 'tpl',
                    tpl: 'dgiot可视化大屏',
                    inline: false,
                    style: {
                        color: '#000000'
                    },
                    wrapperComponent: 'h1',
                    className: 'b-white'
                },
                {
                    type: 'plain',
                    tpl: '',
                    inline: false,
                    className: 'm-lg b-l b-4x b-white',
                    placeholder: '',
                    visibleOn: '',
                    clearValueOnHidden: false,
                    visible: true
                }
            ],
            style: {
                borderColor: '#ffffff',
                opacity: 1,
                textAlign: 'center'
            }
        }
    ],
    body: [
        {
            type: 'container',
            body: [
                {
                    type: 'grid',
                    columns: [
                        {
                            body: [
                                {
                                    type: 'chart',
                                    config: {
                                        series: [
                                            {
                                                data: [120],
                                                type: 'gauge'
                                            }
                                        ],
                                        title: {
                                            text: '室外湿度',
                                            left: 'center'
                                        }
                                    },
                                    replaceChartOption: true,
                                    style: {
                                        width: '300px',
                                        height: '300px'
                                    }
                                },
                                {
                                    type: 'plain',
                                    tpl: '耗电量',
                                    inline: false,
                                    className: 'm-md p-md'
                                },
                                {
                                    type: 'chart',
                                    config: {
                                        xAxis: {
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value'
                                        },
                                        series: [
                                            {
                                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                                type: 'bar'
                                            }
                                        ]
                                    },
                                    replaceChartOption: true
                                }
                            ],
                            md: 'auto',
                            columnClassName: 'b-info b-t b-b b-2x b-l',
                            valign: 'top'
                        },
                        {
                            body: [
                                {
                                    type: 'container',
                                    body: [
                                        {
                                            type: 'grid',
                                            columns: [
                                                {
                                                    body: [
                                                        {
                                                            type: 'chart',
                                                            config: {
                                                                series: [
                                                                    {
                                                                        data: [120],
                                                                        type: 'gauge'
                                                                    }
                                                                ],
                                                                title: {
                                                                    text: '室内湿度',
                                                                    left: 'center'
                                                                }
                                                            },
                                                            replaceChartOption: true,
                                                            className: 'p-xs m-xs b-2x',
                                                            style: {
                                                                width: '300px',
                                                                height: '300px'
                                                            }
                                                        },
                                                        {
                                                            type: 'plain',
                                                            tpl: '订单实时轮播',
                                                            inline: false,
                                                            className: 'm-md p-md'
                                                        },
                                                        {
                                                            type: 'carousel',
                                                            options: [
                                                                {
                                                                    image: 'https://baidu.gitee.io/amis/static/photo/bd3eb13533fa828b13b24500f31f4134960a5a44_81bbc2d.jpg'
                                                                },
                                                                {
                                                                    image: 'https://baidu.gitee.io/amis/static/photo/da6376bf988c_3360340.jpg'
                                                                },
                                                                {
                                                                    image: 'https://baidu.gitee.io/amis/static/photo/3893101144_bff2dc9.jpg'
                                                                }
                                                            ],
                                                            className: 'm-t-lg p-t-lg'
                                                        }
                                                    ],
                                                    columnClassName: 'no-border'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            md: 'auto',
                            columnClassName: 'b-info b-t b-b b-r b-2x',
                            valign: 'top'
                        },
                        {
                            body: [
                                {
                                    type: 'grid',
                                    columns: [
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '出厂编号:LF2022118',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '设备型号:LF-8563',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '客户名称:XXXX有限公司',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'grid',
                                    columns: [
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '生产日期:2020年10月5号\n',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '设备功率:7.5kw\n',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '安装位置:台州市临海市东方大道105号',
                                                    inline: false,
                                                    style: {}
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'image',
                                    width: 553,
                                    height: 200,
                                    defaultImage: 'https://dgiot.h7ml.icu/static/img/example.5aa9eba3.png'
                                },
                                {
                                    type: 'chart',
                                    config: {
                                        xAxis: {
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value'
                                        },
                                        series: [
                                            {
                                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                                type: 'line'
                                            }
                                        ],
                                        title: {
                                            text: '变频器评率',
                                            left: 'center'
                                        }
                                    },
                                    replaceChartOption: false,
                                    title: {
                                        text: '变漂亮',
                                        left: 'center'
                                    }
                                },
                                {
                                    type: 'chart',
                                    config: {
                                        xAxis: {
                                            type: 'category',
                                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                        },
                                        yAxis: {
                                            type: 'value'
                                        },
                                        series: [
                                            {
                                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                                type: 'line'
                                            }
                                        ],
                                        title: {
                                            text: '出口压力',
                                            left: 'center'
                                        }
                                    },
                                    replaceChartOption: true
                                }
                            ],
                            md: 'auto',
                            columnClassName: 'b-b b-r b-info b-t b-2x'
                        },
                        {
                            body: [
                                {
                                    type: 'property',
                                    title: '实时数据',
                                    items: [
                                        {
                                            label: '运行频率',
                                            content: '3.8',
                                            span: 1
                                        },
                                        {
                                            label: '水箱液位(cm)',
                                            content: '4G',
                                            span: 1
                                        },
                                        {
                                            label: '出口压力(MPa)',
                                            content: '80G',
                                            span: 1
                                        },
                                        {
                                            label: '进口压力(MPa)',
                                            content: '1.0',
                                            span: 1
                                        },
                                        {
                                            label: 'AB相电压(V)',
                                            content: '380.8',
                                            span: 1
                                        },
                                        {
                                            label: 'BC相电压(V)',
                                            content: '379.8',
                                            span: 1
                                        },
                                        {
                                            span: 1,
                                            label: 'CA相电压(V)',
                                            content: '381.8'
                                        },
                                        {
                                            span: 1,
                                            label: '限时流量(m3/h)',
                                            content: '35.300'
                                        },
                                        {
                                            span: 1,
                                            label: '1#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '2#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '3#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '变频状态',
                                            content: 'OFF'
                                        },
                                        {
                                            span: 1,
                                            label: '1#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '2#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '3#水泵电流',
                                            content: '12.0'
                                        },
                                        {
                                            span: 1,
                                            label: '变频状态',
                                            content: 'OFF'
                                        }
                                    ],
                                    column: 4,
                                    mode: 'table'
                                },
                                {
                                    type: 'grid',
                                    columns: [
                                        {
                                            body: [
                                                {
                                                    type: 'button',
                                                    label: '历史数据',
                                                    actionType: 'dialog',
                                                    dialog: {
                                                        title: '系统提示',
                                                        body: '对你点击了'
                                                    },
                                                    size: 'md',
                                                    className: 'b-success',
                                                    level: 'dark',
                                                    block: true
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'submit',
                                                    label: '历史曲线',
                                                    actionType: 'dialog',
                                                    dialog: {
                                                        title: '系统提示',
                                                        body: '对你点击了'
                                                    },
                                                    size: 'md',
                                                    className: 'b-success',
                                                    level: 'dark',
                                                    block: true
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'submit',
                                                    label: '报警记录',
                                                    actionType: 'dialog',
                                                    dialog: {
                                                        title: '系统提示',
                                                        body: '对你点击了'
                                                    },
                                                    size: 'md',
                                                    className: 'b-success',
                                                    level: 'dark',
                                                    block: true
                                                }
                                            ]
                                        },
                                        {
                                            body: [
                                                {
                                                    type: 'submit',
                                                    label: '联系我们',
                                                    actionType: 'dialog',
                                                    dialog: {
                                                        title: '系统提示',
                                                        body: '对你点击了'
                                                    },
                                                    size: 'md',
                                                    className: 'b-success',
                                                    level: 'dark',
                                                    block: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {},
                                {
                                    type: 'video',
                                    autoPlay: false,
                                    src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                                    poster: 'https://i0.hdslb.com/bfs/face/049e1a5e07533594474779e8a64e5496110d6843.jpg',
                                    aspectRatio: 'auto',
                                    isLive: false,
                                    muted: false
                                }
                            ],
                            md: '',
                            columnClassName: 'b-t b-b b-2x b-primary b-r'
                        }
                    ]
                },
                {
                    type: 'grid',
                    columns: []
                }
            ],
            style: {
                backgroundImage: 'http://datav.jiaminghi.com/demo/manage-desk/img/bg.110420cf.png'
            }
        }
    ],
    messages: {},
    style: {
        backgroundColor: '',
        backgroundImage: 'http://datav.jiaminghi.com/demo/manage-desk/img/bg.110420cf.png',
        opacity: 1
    }
};

export { schema };
