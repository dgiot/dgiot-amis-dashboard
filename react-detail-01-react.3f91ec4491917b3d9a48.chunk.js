/*!
 * build: 杭州数蛙科技有限公司 
 *  copyright: dgiot 
 *  project : dgiot-amis-dashboard 
 *  version : 0.0.2 
 *  description : dgiot-amis-dashboard 脚手架 
 *  author: h7ml(h7ml@qq.com) 
 *  time:Fri Apr 01 2022 09:57:42 GMT+0000 (Coordinated Universal Time)
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"2BEs":function(e,t,n){"use strict";n.r(t);var r=n("+EbZ"),a=n.n(r),o=n("06Pm"),i=n.n(o),c=n("kA7L"),l=n.n(c),u=n("X5/F"),s=n.n(u),d=n("3SUL"),p=n.n(d),f=n("eYnF"),h=n.n(f),m=(n("07d7"),n("5s+n"),n("p532"),n("SLhn")),v=n.n(m),D=n("cDcd"),y=n.n(D),b=n("Exp3"),g=n("4Iue"),I=n("la/R");function E(e){var t=function(){if("undefined"==typeof Reflect||!a.a)return!1;if(a.a.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(a()(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h()(e);if(t){var o=h()(this).constructor;n=a()(r,arguments,o)}else n=r.apply(this,arguments);return p()(this,n)}}var k=function(e){s()(n,e);var t=E(n);function n(){var e,r;i()(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(r=t.call.apply(t,v()(e=[this]).call(e,o))).state={loading:!0,orderData:{}},r}return l()(n,[{key:"componentDidMount",value:function(){this.getData()}},{key:"componentDidUpdate",value:function(e,t,n){this.getData()}},{key:"getData",value:function(){var e=this,t=this.props.location.query,n=null==t?void 0:t.orderId;n!==this.state.orderId&&(this.setState({loading:!0,orderId:n}),g.c.get("".concat(I.b,"/iotapi/curd-page@getDetail"),{params:{orderId:n}}).then((function(t){return e.setState({orderData:t})})).finally((function(){return e.setState({loading:!1})})))}},{key:"render",value:function(){var e=this.state,t=e.orderData,n=e.loading;return y.a.createElement(b.Card,{bordered:!1,loading:n},y.a.createElement(b.Descriptions,{title:"订单详情",bordered:!0,column:2},y.a.createElement(b.Descriptions.Item,{label:"订单ID"},t.orderId),y.a.createElement(b.Descriptions.Item,{label:"订单编号"},t.orderCode),y.a.createElement(b.Descriptions.Item,{label:"收货人"},t.shipName),y.a.createElement(b.Descriptions.Item,{label:"手机号"},t.shipMobile),y.a.createElement(b.Descriptions.Item,{label:"地址"},t.shipAddr)))}}]),n}(D.Component);t.default=k},"la/R":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var r="http://prod.iotn2n.com",a=location.origin}}]);