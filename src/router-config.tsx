import React from 'react';
import classNames from 'classnames';
import { CopyrightCircleOutlined } from '@ant-design/icons';
import { LayoutConfig, LayoutType } from '@/utils/router';
import { SideFirstMenuMode } from '@/components/Layout/GlobalSide';
import { BreadcrumbNav } from '@/components/Layout/BreadcrumbNav';
import { ActionKey, AvatarMode, UserAvatar } from '@/components/UserAvatar';
import { userLogout } from '@/service/login-service';

const routerConfigs: LayoutConfig[] = [
    // {
    //   path: "",                     // 匹配路径(支持path-to-regexp)
    //   layout: LayoutType.Blank,     // 页面布局类型
    //   layoutProps: {},              // 页面布局配置
    //   routes: [                     // 路由配置
    //     {
    //       path: "",                 // 路由路径(支持path-to-regexp)
    //       pathVariable: {},         // 路由路径中有变量时，配置的路径变量对象
    //       querystring: {},          // 设置路由路径的queryString部分
    //       exact: true,              // 表示是否严格匹配
    //       pagePath: "",             // 页面路径
    //       redirect: "",             // 跳转到指定页面
    //       icon: "",                 // 路由图标
    //       name: "",                 // 路由名称
    //       pageTitle: "",            // 页面标题
    //       defaultOpen: true,        // 默认展开子路由
    //       breadcrumbName: "",       // 面包屑文本(不配置就默认取“name”)
    //       hideBreadcrumb: true,     // 是否隐藏面包屑导航
    //       groupName: "",            // 路由分组名称(配置才会分组，不配置就不分组)
    //       hideMenu: false,          // 隐藏当前路由和子路由
    //       hideChildrenMenu: false,  // 隐藏子路由
    //       state: {},                // 路由状态
    //       authority: "",            // 路由权限控制(权限字符串)
    //       routes: [],               // 子路由配置
    //     },
    //   ],
    //   401: "",                      // 401未登录页面
    //   403: "",                      // 403无权访问页面
    //   404: "",                      // 404页面不存在
    // },
    // {
    //   path: "/",
    //   layout: LayoutType.Blank,
    //   layoutProps: {},
    //   routes: [
    //     { path: "/login", name: "用户登录", pagePath: "login.react.tsx" },
    //     {
    //       path: "/curd",
    //       name: "CURD",
    //       icon: "TableOutlined",
    //       routes: [
    //         { path: "/00", name: "通用CURD", pagePath: "/amis/curd-00.schema.ts" },
    //         { path: "/01", name: "常规CURD", pagePath: "/amis/curd-01-general.schema.ts" },
    //         { path: "/02", name: "空白页", pagePath: "/amis/empty-page.schema.ts" },
    //         { path: "/03", name: "设备管理", pagePath: "/react/01demo.react.tsx" },
    //         { path: "/04", name: "内嵌百度", pagePath: "https://www.baidu.com/" },
    //       ],
    //     },
    //   ],
    //   404: "/404.react.tsx",
    // },
    {
        path: '/blank',
        layout: LayoutType.Blank,
        layoutProps: {},
        routes: [
            { path: '/login', name: '用户登录', pagePath: 'login.react.tsx' },
            {
                path: '/curd',
                name: 'CURD',
                icon: 'TableOutlined',
                routes: [
                    { path: '/00', name: '通用CURD', pagePath: '/amis/curd-00.schema.ts' },
                    { path: '/01', name: '常规CURD', pagePath: '/amis/curd-01-general.schema.ts' },
                    { path: '/02', name: '空白页', pagePath: '/amis/empty-page.schema.ts' },
                    { path: '/03', name: '设备管理', pagePath: '/react/01demo.react.tsx' },
                    { path: '/04', name: '内嵌百度', pagePath: 'https://www.baidu.com/' }
                ]
            }
        ],
        404: '/404.react.tsx'
    },
<<<<<<< HEAD
    routes: [
      // -------------------------------------------------------------------------
      {
        path: "/dashboard",
        name: "总控台",
        icon: "HomeOutlined",
        routes: [
          // { path: "/00", name: "dashboard", icon: "WindowsOutlined", pagePath: "https://prod.iotn2n.com" },
          { path: "/index", name: "总控台", icon: "DashboardOutlined", pagePath: "/amis/dgiot/dashboard/index.schema.ts" },
          { path: "/demo", name: "设备管理", icon: "DashboardOutlined", pagePath: "/amis/dgiot/dashboard/demo.schema.ts" },
          // { path: "/02", name: "常规CURD", icon: "TableOutlined", pagePath: "/amis/curd-01-general.schema.ts" },
          { path: "/konva/:objectId", name: "konva", icon: "BulbOutlined", pagePath: "/react/konva.react.tsx",hideMenu:true },
          { path: "/05", name: "TS(JS)页面", icon: "BulbOutlined", pagePath: "/typescript/index.html" },
          { path: "/chart", name: "Chart图标", icon: "BulbOutlined", pagePath: "/amis/chart-00.schema.ts" }
        ],
      },
      {
        path: "/device",
        name: "设备云",
        icon: "CodepenCircleOutlined",
=======
    {
        path: '/',
        layout: LayoutType.NestSide,
        layoutProps: {
            hideGlobalHeader: false,
            globalHeaderLeftRender: (props, className, elementMap) => {
                const { layoutMenuData } = props;
                elementMap.set('breadcrumb', <BreadcrumbNav key="breadcrumb" style={{ marginLeft: 8 }} layoutMenuData={layoutMenuData} />);
                const { rightClassName, rightStyle = {} } = props;
                return (
                    <div className={classNames(className, rightClassName)} style={rightStyle}>
                        {[...elementMap.values()]}
                    </div>
                );
            },
            globalHeaderRightRender: (props, className, elementMap) => {
                const currentUser = window.currentUser;
                elementMap.set(
                    'avatar',
                    <UserAvatar
                        key="avatar"
                        mode={AvatarMode.Horizontal}
                        avatarSrc={currentUser?.avatar}
                        nickname={currentUser?.nickname}
                        onMenuClick={(key) => {
                            switch (key) {
                                case ActionKey.PersonalCenter:
                                    break;
                                case ActionKey.PersonalSettings:
                                    break;
                                case ActionKey.Logout:
                                    userLogout(layoutSettings.logoutApi!, layoutSettings.loginPath!);
                                    break;
                            }
                        }}
                    />
                );
                const { rightClassName, rightStyle = {} } = props;
                return (
                    <div className={classNames(className, rightClassName)} style={rightStyle}>
                        {[...elementMap.values()]}
                    </div>
                );
            },
            hideGlobalFooter: false,
            globalFooterCopyright: (
                <>
                    Copyright <CopyrightCircleOutlined key="copyright" /> 2021 杭州数蛙科技有限公司 浙ICP备20003309号-1
                </>
            ),
            globalSideMenuWidth: 100,
            globalSideMenuMode: SideFirstMenuMode.AntdMenu,
            sideMenuEnableSearchMenu: false
        },
>>>>>>> 5d920fd9f88d6bd3639c86cb9df785af46a7f198
        routes: [
            // -------------------------------------------------------------------------
            {
                path: '/dashboard',
                name: '总控台',
                icon: 'HomeOutlined',
                routes: [
                    // { path: "/00", name: "dashboard", icon: "WindowsOutlined", pagePath: "https://prod.iotn2n.com" },
                    { path: '/index', name: '总控台', icon: 'DashboardOutlined', pagePath: '/amis/dgiot/dashboard/index.schema.ts' },
                    { path: '/demo', name: '设备管理', icon: 'DashboardOutlined', pagePath: '/amis/dgiot/dashboard/demo.schema.ts' },
                    // { path: "/02", name: "常规CURD", icon: "TableOutlined", pagePath: "/amis/curd-01-general.schema.ts" },
                    { path: '/konva', name: 'konva', icon: 'BulbOutlined', pagePath: '/react/konva.react.tsx' },
                    { path: '/05', name: 'TS(JS)页面', icon: 'BulbOutlined', pagePath: '/typescript/index.html' },
                    { path: '/chart', name: 'Chart图标', icon: 'BulbOutlined', pagePath: '/amis/chart-00.schema.ts' }
                ]
            },
            {
                path: '/device',
                name: '设备云',
                icon: 'CodepenCircleOutlined',
                routes: [
                    // { path: "/00", name: "dashboard", icon: "WindowsOutlined", pagePath: "https://prod.iotn2n.com" },
                    { path: '/index', name: '设备管理', icon: 'TableOutlined', pagePath: '/amis/dgiot/device/index.schema.ts' },
                    // { path: "/02", name: "常规CURD", icon: "TableOutlined", pagePath: "/amis/curd-01-general.schema.ts" },
                    // { path: "/03", name: "设备管理", icon: "BulbOutlined", pagePath: "/react/01demo.react.tsx" },
                    { path: '/05', name: 'TS(JS)页面', icon: 'BulbOutlined', pagePath: '/pages/typescript/index.html' }
                    // { path: "/06", name: "Chart图标", icon: "BulbOutlined", pagePath: "/amis/chart-00.schema.ts" }
                ]
            },
            {
                path: '/form',
                name: '多租户',
                icon: 'FormOutlined',
                routes: [
                    { path: '/00', name: '所有表单类型', icon: 'EditOutlined', pagePath: '/amis/form-00.schema.ts' },
                    { path: '/01', name: '表单布局', icon: 'EditOutlined', pagePath: '/amis/form-01-layout.schema.ts' },
                    { path: '/02', name: '表单校验', icon: 'EditOutlined', pagePath: '/amis/form-02-verify.schema.ts' },
                    { path: '/03', name: '对话框表单', icon: 'EditOutlined', pagePath: '/amis/form-03-dialog.schema.ts' }
                ]
            },
            {
                path: '/menu',
                name: '云系统',
                icon: 'MenuOutlined',
                routes: [
                    {
                        path: '/00',
                        name: '路径参数',
                        icon: 'TableOutlined',
                        pagePath: '/amis/curd-02-general.schema.ts',
                        querystring: { param: 'value123' },
                        hideChildrenMenu: true,
                        routes: [
                            { path: '/detail', name: '详情页面-amis(单)', pagePath: '/amis/detail-01.schema.ts' },
                            { path: '/:detail2', name: '详情页面-amis(多)', pagePath: '/amis/detail-02.schema.ts' },
                            { path: '/react/detail', name: '详情页面-react(单)', pagePath: '/react/detail-01.react.ts' }
                        ]
                    },
                    {
                        path: '/:01',
                        name: '路径变量',
                        icon: 'TableOutlined',
                        pagePath: '/amis/curd-01-general.schema.ts',
                        pathVariable: { '01': 'p01' }
                    },
                    {
                        path: '/03',
                        name: '二级菜单',
                        icon: 'PictureOutlined',
                        routes: [
                            { path: '/01', name: '三级菜单01', pagePath: '/amis/empty-page.schema.ts' },
                            {
                                path: '/02',
                                name: '三级菜单02',
                                defaultOpen: false,
                                routes: [
                                    { path: '/01', name: '四级菜单01', pagePath: '/amis/empty-page.schema.ts' },
                                    { path: '/02', name: '四级菜单02', pagePath: '/amis/empty-page.schema.ts' }
                                ]
                            },
                            { path: '/03', name: '三级菜单03', pagePath: '/amis/empty-page.schema.ts' }
                        ]
                    },
                    {
                        path: '/04',
                        name: '二级菜单-分组',
                        icon: 'PictureOutlined',
                        routes: [
                            { path: '/01', name: '三级菜单01', groupName: '分组A', pagePath: '/amis/empty-page.schema.ts' },
                            { path: '/02', name: '三级菜单02', groupName: '分组A', pagePath: '/amis/empty-page.schema.ts' },
                            { path: '/03', name: '三级菜单03', groupName: '分组B', pagePath: '/amis/empty-page.schema.ts' },
                            { path: '/04', name: '三级菜单04', groupName: '分组B', pagePath: '/amis/empty-page.schema.ts' },
                            { path: '/05', name: '三级菜单05', groupName: '分组C', pagePath: '/amis/empty-page.schema.ts' },
                            { path: '/06', name: '三级菜单06', groupName: '分组C', pagePath: '/amis/empty-page.schema.ts' }
                        ]
                    }
                ]
            },
            {
                path: '/help',
                name: '帮助文档',
                icon: 'QuestionCircleOutlined',
                openOptions: { url: 'https://baidu.gitee.io/amis/docs/index' }
            },
            {
                path: '/github',
                name: 'github',
                icon: 'GithubOutlined',
                openOptions: { url: 'https://github.com/dgiot/dgiot-amis-dashboard/' }
            }
        ],
        // 401: "/blank/login",
        403: '/403.react.tsx',
        404: '/404.react.tsx'
    }
];

const layoutSettings: LayoutSettings = {
    menu: { defaultOpen: true },
    iconScriptUrl: '//at.alicdn.com/t/font_1326886_bbehrpsvyl.js',
    htmlTitleSuffix: '',
    loginPath: '/blank/login',
    defaultPath: '/dashboard/index',
    loginApi: '/iotapi/login',
    // logoutApi: "/logout",
    currentUserApi: '/iotapi/curd-page@currentUser'
    // menuApi: "/menus",
};

export { routerConfigs, layoutSettings };
