#### 项目介绍
<p align="center">
  <img src="https://img.shields.io/github/commit-activity/m/dgiot/dgiot_amis" alt="ommit-activity">
	<img src="https://badgen.net/badge/package/%40dgiot%2Fdgiot_amis/blue"
	alt="package" maxretrytimes="3" class="m-1 transition-all duration-1000">
	<img src="https://badgen.net/npm/v/@dgiot/dgiot_amis" alt="Npm Version"
	maxretrytimes="3" class="m-1 transition-all duration-1000">
	<img src="https://badgen.net/npm/node/@dgiot/dgiot_amis" alt="Node Version"
	maxretrytimes="3" class="m-1 transition-all duration-1000">
	<br>
	<img src="https://badgen.net/jsdelivr/hits/npm/@dgiot/dgiot_amis"
	alt="Jsdeliver Month Downloads" maxretrytimes="3" class="m-1 transition-all duration-1000">
	<img src="https://badgen.net/packagephobia/install/@dgiot/dgiot_amis"
	alt="Install Size" maxretrytimes="3" class="m-1 transition-all duration-1000">
	<img src="https://badgen.net/npm/types/@dgiot/dgiot_amis" alt="Type Support"
	maxretrytimes="3" class="m-1 transition-all duration-1000">
	<br>
	<img src="https://img.shields.io/librariesio/release/npm/@dgiot/dgiot_amis"
	alt="Outdated Dep" maxretrytimes="3" class="m-1 transition-all duration-1000">
	<img src="https://img.shields.io/snyk/vulnerabilities/npm/@dgiot/dgiot_amis"
	alt="Vulnerablities" maxretrytimes="3" class="m-1 transition-all duration-1000">
  <a href="https://www.npmjs.com/package/@dgiot/dgiot_amis"><img src="https://img.shields.io/npm/l/@dgiot/dgiot_amis" alt="License"></a>
<p>
dgiot_amis 是基于百度的 [amis](https://github.com/baidu/amis) 低代码框架开发的管理后台前端项目，旨在提供低门槛、高效率、开箱即用的管理后台前端项目。

##### 1.本项目的应用范围和人群
1. 企业内部运营后端项目，功能较为简单的管理后台
1. 适合有一点前端基础(写过html + js + css)的程序员，不需要懂大前端技术(npm、webpack、react/vue......)

##### 2.本项目优势
1. 门槛极低，使用json来定义页面，会写json就能开发页面
1. 提供完整的管理后台界面解决方案，内置菜单、用户登录登出、401、403、404等基础页面功能，真正的开箱即用
1. 支持所有amis框架的UI组件(100+)
1. 支持扩展，页面开发支持多种技术：amis(主要)、react、传统html。支持html页面内嵌集成
1. 经历了某上市公司的内部多个项目的线上实战考验
1. 开发效率提升3倍以上，熟练amis框架开发效率提升6倍以上

##### 3.效果预览

线上预览地址: [https://prod.iotn2n.com/dgiot_amis](https://prod.iotn2n.com/dgiot_amis/) (dgiot_admin/dgiot_admin)

#### 快速开始

##### 1.安装Node.js(建议12.x版本)

下载地址: [https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)


##### 2.安装yarn

```shell
npm install -g yarn
yarn -v
```


##### 4.初始化 & 开发

```shell
cd ./dgiot_amis
// 初始化
yarn install
// 开发
yarn run dev
```

1. 使用谷歌浏览器打开: http://127.0.0.1:8000
2. 页面代码都在`/src/pages`文件夹中，一个页面就是一个文件
3. 菜单配置在`/src/router-config.tsx`文件中定义


> 建议使用`IntelliJ IDEA`或者`WebStorm`开发工具
