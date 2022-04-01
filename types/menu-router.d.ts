/** 用户权限 */
interface UserPermission {
  /** 角色列表 */
  readonly roles: string[];
  /** 权限列表 */
  readonly permissions: string[];
  /** 是否拥有指定角色 */
  hasRoles: (...roles: string[]) => boolean;
  /** 是否拥有指定权限 */
  hasPermissions: (...permissions: string[]) => boolean;
  /** 是否拥有指定任意一个角色 */
  hasAnyRoles: (...roles: string[]) => boolean;
  /** 是否拥有指定任意一个权限 */
  hasAnyPermissions: (...permissions: string[]) => boolean;
}

/** 路径变量 */
type PathVariable = { [path: string]: string | number | boolean };

/** url querystring 部分 */
interface QueryString {
  [key: string]: undefined | string | string[] | QueryString | QueryString[];
}

/** 路由权限配置 */
type RouterAuthorityConfig = string | string[] | ((userPermissionInfo: UserPermission) => boolean);
/** 路由状态 */
type RouterState = { [name: string]: any };

/** Router对应的Location信息 */
interface RouterLocation {
  /** 路由页面路径 */
  path: string;
  /** 路由的querystring部分(无"?"前缀) */
  search?: string;
  /** 路由的querystring解析结果(一个对象) */
  query?: QueryString;
  /** router.push 传入的 state */
  state?: RouterState;
}

/** 页面路由跳转参数Router */
interface Router {
  /** 路由页面路径 */
  path: string;
  /** 路由的querystring解析结果(一个对象) */
  query?: QueryString;
  /** router.push 传入的 state */
  state?: RouterState;
}

/** 路由配置 */
interface RouterConfig {
  /** 路由路径(支持path-to-regexp) */
  path: string;
  /** 路由路径中有变量时，配置的路径变量对象 */
  pathVariable?: PathVariable;
  /** 设置路由路径的queryString部分 */
  querystring?: QueryString;
  /** 表示是否严格匹配，即location是否和path完全一致 */
  exact?: boolean;
  /** 页面路径(根路径为“/src/pages”) */
  pagePath?: string;
  /** 打开新页面地址的行为选项(参考:https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) */
  openOptions?: {
    /** 打开新页面地址 */
    url: string;
    /** 指定target属性或窗口的名称 */
    target?: "_self" | "_blank" | "_parent" | "_top" | string,
    /** 一个逗号分隔的项目列表 */
    features?: string,
    /** 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目 */
    replace?: boolean,
  },
  /** 路由图标 */
  icon?: string;
  /** 路由名称 */
  name: string;
  /** Html页面Title(不配置就默认取“name”) */
  pageTitle?: string;
  /** 默认展开子路由 */
  defaultOpen?: boolean;
  /** 面包屑文本(不配置就默认取“name”) */
  breadcrumbName?: string;
  /** 是否隐藏面包屑导航 */
  hideBreadcrumb?: boolean;
  /** 路由分组名称(配置才会分组，不配置就不分组) */
  groupName?: string;
  /** 隐藏当前路由和子路由 */
  hideMenu?: boolean;
  /** 隐藏子路由 */
  hideChildrenMenu?: boolean;
  /** 路由状态 */
  state?: RouterState;
  /** 路由权限控制(权限字符串或自定义函数) */
  authority?: RouterAuthorityConfig;
  /** 子路由配置 */
  routes?: RouterConfig[];
  // /** 扩展属性 */
  // [property: string]: any;
}

/** 运行时路由 */
interface RuntimeRouter extends RouterConfig {
  /** 当前路由路径 */
  path: string;
  /** 路由路径中有变量时，配置的路径变量对象 */
  pathVariable: PathVariable;
  /** 设置路由路径的queryString部分 */
  querystring: QueryString;
  /** 表示是否严格匹配，即location是否和path完全一致 */
  exact: boolean;
  /** Html页面Title(不配置就默认取“name”) */
  pageTitle: string;
  /** 面包屑文本(不配置就默认取“name”) */
  breadcrumbName: string;
  /** 是否隐藏面包屑导航 */
  hideBreadcrumb: boolean;
  /** 隐藏当前路由和子路由 */
  hideMenu: boolean;
  /** 隐藏子路由 */
  hideChildrenMenu: boolean;
  /** 路由状态 */
  state: RouterState;
  /** 子路由配置 */
  routes?: RuntimeRouter[];
  // /** 扩展属性 */
  // [property: string]: any;
}

/** 运行时菜单项 */
interface RuntimeMenuItem {
  /** 路由配置 */
  runtimeRouter: RuntimeRouter;
  /** 当前菜单唯一Key */
  menuKey: string;
  /** 当前菜单的所有上级菜单的Key数组 */
  parentKeys: string[];
  /** 子菜单项 */
  children: RuntimeMenuItem[];
  /** 根据配置规则，当前菜单是否隐藏 */
  isHide: boolean;
  /** 是否展开子菜单 */
  isOpen?: boolean;
  // /** 扩展属性 */
  // [property: string]: any;
}

/** 页面类型 */
type TabPageType = "amis" | "react" | "iframe";

/** 多页签项(多页签项) */
interface MultiTabItem {
  /** 挂载的Dom节点ID */
  mountedDomId: string,
  /** 路由菜单项 */
  menuItem: RuntimeMenuItem;
  /** 路由页签项唯一Key */
  multiTabKey: string;
  // /** 当前url路径 */
  // currentPath: string;
  /** 当前页面location状态 */
  location: RouterLocation;
  /** 路由匹配参数 */
  match: RouteMatchParams;
  /** 是否是首页 */
  isHomePage: boolean;
  /** 最后一次活动时间(时间戳) */
  lastActiveTime: number;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 当前页签加载状态 */
  loading: boolean;
  /** 页面组件类型 */
  pageType: TabPageType;
  /** 组件内容 */
  component?: any;
  /** amis页面应用对象名称 */
  amisPageName?: string;
}

/** 全局Layout菜单数据 */
interface LayoutMenuData {
  /** 所有一级菜单 */
  rootMenus: RuntimeMenuItem[];
  /** 需要显示的一级菜单 */
  showRootMenus: RuntimeMenuItem[];
  /**
   * 拍平的菜单数据
   * <pre>
   *   Map<RuntimeMenuItem.runtimeRouter.path, RuntimeMenuItem>
   * </pre>
   */
  flattenMenuMap: Map<String, RuntimeMenuItem>;
  /**
   * 拍平的菜单数据(提供外部用户使用)
   * <pre>
   *   { RuntimeMenuItem.runtimeRouter.path: MenuDataItem }
   * </pre>
   */
  flattenMenu: { [path: string]: RuntimeMenuItem };
  /** 当前访问页面对应的菜单 */
  currentMenu?: RuntimeMenuItem;
  /** 当前访问页面对应的显示菜单(显示逻辑对应关系) */
  showCurrentMenu?: RuntimeMenuItem;
  // /** 当前访问Url地址 */
  // currentPath: string;
}

/** 路由菜单设置 */
interface RouterMenuSettings {
  // /** 是否启用多语言 */
  // enableLocale?: boolean;
  /** 默认展开子菜单 */
  defaultOpen?: boolean;
}

/** 全局Layout配置 */
interface LayoutSettings {
  /** 菜单配置 */
  menu: RouterMenuSettings;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  iconScriptUrl: string;
  /** html页面title后缀 */
  htmlTitleSuffix: string;
  /** 系统登录地址(配置后只要未登录都会跳转到登录地址) */
  loginPath?: string;
  /** 默认跳转地址 */
  defaultPath?: string;
  /** 登录API接口地址 */
  loginApi?: string;
  /** 登出API接口地址 */
  logoutApi?: string;
  /** 获取当前登录用户信息API */
  currentUserApi?: string;
  /** 获取菜单数据API接口地址 */
  menuApi?: string;
}

// ----------------------------------------------------------------------------------- 页面布局配置

/** 页面布局配置基础属性 */
interface BaseLayoutConfig {
  /** 匹配路径(支持path-to-regexp) */
  path: string;
  /** 当前布局下的路由配置 */
  routes: RouterConfig[];
  /** 401未登录跳转地址 */
  401?: string,
  /** 403无权访问显示的页面组件(组件路径) */
  403?: string,
  /** 404页面不存在显示的页面组件(组件路径) */
  404?: string,
  /** 500错误显示的页面组件(组件路径) */
  500?: string,
}

/** 通用页面布局配置 */
interface GenericLayoutConfig extends BaseLayoutConfig {
  /** 页面布局类型 */
  layout: string;
  /** 页面布局配置 */
  layoutProps: object;
}

/** 页面布局配置基础属性 */
interface RuntimeBaseLayoutConfig extends BaseLayoutConfig {
  /** 当前布局下的路由 */
  routes: RuntimeRouter[];
}

/** 通用页面布局配置 */
interface RuntimeGenericLayoutConfig extends RuntimeBaseLayoutConfig {
  /** 页面布局类型 */
  layout: string;
  /** 页面布局配置 */
  layoutProps: object;
}
