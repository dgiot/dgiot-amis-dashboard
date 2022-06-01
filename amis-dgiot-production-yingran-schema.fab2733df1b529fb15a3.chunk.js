/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-amis-dashboard 
 *  version : 0.0.2 
 *  description : dgiot-amis-dashboard 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Wed Jun 01 2022 16:53:23 GMT+0800 (China Standard Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{Ypon:function(t,e,l){"use strict";l.r(e),l.d(e,"schema",(function(){return k}));l("07d7"),l("FZtP");var i=l("ejTr"),a=l.n(i),o=l("CvqZ"),x=l.n(o),d=l("8Vev"),n=l.n(d),h=l("NDYa"),b=l.n(h),r=l("aNQX"),g=l.n(r),w=l("04Ix"),p=l.n(w),u=l("TSYQ"),f=l.n(u),s=l("p46w"),c=l.n(s),m=l("w5tg"),y=l("c+yx");function v(t,e){var l=a()(t);if(x.a){var i=x()(t);e&&(i=n()(i).call(i,(function(e){return b()(t,e).enumerable}))),l.push.apply(l,i)}return l}function _(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?v(Object(l),!0).forEach((function(e){p()(t,e,l[e])})):g.a?Object.defineProperties(t,g()(l)):v(Object(l)).forEach((function(e){Object.defineProperty(t,e,b()(l,e))}))}return t}var k={type:"page",data:{userid:window.location},body:[{type:"grid",columns:[{md:12,body:[{mode:"inline",name:"title",type:"static",label:"印染管理",labelClassName:"text-lg p-md font-bold"}],columnClassName:"bg-white"},{body:[{type:"crud",mode:"table",api:{method:"get",url:"/iotapi/classes/Device",adaptor:function(t,e,l){return console.log("payloadtree",t),{data:{count:t.data.count,rows:t.data.rows},status:0,msg:"ok"}}},defaultParams:{skip:0,limit:10,order:"-createdAt",count:"objectId",where:{product:"d5f1b2dcd8","detail.payout":"已派发","content.c_process":"印染车间"}},pageField:"skip",perPageField:"limit",filter:{body:[{mode:"inline",name:"where.devaddr.$regex",size:"md",type:"input-text",placeholder:"按工单编号查询"},{label:"查询",level:"primary",type:"submit",size:"md"},{label:"重置",type:"reset",size:"md"}],title:"",submitText:""},columns:[{name:"devaddr",label:"工单编号"},{name:"content.personel.label",label:"负责人"},{name:"content.product",label:"产品名称"},{name:"content.number",label:"生产计划数"},{name:"content.yrinfo.compnum",label:"完成数量"},{name:"content.yrinfo.isstart",label:"工单生产状态"},{name:"content.yrinfo.taskstart",label:"任务开工时间"},{name:"content.yrinfo.taskend",label:"任务完工时间"},{name:"content.yrinfo.mhour",label:"工长"},{name:"content.yrinfo.isaudit",label:"审核状态",type:"mapping",map:{"待审核":"<span class='label label-info'>待审核</span>","合格":"<span class='label label-success'>合格</span>","不合格":"<span class='label label-danger'>不合格</span>"}},{type:"operation",label:"操作",buttons:[{type:"button",label:"查看",drawer:{body:{body:[{name:"devaddr",type:"static",label:"订单编号"},{name:"content.material.name",type:"static",label:"产出物料",searchable:!0,extractValue:!0},{name:"content.step",type:"static",label:"工艺步骤",labelField:"label",valueField:"label",selectMode:"tree",required:!0},{name:"content.number",type:"static",label:"计划生产数量"},{name:"content.compnum",type:"static",label:"实际生产数量"},{name:"content.isstart",type:"static",label:"任务状态"},{name:"content.starttime",type:"static",label:"任务开始时间"},{name:"content.endtime",type:"static",label:"任务结束时间"}],type:"form"},title:"查看"},actionType:"drawer"},{api:{method:"delete",url:"/iotapi/amis/Device/${objectId}",headers:{sessionToken:c.a.get("authorization")}},type:"button",label:"删除",level:"danger",actionType:"ajax",confirmText:"确认要删除？"},{type:"button",label:"指派",level:"success",actionType:"dialog",dialog:{title:"指派任务",body:{type:"form",className:f()(m.b.flex_label5x),api:{method:"put",url:"/iotapi/amis/Device/${objectId}",requestAdaptor:function(t){console.log("api数据查看",t.data);var e=t.data.ACL;for(var l in e)l!=Object(y.c)()&&e[l].write&&1==e[l].write&&(e[l].write=!1);e[t.data.dept.objectId]={read:!0,write:!0};var i=t.data.content,a="";for(var o in i.pinfo)"people"!=o&&(a+=i.pinfo[o]);i.pinfo.people=a,i.yrinfo.opinion=t.data.objection,i.yrinfo.isaudit=t.data.isaudit,i.personel=t.data.dept;var x=i.personlist;return x.push(t.data.dept),i.personlist=x,console.log("setAcl",e),_(_({},t),{},{data:{ACL:e,content:i}})}},controls:[{type:"static",name:"content",label:"唯一码",visibleOn:"false"},{name:"ACL",type:"input-text",visibleOn:"false",label:"权限"},{label:"审核",type:"select",name:"isaudit",options:[{label:"合格",value:"合格"},{label:"不合格",value:"不合格"}],required:!0},{label:"审核意见",type:"input-text",name:"objection",value:"合格通过"},{name:"dept",type:"nested-select",label:"派发人员",selectMode:"tree",source:{method:"get",url:"/usemock/usertree",adaptor:function(t,e,l){return console.log("payloadtree",t),console.log("转换树options",t.data.options),_(_({},t),{},{status:0,msg:"ok"})},responseData:{options:"${options|pick:label~label,value~value,children~children}"}},required:!0}]}},visibleOn:"content.yrinfo.isaudit=='待审核'"},{type:"button",label:"任务",level:"info",drawer:{body:{body:[{mode:"inline",name:"title1",type:"static",label:"任务完成详情",value:"",labelClassName:"text-lg p-md font-bold"},{type:"crud",source:"${content.yrinfo.taskList}",syncLocation:!1,headerToolbar:["export-excel"],columns:[{name:"dingdan",label:"订单号",groupName:"${devaddr}"},{name:"date",label:"日期",groupName:"${devaddr}"},{name:"desc",label:"录入信息",groupName:"${devaddr}"}]}],type:"form"},size:"xl",title:"查看任务详情"},actionType:"drawer"}]}],headerToolbar:[],footerToolbar:["switch-per-page",{align:"left",type:"pagination"},{align:"left",type:"statistics"}],alwaysShowPagination:!0,perPageAvailable:[10,20,50,100],syncLocation:!1}]}]}],style:{backgroundColor:""},messages:{}}},w5tg:function(t,e,l){"use strict";var i,a,o,x,d,n;l.d(e,"c",(function(){return i})),l.d(e,"e",(function(){return a})),l.d(e,"d",(function(){return o})),l.d(e,"b",(function(){return d})),l.d(e,"a",(function(){return n})),function(t){t.Inline_Block="global-inline-block",t.MB_None="mb-none"}(i||(i={})),function(t){t.width_full="global-width-full",t.width_unset="global-width-unset",t.width1x="global-width-1x",t.width2x="global-width-2x",t.width3x="global-width-3x",t.width4x="global-width-4x",t.width5x="global-width-5x",t.width6x="global-width-6x",t.width7x="global-width-7x",t.width8x="global-width-8x",t.width9x="global-width-9x",t.width10x="global-width-10x",t.width11x="global-width-11x",t.width12x="global-width-12x",t.width13x="global-width-13x",t.width14x="global-width-14x",t.width15x="global-width-15x",t.width16x="global-width-16x",t.width17x="global-width-17x",t.width18x="global-width-18x",t.width19x="global-width-19x",t.width20x="global-width-20x",t.width21x="global-width-21x",t.width22x="global-width-22x",t.width23x="global-width-23x",t.width24x="global-width-24x",t.width25x="global-width-25x",t.width26x="global-width-26x",t.width27x="global-width-27x",t.width28x="global-width-28x",t.width29x="global-width-29x",t.width30x="global-width-30x",t.width31x="global-width-31x",t.width32x="global-width-32x",t.width33x="global-width-33x",t.width34x="global-width-34x",t.width35x="global-width-35x",t.width36x="global-width-36x",t.width37x="global-width-37x",t.width38x="global-width-38x",t.width39x="global-width-39x",t.width40x="global-width-40x",t.width41x="global-width-41x",t.width42x="global-width-42x",t.width43x="global-width-43x",t.width44x="global-width-44x",t.width45x="global-width-45x",t.width46x="global-width-46x",t.width47x="global-width-47x",t.width48x="global-width-48x"}(a||(a={})),function(t){t.height_full="global-height-full",t.height_unset="global-height-unset",t.height1x="global-height-1x",t.height2x="global-height-2x",t.height3x="global-height-3x",t.height4x="global-height-4x",t.height5x="global-height-5x",t.height6x="global-height-6x",t.height7x="global-height-7x",t.height8x="global-height-8x",t.height9x="global-height-9x",t.height10x="global-height-10x",t.height11x="global-height-11x",t.height12x="global-height-12x",t.height13x="global-height-13x",t.height14x="global-height-14x",t.height15x="global-height-15x",t.height16x="global-height-16x",t.height17x="global-height-17x",t.height18x="global-height-18x",t.height19x="global-height-19x",t.height20x="global-height-20x",t.height21x="global-height-21x",t.height22x="global-height-22x",t.height23x="global-height-23x",t.height24x="global-height-24x"}(o||(o={})),x||(x={}),function(t){t.label2x="form-label-2x",t.label3x="form-label-3x",t.label4x="form-label-4x",t.label5x="form-label-5x",t.label6x="form-label-6x",t.label7x="form-label-7x",t.label8x="form-label-8x",t.label9x="form-label-9x",t.label10x="form-label-10x",t.input10x="form-input-10x",t.input12x="form-input-12x",t.input14x="form-input-14x",t.input16x="form-input-16x",t.input18x="form-input-18x",t.input20x="form-input-20x",t.input22x="form-input-22x",t.input24x="form-input-24x",t.input26x="form-input-26x",t.input28x="form-input-28x",t.input30x="form-input-30x",t.input32x="form-input-32x",t.flex_label2x="flex-form-label-2x",t.flex_label3x="flex-form-label-3x",t.flex_label4x="flex-form-label-4x",t.flex_label5x="flex-form-label-5x",t.flex_label6x="flex-form-label-6x",t.flex_label7x="flex-form-label-7x",t.flex_label8x="flex-form-label-8x",t.flex_label9x="flex-form-label-9x",t.flex_label10x="flex-form-label-10x",t.flex_label12x="flex-form-label-12x",t.flex_label14x="flex-form-label-14x",t.flex_label16x="flex-form-label-16x",t.flex_input10x="flex-form-input-10x",t.flex_input12x="flex-form-input-12x",t.flex_input14x="flex-form-input-14x",t.flex_input16x="flex-form-input-16x",t.flex_input18x="flex-form-input-18x",t.flex_input20x="flex-form-input-20x",t.flex_input22x="flex-form-input-22x",t.flex_input24x="flex-form-input-24x",t.flex_input26x="flex-form-input-26x",t.flex_input28x="flex-form-input-28x",t.flex_input30x="flex-form-input-30x",t.flex_input32x="flex-form-input-32x",t.item_height2_5x="form-item-height-2_5x",t.item_height3_5x="form-item-height-3_5x"}(d||(d={})),function(t){t.width10x="dialog-width-10x",t.width15x="dialog-width-15x",t.width20x="dialog-width-20x",t.width25x="dialog-width-25x",t.width30x="dialog-width-30x",t.width35x="dialog-width-35x",t.width40x="dialog-width-40x",t.width45x="dialog-width-45x",t.width50x="dialog-width-50x",t.width55x="dialog-width-55x",t.width60x="dialog-width-60x",t.width65x="dialog-width-65x",t.width70x="dialog-width-70x",t.width75x="dialog-width-75x",t.width80x="dialog-width-80x",t.width85x="dialog-width-85x",t.width90x="dialog-width-90x",t.width95x="dialog-width-95x",t.width100x="dialog-width-100x",t.width105x="dialog-width-105x",t.width110x="dialog-width-110x",t.width115x="dialog-width-115x",t.width120x="dialog-width-120x",t.width125x="dialog-width-125x",t.width130x="dialog-width-130x",t.width135x="dialog-width-135x",t.width140x="dialog-width-140x",t.width145x="dialog-width-145x",t.width150x="dialog-width-150x"}(n||(n={}))}}]);