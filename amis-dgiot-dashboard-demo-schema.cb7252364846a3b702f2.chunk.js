/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-amis-dashboard 
 *  version : 0.0.2 
 *  description : dgiot-amis-dashboard 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Fri Apr 01 2022 07:47:24 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{zTRn:function(e,t,a){"use strict";a.r(t),a.d(t,"schema",(function(){return l}));var l={type:"page",body:[{type:"grid",columns:[{md:12,body:[{mode:"inline",name:"title",type:"static",label:"生产报工",labelClassName:"text-lg p-md font-bold"}],columnClassName:"bg-white"},{body:[{icon:"fa fa-plus pull-left",type:"button",actionType:"dialog",label:"新建",level:"danger",className:"m-b-sm",dialog:{body:{api:"post:/amis/api/mock2/sample",body:[{name:"engine",type:"input-text",label:"Engine"},{name:"browser",type:"input-text",label:"Browser"}],type:"form"},title:"新增表单"}},{type:"crud",mode:"table",api:{url:"/usemock/device/listAll",data:{}},perPage:10,filter:{body:[{mode:"inline",name:"keywords",size:"md",type:"input-text",placeholder:"通过关键字搜索"},{name:"starttime",type:"input-datetime",minDate:"${starttime}",placeholder:"起始时间",inputClassName:"w-md"},{name:"endtime",type:"input-datetime",maxDate:"${endtime}",placeholder:"结束时间",inputClassName:"w-md"},{type:"button",label:"查询",actionType:"submit"}],title:"",submitText:""},columns:[{name:"objectId",label:"设备编号"},{name:"name",label:"名称"},{name:"status",label:"状态"},{name:"createdAt",label:"创建时间"},{type:"operation",label:"操作",buttons:[{type:"button",label:"修改",drawer:{body:{api:"post:/amis/api/mock2/sample/${id}",body:[{name:"engine",type:"input-text",label:"Engine"},{name:"browser",type:"input-text",label:"Browser"}],type:"form",initApi:"/amis/api/mock2/sample/${id}"},title:"新增表单"},actionType:"drawer"},{api:"delete:/amis/api/mock2/sample/${id}",type:"button",label:"删除",level:"danger",actionType:"ajax",confirmText:"确认要删除？"}]}],headerToolbar:["pagination"],footerToolbar:[{type:"tpl",tpl:"定制内容示例：当前有 ${count} 条数据。",className:"v-middle"},{align:"right",type:"pagination"}],alwaysShowPagination:!0,syncLocation:!1}]}]}],style:{backgroundColor:""},messages:{},bodyClassName:"bg-light"}}}]);