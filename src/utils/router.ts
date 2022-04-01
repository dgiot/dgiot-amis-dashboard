import lodash from 'lodash';
import qs from 'qs';
import { Match, match, pathToRegexp } from 'path-to-regexp';
import stableStringify from 'fast-json-stable-stringify';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash.isequal';
import { BlankLayoutProps } from '@/layouts/BlankLayout';
import { NestSideMenuLayoutProps } from '@/layouts/NestSideMenuLayout';
import { hasValue, noValue } from './utils';
import { logger } from '@/utils/logger';
import { TypeEnum, variableTypeOf } from '@/utils/typeof';

const log = logger.getLogger('src/utils/router.ts');

/** 布局类型 */
enum LayoutType {
    /** 侧边栏二级路由布局(内嵌的侧边栏 - NestSideLayout) */
    NestSide = 'NestSide',
    // /** 顶部和侧边栏二级路由布局(顶部和侧边栏) */
    // TopSide = "TopSide",
    /** 空布局页 */
    Blank = 'Blank'
}

interface NestSideLayoutConfig extends BaseLayoutConfig {
    /** 页面布局类型 */
    layout: LayoutType.NestSide;
    /** 页面布局配置 */
    layoutProps: Partial<NestSideMenuLayoutProps>;
}

interface RuntimeNestSideLayoutConfig extends RuntimeBaseLayoutConfig {
    /** 页面布局类型 */
    layout: LayoutType.NestSide;
    /** 页面布局配置 */
    layoutProps: Partial<NestSideMenuLayoutProps>;
}

// interface TopSideLayoutConfig extends BaseLayoutConfig {
//   /** 页面布局类型 */
//   layout: LayoutType.TopSide;
//   /** TODO 页面布局配置 */
//   layoutProps: object;
// }

interface BlankLayoutConfig extends BaseLayoutConfig {
    /** 页面布局类型 */
    layout: LayoutType.Blank;
    /** 页面布局配置 */
    layoutProps: Partial<BlankLayoutProps>;
}

interface RuntimeBlankLayoutConfig extends RuntimeBaseLayoutConfig {
    /** 页面布局类型 */
    layout: LayoutType.Blank;
    /** 页面布局配置 */
    layoutProps: Partial<BlankLayoutProps>;
}

/** 布局配置 */
type LayoutConfig = NestSideLayoutConfig | BlankLayoutConfig; // | TopSideLayoutConfig | AmisBlankLayoutConfig

/** 布局配置 */
type RuntimeLayoutConfig = RuntimeNestSideLayoutConfig | RuntimeBlankLayoutConfig;

// -----------------------------------------------------------------------------------

// Location状态数据
interface LocationState {
    /** 路由的querystring解析结果(一个对象) */
    query: QueryString;
    /** router.push 传入的 state */
    state: RouterState;
}

/** 路由跳转工具类 */
class RouterHistory {
    /**
     * 全局路由的状态数据
     * <pre>
     *   Map<Location.hash, state>
     * </pre>
     */
    private locationStateMap = new Map<string, LocationState>();

    constructor() {}

    /**
     * 页面跳转
     * @param router 路由地址
     */
    public push(router: Router): void {
        const { path = '', query = {} } = router;
        const queryString = query ? qs.stringify(query) : '';
        let { state } = router;
        if (lodash.trim(path).length <= 0 && lodash.trim(queryString).length <= 0) return;
        if (!state) state = this.locationStateMap.get(path) ?? {};
        this.locationStateMap.set(path, { query, state });
        window.location.hash = lodash.trim(queryString).length > 0 ? `#${path}?${queryString}` : `#${path}`;
    }

    /**
     * 替换页面状态值
     * @param path  页面路径
     * @param query 路由的querystring解析结果
     * @param state 页面的状态值
     */
    public replaceState(path: string, query?: QueryString, state?: RouterState): void {
        if (!path) return;
        const locationState = this.locationStateMap.get(path) ?? { query: {}, state: {} };
        if (query) locationState.query = query;
        if (state) locationState.state = state;
        this.locationStateMap.set(path, locationState);
    }

    /**
     * 获取页面状态
     * @param path 页面路径
     */
    public getLocationState(path: string): LocationState | undefined {
        if (!path) return;
        return this.locationStateMap.get(path);
    }
}

/** 路由跳转工具 */
const routerHistory = new RouterHistory();

// 连接url path
const joinPath = (path: string, childPath: string): string => {
    path = lodash.trim(path);
    childPath = lodash.trim(childPath);
    if (path.endsWith('/')) path = path.substring(0, path.length - 1);
    if (childPath.startsWith('/')) childPath = childPath.substring(1);
    if (lodash.trim(path).length <= 0) {
        if (lodash.trim(childPath).length <= 0) {
            return '/';
        } else {
            return `/${childPath}`;
        }
    } else {
        if (lodash.trim(childPath).length <= 0) {
            return `/${path}`;
        } else {
            return `${path}/${childPath}`;
        }
    }
};

// 递归转换 RouterConfig -> RuntimeRouter
const routerToRuntime = (rootPath: string, current: RouterConfig, parent?: RuntimeRouter): RuntimeRouter | undefined => {
    const {
        path,
        pathVariable,
        querystring,
        exact,
        pagePath,
        openOptions,
        icon,
        name,
        pageTitle,
        defaultOpen,
        breadcrumbName,
        hideBreadcrumb,
        groupName,
        hideMenu,
        hideChildrenMenu,
        state,
        authority,
        routes: childRoutes,
        ...props
    } = current;
    // 菜单权限控制
    let flag: boolean = true;
    if (authority) {
        if (variableTypeOf(authority) === TypeEnum.string) {
            flag = !!window.securityContext && window.securityContext.hasPermissions(authority as any);
        } else if (variableTypeOf(authority) === TypeEnum.array) {
            flag = !!window.securityContext && window.securityContext.hasPermissions(authority as any);
        } else if (authority instanceof Function) {
            flag = !!window.securityContext && authority(window.securityContext);
        } else {
            log.error('authority类型错误 -> ', current);
        }
    }
    if (!flag) return;
    // 默认值处理
    current.path = parent ? joinPath(parent.path, path) : joinPath(rootPath, path);
    current.pathVariable = pathVariable ?? {};
    current.querystring = querystring ?? {};
    current.exact = exact ?? false;
    current.name = name ?? '新页面';
    current.pageTitle = pageTitle ?? current.name;
    current.breadcrumbName = breadcrumbName ?? current.name;
    current.hideBreadcrumb = hideBreadcrumb ?? false;
    current.hideMenu = hideMenu ?? false;
    current.hideChildrenMenu = hideChildrenMenu ?? false;
    current.state = state ?? {};
    // 创建运行时对象
    const runtimeRouter: RuntimeRouter = {
        path: current.path,
        pathVariable: current.pathVariable,
        querystring: current.querystring,
        exact: current.exact,
        pagePath,
        openOptions,
        icon,
        name,
        pageTitle: current.pageTitle,
        defaultOpen,
        breadcrumbName: current.breadcrumbName,
        hideBreadcrumb: current.hideBreadcrumb,
        groupName,
        hideMenu: current.hideMenu,
        hideChildrenMenu: current.hideChildrenMenu,
        state: current.state,
        authority,
        routes: [],
        ...props
    };
    // 递归调用
    if (childRoutes && childRoutes.length > 0) {
        childRoutes.forEach((childRoute) => {
            const tmpRoute = routerToRuntime(rootPath, childRoute, runtimeRouter);
            if (tmpRoute) runtimeRouter.routes?.push(tmpRoute);
        });
    }
    return runtimeRouter;
};

/** 把Layout配置转换成运行时Layout */
const layoutToRuntime = (routerConfigs: LayoutConfig[]): RuntimeLayoutConfig[] => {
    if (!routerConfigs || routerConfigs.length <= 0) return routerConfigs as RuntimeLayoutConfig[];
    routerConfigs.forEach((routerConfig) => {
        const { path: rootPath, routes } = routerConfig;
        if (!routes || routes.length <= 0) return;
        const runtimeRouters: RuntimeRouter[] = [];
        routes.forEach((currentRoute) => {
            const tmpRoute = routerToRuntime(rootPath, currentRoute);
            if (tmpRoute) runtimeRouters.push(tmpRoute);
        });
        routerConfig.routes = runtimeRouters;
    });
    return routerConfigs as RuntimeLayoutConfig[];
};

// 获取菜单key(唯一不重复)
const getMenuKey = (runtimeRouter: RuntimeRouter): string => {
    const { path, exact, pathVariable, querystring, name } = runtimeRouter;
    return `${path}|${exact}|${stableStringify(pathVariable ?? {})}|${stableStringify(querystring ?? {})}|${name}`;
};

/** 把Router转换成Menu(递归) */
const routerToMenu = (menuSettings: RouterMenuSettings, runtimeRouter: RuntimeRouter, parent?: RuntimeMenuItem): RuntimeMenuItem => {
    const currentMenu: RuntimeMenuItem = { runtimeRouter, menuKey: getMenuKey(runtimeRouter), parentKeys: [], children: [], isHide: false };
    if (parent) {
        currentMenu.parentKeys = [...parent.parentKeys, parent.menuKey];
        parent.children.push(currentMenu);
    }
    // 根据配置规则，当前菜单是否隐藏
    let isHide = false;
    if (parent && parent.isHide) {
        // 上级菜单隐藏-子菜单一定隐藏
        isHide = true;
    } else if (runtimeRouter.hideMenu) {
        // 需要隐藏当前菜单
        isHide = true;
    } else if (parent && parent.runtimeRouter.hideChildrenMenu) {
        // 上级菜单设置要隐藏子菜单
        isHide = true;
    }
    currentMenu.isHide = isHide;
    // 根据配置规则，当前菜单是否展开状态
    currentMenu.isOpen = hasValue(runtimeRouter.defaultOpen) ? runtimeRouter.defaultOpen : menuSettings.defaultOpen ?? true;
    // 递归调用
    if (runtimeRouter.routes && runtimeRouter.routes.length > 0) {
        runtimeRouter.routes.forEach((child) => routerToMenu(menuSettings, child, currentMenu));
    }
    return currentMenu;
};

// /**
//  * 把Router转换成Menu(递归) - 使用memoizeOne优化性能
//  */
// const routerToMenu = memoizeOne(routerToMenuInner, isEqual);

// 路由匹配
const routerMatch = (pathHash: string, runtimeRouter: RuntimeRouter): RuntimeRouter | undefined => {
    if (noValue(pathHash) || noValue(runtimeRouter)) return;
    // 存在子路由 - 递归匹配
    if (runtimeRouter.routes && runtimeRouter.routes.length > 0) {
        let matchRuntimeRouter: RuntimeRouter | undefined;
        runtimeRouter.routes.forEach((route) => {
            if (matchRuntimeRouter) return;
            // 递归匹配
            matchRuntimeRouter = routerMatch(pathHash, route);
        });
        if (matchRuntimeRouter) return matchRuntimeRouter;
    }
    // 路径匹配
    if (runtimeRouter.exact && runtimeRouter.path === pathHash) {
        return runtimeRouter;
    } else if (pathToRegexp(runtimeRouter.path).test(pathHash)) {
        return runtimeRouter;
    }
    return;
};

interface LayoutMatchResult {
    /** 匹配的布局配置 */
    matchedLayout: RuntimeLayoutConfig;
    /** 匹配的路由 */
    matchedRouter?: RuntimeRouter;
}

/** Layout匹配(递归) */
const layoutMatchInner = (pathHash: string, runtimeLayouts: RuntimeLayoutConfig[]): LayoutMatchResult | undefined => {
    if (!runtimeLayouts || noValue(pathHash) || runtimeLayouts.length <= 0) return;
    let matchedFirstLayout: RuntimeLayoutConfig | undefined = undefined;
    let matchedLayout: RuntimeLayoutConfig | undefined;
    let matchedRouter: RuntimeRouter | undefined = undefined;
    runtimeLayouts.forEach((runtimeLayout) => {
        if (matchedLayout) return;
        const { path, routes } = runtimeLayout;
        if (!pathToRegexp(path, undefined, { end: false }).test(pathHash)) {
            return;
        }
        matchedFirstLayout = runtimeLayout;
        if (!routes || routes.length <= 0) {
            return;
        }
        routes.forEach((route) => {
            if (matchedRouter) return;
            matchedRouter = routerMatch(pathHash, route);
        });
        if (matchedRouter) {
            matchedLayout = runtimeLayout;
        }
    });
    if (!matchedLayout) matchedLayout = matchedFirstLayout;
    if (matchedLayout) {
        return { matchedLayout, matchedRouter };
    }
    return;
};
/**
 * Layout匹配(递归) - 使用memoizeOne优化性能
 */
const layoutMatch = memoizeOne(layoutMatchInner, isEqual);

// 查找菜单
const findMenu = (router: RuntimeRouter, menu: RuntimeMenuItem): RuntimeMenuItem | undefined => {
    if (menu.runtimeRouter === router) return menu;
    if (menu.runtimeRouter.path === router.path) return menu;
    if (!menu.children || menu.children.length <= 0) {
        return;
    }
    // 递归查找
    let result: RuntimeMenuItem | undefined = undefined;
    menu.children.forEach((childMenu) => {
        if (result) return;
        result = findMenu(router, childMenu);
    });
    return result;
};

interface LocationHashMatchResult {
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

/** 页面路径匹配路由菜单等信息 */
const locationHashMatchInner = (
    layoutSettings: LayoutSettings,
    pathHash: string,
    runtimeLayouts: RuntimeLayoutConfig[]
): LocationHashMatchResult | undefined => {
    const { menu: menuSettings } = layoutSettings;
    const matched = layoutMatch(pathHash, runtimeLayouts);
    if (!matched) return;
    const rootMenus: RuntimeMenuItem[] = [];
    matched.matchedLayout.routes.forEach((route) => rootMenus.push(routerToMenu(menuSettings, route)));
    let currentMenu: RuntimeMenuItem | undefined = undefined;
    let matchParams: Match<RouteMatchParams['params']> | undefined;
    if (matched.matchedRouter) {
        rootMenus.forEach((rootMenu) => {
            if (currentMenu) return;
            currentMenu = findMenu(matched.matchedRouter!, rootMenu);
        });
        const matchFuc = match<RouteMatchParams['params']>(matched.matchedRouter.path);
        matchParams = matchFuc(pathHash);
    } else if (matched.matchedLayout && matched.matchedLayout['404'] && pathHash !== matched.matchedLayout.path) {
        // 404页面路由处理
        matched.matchedRouter = routerToRuntime('/', { path: pathHash, pagePath: matched.matchedLayout['404'], name: '404-页面不存在' })!;
        currentMenu = routerToMenu(menuSettings, matched.matchedRouter);
    }
    const matchInfo: RouteMatchParams = {
        isExact: matched.matchedRouter?.path === pathHash,
        path: pathHash,
        params: matchParams ? matchParams.params ?? {} : {}
    };
    return { currentLayout: matched.matchedLayout, currentRouter: matched.matchedRouter, currentMenu, rootMenus, match: matchInfo };
};

/**
 * 页面路径匹配路由菜单等信息 - 使用memoizeOne优化性能
 */
const locationHashMatch = memoizeOne(locationHashMatchInner, isEqual);

export { LayoutType, LayoutConfig, RuntimeLayoutConfig, routerHistory, layoutToRuntime, routerToMenu, layoutMatch, locationHashMatch };
