import React, { CSSProperties } from 'react';
import { Empty, Menu } from 'antd';
import classNames from 'classnames';
import { defaultMenuItemRender, getMenuIcon } from '../utils/layouts-utils';
import { AntdMenuClickParam, AntdMenuProps, AntdMenuSelectInfo, AntdMenuTheme } from '../layout-types';
import styles from './SecondMenu.less';

interface SideSecondMenuSelectParam extends AntdMenuSelectInfo {
  /** 当前url path */
  currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface SideSecondMenuClickParam extends AntdMenuClickParam {
  /** 当前url path */
  currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface SideSecondMenuOpenChangeParam {
  /** 当前 openKeys */
  openKeys: string[];
  // /** 当前url path */
  // currentPath: string;
}

interface TitleEventEntityParam {
  key: string;
  domEvent: Event;
  // /** 当前url path */
  // currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface SideSecondMenuProps {
  /** 菜单折叠状态(true:已折叠) */
  menuCollapsed: boolean;
  // /** 当前url path */
  // currentPath: string;
  /** 菜单数据 */
  menuData?: RuntimeMenuItem;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  menuIconScriptUrl?: string;
  /** 侧边栏菜单主题 */
  menuTheme?: AntdMenuTheme;
  /** 初始选中的菜单项 key 数组 */
  defaultSelectedKeys?: string[];
  /** 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  /** 初始展开的 SubMenu 菜单项 key 数组 */
  defaultOpenKeys?: string[];
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys?: string[];
  /** 自定义渲染菜单项 */
  menuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 自定义渲染目录菜单 */
  menuFolderRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 自定义渲染分组菜单 */
  menuItemGroupRender?: (menuGroup: RuntimeMenuItem[], groupName: string) => React.ReactNode;
  /** 菜单被选中的事件(用于处理菜单跳转) */
  onMenuSelect?: (param: SideSecondMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  onMenuClick?: (param: SideSecondMenuClickParam) => void;
  /** 菜单SubMenu展开/关闭的事件(用于保存菜单展开状态) */
  onMenuOpenChange?: (param: SideSecondMenuOpenChangeParam) => void;
  /** 点击子菜单(SubMenu)标题的事件 */
  onSubMenuTitleClick?: (param: { menuData: RuntimeMenuItem; domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>; key: string }) => void;
  /** 自定义菜单class样式 */
  menuClassName?: string;
  /** 自定义菜单样式 */
  menuStyle?: CSSProperties;
  /** 自定义菜单项class样式 */
  menuItemClassName?: string;
  /** 自定义菜单项样式 */
  menuItemStyle?: CSSProperties;
  /** 自定义antd Menu 组件属性 */
  menuProps?: AntdMenuProps;
}

interface SideSecondMenuState {
}

class SideSecondMenu extends React.Component<SideSecondMenuProps, SideSecondMenuState> {
  protected getMenuNode(menus?: RuntimeMenuItem[]): React.ReactNode[] {
    const { menuIconScriptUrl, menuItemRender, menuFolderRender, menuItemGroupRender, onSubMenuTitleClick } = this.props;
    const nodes: React.ReactNode[] = [];
    if (!menus || menus.length <= 0) return nodes;
    // 处理菜单 Map<groupName, RuntimeMenuItem[]>
    const menuGroupMap: Map<string, RuntimeMenuItem[]> = new Map<string, RuntimeMenuItem[]>();
    menus.forEach((menu) => {
      const groupName = menu.runtimeRouter.groupName ?? '';
      const tmpArray = menuGroupMap.get(groupName);
      if (tmpArray) {
        tmpArray.push(menu);
      } else {
        menuGroupMap.set(groupName, [menu]);
      }
    });
    // console.log("getMenuNode -> ", menuGroupMap);
    menuGroupMap.forEach((menuGroup, groupName) => {
      if (!menuGroup || menuGroup.length <= 0) return;
      const menuNodeArray: React.ReactNode[] = [];
      menuGroup.forEach((menu) => {
        // 菜单图标
        const icon = getMenuIcon(menu.runtimeRouter.icon, menuIconScriptUrl);
        if (menu.children && menu.children.length > 0) {
          // 有子菜单
          menuNodeArray.push(
            <Menu.SubMenu
              key={menu.menuKey}
              title={menuFolderRender instanceof Function ? menuFolderRender(menu, icon) : this.defaultMenuFolderRender(menu, icon)}
              onTitleClick={(eventParams) => {
                if (onSubMenuTitleClick instanceof Function) onSubMenuTitleClick({ ...eventParams, menuData: menu });
              }}
            >
              {this.getMenuNode(menu.children)}
            </Menu.SubMenu>,
          );
        } else {
          // 具体菜单页面
          menuNodeArray.push(
            <Menu.Item key={menu.menuKey} disabled={false} data-menu={menu}>
              {menuItemRender instanceof Function ? menuItemRender(menu, icon) : defaultMenuItemRender(menu, icon)}
            </Menu.Item>,
          );
        }
      });
      // console.log("getMenuNode -> ", menuNodeArray);
      if (menuNodeArray.length <= 0) return;
      if (groupName) {
        // 菜单需要分组
        const title = menuItemGroupRender instanceof Function ? menuItemGroupRender(menuGroup, groupName) : this.defaultMenuItemGroupRender(menuGroup, groupName);
        nodes.push(
          <Menu.ItemGroup key={`[${groupName}]-${menuGroup[0].menuKey}`} title={title as string}>
            {menuNodeArray}
          </Menu.ItemGroup>,
        );
      } else {
        // 菜单不需要分组
        menuNodeArray.forEach((node) => nodes.push(node));
      }
    });
    return nodes;
  }

  /** 渲染目录菜单 - 默认实现 */
  protected defaultMenuFolderRender(menu: RuntimeMenuItem, icon?: React.ReactNode): React.ReactNode {
    return (
      <>
        {icon}
        <span>{menu.runtimeRouter.name}</span>
      </>
    );
  }

  /** 渲染分组菜单 - 默认实现 */
  protected defaultMenuItemGroupRender(menuGroup: RuntimeMenuItem[], groupName: string): React.ReactNode {
    return groupName;
  }

  public render() {
    const {
      menuCollapsed, menuData, menuTheme, defaultSelectedKeys, selectedKeys, defaultOpenKeys, openKeys,
      onMenuSelect, onMenuClick, onMenuOpenChange, menuClassName, menuStyle = {}, menuProps,
    } = this.props;
    if (!menuData) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>;
    // 展开keys和选择keys处理
    const keysProps: AntdMenuProps = {};
    if (defaultOpenKeys) keysProps.defaultOpenKeys = defaultOpenKeys;
    if (openKeys) keysProps.openKeys = openKeys;
    if (defaultSelectedKeys) keysProps.defaultSelectedKeys = defaultSelectedKeys;
    if (selectedKeys) keysProps.selectedKeys = selectedKeys;
    return (
      <Menu
        className={classNames(styles.secondMenu, menuClassName)}
        style={{ width: '100%', ...menuStyle }}
        {...keysProps}
        mode="inline"
        multiple={false}
        theme={menuTheme ?? 'light'}
        inlineIndent={17}
        // @ts-ignore
        collapsedWidth={48}
        siderCollapsed={menuCollapsed}
        // inlineCollapsed={menuCollapsed}
        onSelect={(eventParams) => {
          if (onMenuSelect instanceof Function) {
            // @ts-ignore
            onMenuSelect({ ...eventParams, menuData: eventParams.item.props['data-menu'] });
          }
        }}
        onClick={(eventParams) => {
          if (onMenuClick instanceof Function) {
            // @ts-ignore
            onMenuClick({ ...eventParams, menuData: eventParams.item.props['data-menu'] });
          }
        }}
        onOpenChange={(eventParams) => {
          if (onMenuOpenChange instanceof Function) onMenuOpenChange({ openKeys: eventParams as string[] });
        }}
        {...menuProps}
      >
        {this.getMenuNode(menuData.children)}
      </Menu>
    );
  }
}

export { SideSecondMenuSelectParam, SideSecondMenuClickParam, SideSecondMenuOpenChangeParam, TitleEventEntityParam, SideSecondMenuProps, SideSecondMenuState, SideSecondMenu };
