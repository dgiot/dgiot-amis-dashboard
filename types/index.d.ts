// declare module 'antd-dayjs-webpack-plugin';
// declare module 'webpack-aliyun-oss';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

/** 是否是生产环境 */
declare const isProdEnv: boolean;

/** AmisPage 全局数据 */
interface AmisPageGlobalData {
  /** 路由菜单项 */
  menuItem: RuntimeMenuItem;
  /** 当前页面location状态 */
  location: RouterLocation;
  /** 路由匹配参数 */
  match: RouteMatchParams;
}

interface AmisPage {
  /** Dgiot Amisjson schema */
  schema: any;
  /** 页面组件名称 */
  amisPageName?: string;
  /**
   * 初始化全局数据
   * @param globalData 全局数据
   */
  initGlobalData?: (initGlobalData: AmisPageGlobalData) => void;
  /**
   * 是否需要更新页面
   * @param nextGlobalData 全局数据
   */
  shouldPageUpdate?: (nextGlobalData: AmisPageGlobalData) => boolean;
}

interface ReactPage {
  /** React组件 */
  default: any;
}

/** Amis应用 */
interface AmisApp {
  /**
   * 根据组件名称获取组件
   * @param name 组件名称
   */
  getComponentByName<C = any>(name: string): C;

  /** 获取所有组件 */
  getComponents<C = any>(): C[];

  [property: any]: any;
}

interface UserInfo {
  /** 用户ID */
  readonly uid: string,
  /** 登录名 */
  readonly loginName: string,
  /** 昵称 */
  readonly nickname: string,
  /** 头像 */
  readonly avatar?: null,
  /** 手机号 */
  readonly telephone?: string,
  /**  */
  readonly email?: string,
  /** 过期时间 */
  readonly expiredTime?: string,
  /** 启用状态 */
  readonly enabled?: string,
  /** 备注 */
  readonly description?: string,
}

interface MenuInfo {
  /** 菜单名称 */
  name: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单路径 */
  path: string;
  /** 页面路径 */
  pagePath?: string;
  /** 隐藏当前菜单和子菜单，0:隐藏，1:显示 */
  hideMenu: number;
  /** 隐藏子菜单，0:隐藏，1:显示 */
  hideChildrenMenu: number;
  /** 菜单扩展配置 */
  extConfig?: string;
  /** 子菜单 */
  children?: MenuInfo[];
}

interface SecurityContext extends UserPermission {
  /** 用户信息 */
  readonly userInfo: UserInfo;
}

interface AppComponent {
  /**
   * 刷新菜单
   * @param callback
   */
  refreshMenu(callback?: () => void): Promise<void>;
}

interface Window {
  /** 当前登录用户信息 */
  currentUser?: UserInfo;
  /** 应用安全上下文 */
  securityContext?: SecurityContext;
  /** 当前显示的amis页面div容器mounted dom id */
  currentAmisId: string;
  /** 当前应用组件(React组件) */
  appComponent: AppComponent;
  /** 当前所有的Amis页面 */
  amisPages: {
    [name: string]: AmisApp;
  }
}
