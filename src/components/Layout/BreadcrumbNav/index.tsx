import React, { CSSProperties } from "react";
import { Breadcrumb } from "antd";
import { routerHistory } from "@/utils/router";
import { AntdBreadcrumbProps } from "../layout-types";
import { getMenuItemByKey, menuToRouter } from "../utils/layouts-utils";

// import styles from "./index.less";

interface BreadcrumbNavProps {
  /** 当前Layout菜单数据 */
  layoutMenuData: LayoutMenuData;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义样式 */
  className?: string;
  /** 自定义面包屑组件属性 */
  breadcrumbProps?: AntdBreadcrumbProps;
}

interface BreadcrumbNavState {
}

class BreadcrumbNav extends React.Component<BreadcrumbNavProps, BreadcrumbNavState> {

  protected getAllItem(layoutMenuData: LayoutMenuData): Array<React.ReactNode> {
    const allItem: Array<React.ReactNode> = [];
    if (!layoutMenuData) return [];
    const { flattenMenuMap, currentMenu } = layoutMenuData;
    if (!currentMenu) return [];
    const parentKeys: string[] = [...currentMenu.parentKeys];
    parentKeys.forEach(parentKey => {
      const menuItem = getMenuItemByKey(flattenMenuMap, parentKey);
      if (!menuItem || !menuItem.runtimeRouter) return;
      const { runtimeRouter } = menuItem;
      const { pagePath, openOptions } = runtimeRouter;
      const needLink = pagePath || (openOptions && openOptions.url);
      let breadcrumbContent: React.ReactNode;
      if (needLink) {
        breadcrumbContent = (
          <a onClick={() => {
            const router = menuToRouter(menuItem);
            if (!router) return;
            routerHistory.push(router);
          }}>
            {runtimeRouter.breadcrumbName}
          </a>
        );
      } else {
        breadcrumbContent = runtimeRouter.breadcrumbName;
      }
      allItem.push(<Breadcrumb.Item key={menuItem.menuKey}>{breadcrumbContent}</Breadcrumb.Item>);
    });
    allItem.push(<Breadcrumb.Item key={currentMenu.menuKey}>{currentMenu.runtimeRouter?.breadcrumbName}</Breadcrumb.Item>);
    return allItem;
  }

  public render() {
    const { layoutMenuData, style, className, breadcrumbProps = {} } = this.props;
    const allItem = this.getAllItem(layoutMenuData);
    if (!allItem || allItem.length <= 0) return <span/>;
    return (
      <Breadcrumb style={style} className={className} {...breadcrumbProps}>
        {[...allItem]}
      </Breadcrumb>
    );
  }
}

export { BreadcrumbNavProps, BreadcrumbNavState, BreadcrumbNav }
