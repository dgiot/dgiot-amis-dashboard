/**
 * React 页面组件基础属性
 */
interface ReactPageComponentProps {
  /** 路由菜单项 */
  menuItem: RuntimeMenuItem;
  /** 当前页面location状态 */
  location: RouterLocation;
  /** 路由匹配参数 */
  match: RouteMatchParams;
}
