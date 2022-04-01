import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { Button, ConfigProvider, message, Result } from 'antd';
import antdZhCN from 'antd/lib/locale/zh_CN';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { getLayoutMenuData } from '@/components/Layout/utils/menu-data';
import { BlankLayout } from '@/layouts/BlankLayout';
import { NestSideMenuLayout } from '@/layouts/NestSideMenuLayout';
import { $rootMounted, initRootDiv } from '@/utils/amis-utils';
import { getPageLocation, getRouterLocation } from '@/utils/utils';
import { logger } from '@/utils/logger';
import { LayoutConfig, layoutToRuntime, LayoutType, locationHashMatch, routerHistory, RuntimeLayoutConfig } from '@/utils/router';
import { getCurrentUser, getMenus } from '@/service/login-service';
import { layoutSettings, routerConfigs } from './router-config';
import './global';

const log = logger.getLogger('src/index.tsx');

interface ReactAppPageProps {
    /** antd组件全局配置 */
    antdConfig: ConfigProviderProps;
    /** 布局全局设置 */
    layoutSettings: LayoutSettings;
    /** Layout配置 */
    routerConfigs: LayoutConfig[];
}

interface ReactAppPageState {
    /** 运行时路由 */
    runtimeLayouts: RuntimeLayoutConfig[];
    /** PageLocation */
    pageLocation: PageLocation;
    /** RouterLocation */
    routerLocation: RouterLocation;
    /** 当前Layout */
    currentLayout?: RuntimeLayoutConfig;
    /** 当前Router */
    currentRouter?: RuntimeRouter;
    /** 当前Menu */
    currentMenu?: RuntimeMenuItem;
    /** 当前根菜单(一级菜单) */
    rootMenus?: RuntimeMenuItem[];
    /** 路由匹配参数 */
    match?: RouteMatchParams;
}

class ReactAppPage extends Component<ReactAppPageProps, ReactAppPageState> {
    constructor(props: ReactAppPageProps) {
        super(props);
        const pageLocation = getPageLocation();
        const routerLocation = getRouterLocation();
        const runtimeLayouts = layoutToRuntime(props.routerConfigs);
        routerHistory.replaceState(routerLocation.path, routerLocation.query);
        const matched = locationHashMatch(props.layoutSettings, routerLocation.path, runtimeLayouts);
        const currentLayout = matched?.currentLayout;
        const currentRouter = matched?.currentRouter;
        const currentMenu = matched?.currentMenu;
        const rootMenus = matched?.rootMenus;
        const match = matched?.match;
        this.state = { runtimeLayouts, pageLocation, routerLocation, currentLayout, currentRouter, currentMenu, rootMenus, match };
        log.info('initState ->', this.state);
    }

    /** APP挂载之后的操作 */
    componentDidMount() {
        // @ts-ignore
        window.addEventListener('hashchange', this.onLocationHashChange);
    }

    /** APP卸载之前到的操作 */
    componentWillUnmount() {
        // @ts-ignore
        window.removeEventListener('hashchange', this.onLocationHashChange);
    }

    /** Location Hash更新事件 */
    onLocationHashChange = (event: HashChangeEvent) => {
        const { layoutSettings } = this.props;
        const { runtimeLayouts } = this.state;
        const pageLocation = getPageLocation();
        const routerLocation = getRouterLocation();
        routerHistory.replaceState(routerLocation.path, routerLocation.query);
        const pathHash = routerLocation.path;
        // 跳转到默认地址或登录地址 - 全局跳转
        const { loginPath, defaultPath } = layoutSettings;
        if (loginPath && !window.currentUser && pathHash !== loginPath) {
            routerHistory.push({ path: loginPath });
            return;
        }
        if (lodash.trim(pathHash).length <= 0 && defaultPath && pathHash !== defaultPath) {
            routerHistory.push({ path: defaultPath });
            return;
        }
        // 路由菜单匹配
        const matched = locationHashMatch(layoutSettings, pathHash, runtimeLayouts);
        const currentLayout = matched?.currentLayout;
        const currentRouter = matched?.currentRouter;
        const currentMenu = matched?.currentMenu;
        const rootMenus = matched?.rootMenus;
        const match = matched?.match;
        log.info('event ->', event.newURL);
        log.info('routerLocation ->', routerLocation);
        // 跳转到登录地址 - 路由跳转
        if (currentLayout && currentLayout['401'] && !window.currentUser && pathHash !== currentLayout['401']) {
            routerHistory.push({ path: currentLayout['401'] });
            return;
        }
        this.setState({ pageLocation, routerLocation, currentLayout, currentRouter, currentMenu, rootMenus, match });
        log.info('newState ->', this.state);
    };

    render() {
        const { currentLayout, currentMenu, rootMenus, routerLocation } = this.state;
        if (!currentLayout) {
            return this.getNoFoundPage();
        }
        // 跳转到登录地址 - 路由跳转
        if (currentLayout && currentLayout['401'] && !window.currentUser && routerLocation?.path !== currentLayout['401']) {
            routerHistory.push({ path: currentLayout['401'] });
            return <div />;
        }
        const layoutMenuData = getLayoutMenuData({ location: routerLocation!, rootMenus: rootMenus!, currentMenu: currentMenu! });
        log.info('layoutMenuData ->', layoutMenuData);
        if (currentLayout.layout === LayoutType.Blank) {
            return this.getBlankLayout(layoutMenuData);
        }
        if (currentLayout.layout === LayoutType.NestSide) {
            return this.getNestSideLayout(layoutMenuData);
        }
        return '不支持的Layout';
    }

    /**
     * 刷新菜单
     */
    public async refreshMenu(callback?: () => void) {
        const routerConfigsCopy = lodash.cloneDeep(routerConfigs);
        const newRouterConfigs = await getMenus(routerConfigsCopy, layoutSettings.menuApi!);
        if (!newRouterConfigs) {
            if (callback instanceof Function) callback();
            return;
        }
        const runtimeLayouts = layoutToRuntime(newRouterConfigs);
        this.setState({ runtimeLayouts }, callback);
    }

    // 侧边栏二级菜单页面
    protected getNestSideLayout(layoutMenuData: LayoutMenuData) {
        const {
            antdConfig,
            layoutSettings: { menu, iconScriptUrl, htmlTitleSuffix }
        } = this.props;
        const { currentLayout, currentRouter, routerLocation, match } = this.state;
        return (
            <ConfigProvider {...antdConfig}>
                <NestSideMenuLayout
                    defaultOpen={menu.defaultOpen}
                    menuIconScriptUrl={iconScriptUrl}
                    htmlTitleSuffix={htmlTitleSuffix}
                    route={currentRouter!}
                    location={routerLocation!}
                    match={match!}
                    rootRoutes={currentLayout?.routes!}
                    layoutMenuData={layoutMenuData}
                    currentLayout={currentLayout}
                    {...currentLayout?.layoutProps}
                />
            </ConfigProvider>
        );
    }

    // 空白布局页面
    protected getBlankLayout(layoutMenuData: LayoutMenuData) {
        const {
            antdConfig,
            layoutSettings: { htmlTitleSuffix }
        } = this.props;
        const { currentLayout, currentRouter, routerLocation, match } = this.state;
        return (
            <ConfigProvider {...antdConfig}>
                <BlankLayout
                    htmlTitleSuffix={htmlTitleSuffix}
                    route={currentRouter!}
                    location={routerLocation!}
                    match={match!}
                    rootRoutes={currentLayout?.routes!}
                    layoutMenuData={layoutMenuData}
                    {...currentLayout?.layoutProps}
                />
            </ConfigProvider>
        );
    }

    // 404页面
    protected getNoFoundPage() {
        const { antdConfig } = this.props;
        return (
            <ConfigProvider {...antdConfig}>
                <Result
                    status={'404'}
                    title="404"
                    subTitle={<div style={{ fontSize: 14, fontWeight: 'bold' }}>抱歉，您访问的页面不存在。</div>}
                    extra={
                        <Button type="primary" onClick={() => history.back()}>
                            返回上一页
                        </Button>
                    }
                />
            </ConfigProvider>
        );
    }
}

// 初始化应用
const initApp = (routerConfigs: LayoutConfig[]) => {
    // 跳转到默认地址或登录地址
    const routerLocation = getRouterLocation();
    routerHistory.replaceState(routerLocation.path, routerLocation.query);
    const { loginPath, defaultPath } = layoutSettings;
    if (loginPath && !window.currentUser) {
        routerHistory.push({ path: loginPath });
    } else if (lodash.trim(routerLocation.path).length <= 0 && defaultPath) {
        routerHistory.push({ path: defaultPath });
    }
    log.info('routerConfigs ->', routerConfigs);
    log.info('layoutSettings ->', layoutSettings);
    window.appComponent = ReactDOM.render(
        <ReactAppPage antdConfig={{ locale: antdZhCN }} layoutSettings={layoutSettings} routerConfigs={routerConfigs} />,
        $rootMounted
    ) as any;
    log.info('ReactDOM.render完成!');
};

// ----------------------------------------------------------------------------------- 开始初始化应用
// 初始化root div容器
initRootDiv();
// 应用初始化
getCurrentUser(layoutSettings.currentUserApi!)
    .then(() => {
        const routerConfigsCopy = lodash.cloneDeep(routerConfigs);
        // 用户已经登录
        getMenus(routerConfigsCopy, layoutSettings.menuApi!)
            .catch((reason) => {
                // 获取菜单失败
                log.error('系统菜单加载失败 -> ', reason);
                message.error('系统菜单加载失败!').then();
            })
            .finally(() => initApp(routerConfigsCopy));
    })
    .catch((reason) => {
        log.info('用户未登录 -> ', reason);
        // 当前用户未登录
        const routerConfigsCopy = lodash.cloneDeep(routerConfigs);
        initApp(routerConfigsCopy);
    });
