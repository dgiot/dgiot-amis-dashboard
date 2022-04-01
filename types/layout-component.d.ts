/** 路由匹配参数 */
interface RouteMatchParams {
  /** 匹配参数 */
  params: { [param: string]: string };
  /** 是否是严格匹配 */
  isExact: boolean;
  /** 路由页面路径 */
  path: string;
}

/** 布局页面组件基础属性 */
interface LayoutPageComponentProps {
  /** 当前路由信息 */
  route: RuntimeRouter;
  /** 组件的RouterLocation信息 */
  location: RouterLocation;
  /** 路由匹配参数 */
  match: RouteMatchParams;
  /** 一级路由 */
  rootRoutes: RuntimeRouter[];
  // /** */
  // children: React.Component;
  // /** */
  // history: object;
  // /** */
  // staticContext?: object;
}

/** html页面Location信息 */
interface PageLocation {
  /** url的path部分 */
  pathname: string;
  /** url的querystring部分(无"?"前缀) */
  search: string;
  /** url的hash部分(#号后面部分) */
  hash: string;
  /** url的querystring解析结果(一个对象) */
  query: QueryString;
}
