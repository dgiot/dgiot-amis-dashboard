/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-amis-dashboard 
 *  version : 0.0.2 
 *  description : dgiot-amis-dashboard 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Fri Apr 01 2022 07:47:24 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{Ndrk:function(e,t,a){"use strict";a.r(t),a.d(t,"schema",(function(){return i}));var i={type:"page",body:[{type:"form",title:"过滤条件",target:"chart1,chart2",submitOnInit:!0,className:"m-b",wrapWithPanel:!1,mode:"inline",controls:[{type:"date",label:"开始日期",name:"starttime",value:"-8days",maxDate:"${endtime}"},{type:"date",label:"结束日期",name:"endtime",value:"-1days",minDate:"${starttime}"},{type:"text",label:"条件",name:"name",addOn:{type:"submit",label:"搜索",level:"primary"}}],actions:[]},{type:"divider"},{type:"grid",className:"m-t-lg",columns:[{type:"chart",name:"chart1",initFetch:!1,api:"https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/chart/chart?name=$name&starttime=${starttime}&endtime=${endtime}"},{type:"chart",name:"chart2",initFetch:!1,api:"https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/chart/chart2?name=$name"}]},{type:"divider"},{type:"chart",config:{legend:{formatter:"function (name) { return 'Legend ' + name;}"},dataset:{source:[["type","2012","2013","2014","2015","2016"],["Forest",320,332,301,334,390],["Steppe",220,182,191,234,290],["Desert",150,232,201,154,190],["Wetland",98,77,101,99,40]]},xAxis:{type:"category",axisTick:{show:!1}},yAxis:{},series:[{type:"bar",seriesLayoutBy:"row"},{type:"bar",seriesLayoutBy:"row"},{type:"bar",seriesLayoutBy:"row"},{type:"bar",seriesLayoutBy:"row"}]}}]}}}]);