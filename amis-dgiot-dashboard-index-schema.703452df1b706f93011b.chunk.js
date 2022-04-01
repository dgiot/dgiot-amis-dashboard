/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-amis-dashboard 
 *  version : 0.0.2 
 *  description : dgiot-amis-dashboard 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Fri Apr 01 2022 09:57:42 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{yTAX:function(e,a,l){"use strict";l.r(a),l.d(a,"schema",(function(){return t}));var t={type:"page",name:"page",title:"",toolbar:[],body:[{type:"crud",name:"crud",perPageAvailable:[10,20,50,100],syncLocation:!1,multiple:!0,keepItemSelectionOnPageChange:!1,draggable:!0,hideQuickSaveBtn:!1,autoJumpToTopOnPagerChange:!1,affixHeader:!1,syncResponse2Query:!0,api:{method:"get",url:"/!/amis-api/curd-page@curdQuery"},defaultParams:{pageNo:1,pageSize:10},pageField:"pageNo",perPageField:"pageSize",filterTogglable:!0,filter:{title:"查询条件",className:"form-label-4x form-input-14x",trimValues:!0,submitOnChange:!1,controls:[{type:"text",label:"订单编号",name:"orderCode",placeholder:"通过关键字搜索",clearable:!0,size:"md"},{type:"text",label:"手机号",name:"shipMobile",placeholder:"通过关键字搜索",clearable:!0,size:"md"},{type:"select",label:"订单状态",name:"status",placeholder:"通过关键字搜索",clearable:!0,size:"md",options:[{label:"待审核",value:"-3"},{label:"待支付",value:"-2"},{label:"待处理",value:"-1"},{label:"已接单",value:"0"},{label:"已出库",value:"1"},{label:"已签收",value:"2"},{label:"已驳回",value:"3"},{label:"拒收",value:"4"},{label:"已取消",value:"5"}],submitOnChange:!0},{type:"html",html:"<br />"},{type:"select",label:"支付状态",name:"payType",placeholder:"请选择",clearable:!0,size:"md",options:[{label:"未支付",value:"1"},{label:"已支付",value:"2"}],submitOnChange:!0},{type:"datetime",label:"开始时间",name:"createAtStart",placeholder:"选择时间",format:"x",clearable:!0,size:"md"},{type:"datetime",label:"结束时间",name:"createAtEnd",placeholder:"选择时间",format:"x",clearable:!0,size:"md"},{label:"查询",level:"primary",type:"submit",size:"md"},{label:"重置",type:"reset"}]},primaryField:"orderId",columns:[{name:"orderCode",label:"订单编号",sortable:!0},{name:"status",label:"订单状态",sortable:!0,type:"mapping",map:{0:"已接单",1:"已出库",2:"已签收",3:"已驳回",4:"拒收",5:"已取消","-3":"待审核","-2":"待支付","-1":"待处理"}},{name:"shipName",label:"收货人姓名",sortable:!0},{name:"shipMobile",label:"手机号",sortable:!0},{name:"orderType",label:"订单类型",sortable:!0,type:"mapping",map:{1:"O2O",2:"B2C"}},{name:"payStatus",label:"支付方式",sortable:!0,type:"mapping",map:{0:"现金支付",1:"微信支付",2:"支付宝",3:"三方平台线上支付",4:"小程序",5:"保险支付",45:"微信小程序+保险","-1":"暂无"}},{name:"payType",label:"支付状态",sortable:!0,type:"mapping",map:{1:"未支付",2:"已支付"}},{name:"payTime",label:"支付时间",sortable:!0},{name:"payAmount",label:"支付金额",sortable:!0},{name:"createAt",label:"下单时间",sortable:!0},{type:"operation",label:"操作",width:120,toggled:!0,buttons:[{type:"button",label:"查看",level:"info",size:"xs",actionType:"dialog",dialog:{title:"查看订单 - ${orderCode}",closeOnEsc:!0,actions:[{type:"button",label:"关闭",level:"primary",actionType:"close"}],body:{type:"form",className:"form-label-5x",initApi:{method:"get",url:"/!/amis-api/curd-page@getDetail?orderId=$orderId"},controls:[{type:"static",name:"orderId",label:"订单ID"},{type:"static",name:"orderCode",label:"订单编号"},{type:"mapping",name:"status",label:"订单状态",map:{0:"已接单",1:"已出库",2:"已签收",3:"已驳回",4:"拒收",5:"已取消","-3":"待审核","-2":"待支付","-1":"待处理"}},{type:"static",name:"shipName",label:"收货人"},{type:"static",name:"shipMobile",label:"手机号"},{type:"static",name:"shipAddr",label:"地址"}]}}},{type:"button",label:"编辑",level:"info",size:"xs",actionType:"dialog",dialog:{size:"xs",title:"编辑",data:{"&":"$$",shipName:"${shipName}",shipName2:"${shipName}"},body:{type:"form",className:"flex-form-label-5x",api:{method:"put",url:"/!/amis-api/curd-page@mockUpdate?orderId=$orderId"},controls:[{type:"text",name:"orderId",label:"订单ID"},{type:"text",name:"orderCode",label:"订单编号"},{type:"select",name:"status",label:"订单状态",options:[{label:"待审核",value:"-3"},{label:"待支付",value:"-2"},{label:"待处理",value:"-1"},{label:"已接单",value:"0"},{label:"已出库",value:"1"},{label:"已签收",value:"2"},{label:"已驳回",value:"3"},{label:"拒收",value:"4"},{label:"已取消",value:"5"}]},{type:"text",name:"shipName",label:"收货人"},{type:"text",name:"shipName2",label:"收货人2"},{type:"text",name:"shipMobile",label:"手机号"},{type:"textarea",name:"shipAddr",label:"地址"}]}}},{type:"button",label:"删除",level:"danger",size:"xs",actionType:"ajax",api:{method:"delete",url:"/!/amis-api/curd-page@mockDelete?orderId=$orderId"},confirmText:"您确认要删除订单:${orderCode}?"}]}],bulkActions:[{label:"批量操作1"},{label:"批量操作2"}],headerToolbar:[{align:"left",type:"button",label:"主操作",level:"primary",size:"sm"},{align:"left",type:"button",label:"次操作",size:"sm"},{align:"left",type:"bulkActions"},{align:"right",type:"columns-toggler"},{align:"right",type:"filter-toggler"},{align:"right",type:"drag-toggler"},{align:"right",type:"export-csv"},{align:"right",type:"export-excel"}],footerToolbar:[{align:"right",type:"pagination"},{align:"right",type:"switch-per-page"},{align:"right",type:"statistics"}]}]}}}]);