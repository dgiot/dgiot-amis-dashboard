import React, { CSSProperties } from 'react';
import { Menu } from 'antd';
import classNames from 'classnames';
import { defaultCustomMenuItemRender, getAntdMenuItems, getMenuIcon } from '../utils/layouts-utils';
import { AntdMenuClickParam, AntdMenuProps, AntdMenuSelectInfo } from '../layout-types';
import styles from './SideFirstMenu.less';

interface SideFirstMenuSelectParam extends AntdMenuSelectInfo {
  // /** 当前url path */
  // currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface SideFirstMenuClickParam extends AntdMenuClickParam {
  // /** 当前url path */
  // currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

/** 一级菜单模式 */
enum SideFirstMenuMode {
  /** antd原生Menu组件 */
  AntdMenu = 'AntdMenu',
  /** 自定义一级菜单(可控制宽度和样式) */
  CustomMenu = 'CustomMenu',
}

interface SideFirstMenuProps {
  /** 菜单模式 AntdMenu CustomMenu */
  menuMode?: SideFirstMenuMode;
  /** 菜单数据 */
  layoutMenuData: LayoutMenuData;
  /** 自定义菜单图标字体 - iconfont.cn项目在线生成的js(地址: https://www.iconfont.cn/) */
  menuIconScriptUrl?: string;
  /** 初始选中的菜单项 key 数组 */
  defaultSelectedKeys?: string[];
  /** 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  /** 自定义渲染菜单项 */
  menuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 菜单被选中的事件(用于处理菜单跳转) */
  onMenuSelect?: (param: SideFirstMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  onMenuClick?: (param: SideFirstMenuClickParam) => void;
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

interface SideFirstMenuState {
}

/** 全局侧边栏一级菜单 */
class SideFirstMenu extends React.Component<SideFirstMenuProps, SideFirstMenuState> {
  protected getAntdMenu() {
    const {
      layoutMenuData,
      menuIconScriptUrl,
      defaultSelectedKeys,
      selectedKeys,
      menuItemRender,
      onMenuSelect,
      onMenuClick,
      menuStyle = {},
      menuProps = {},
      menuClassName,
      menuItemClassName,
      menuItemStyle,
    } = this.props;
    // 选中的菜单项 key 数组
    const selectedProps: AntdMenuProps = {};
    if (defaultSelectedKeys) {
      selectedProps.defaultSelectedKeys = defaultSelectedKeys;
    }
    if (selectedKeys) {
      selectedProps.selectedKeys = selectedKeys;
    }
    // 菜单项
    const menuNodes = getAntdMenuItems({ showRootMenus: layoutMenuData.showRootMenus!, menuIconScriptUrl, menuItemRender, menuItemClassName, menuItemStyle });
    return (
      <Menu
        className={classNames(styles.menu, menuClassName)}
        style={{ width: '100%', ...menuStyle }}
        mode="inline"
        inlineCollapsed={true}
        multiple={false}
        theme="dark"
        defaultOpenKeys={[]}
        openKeys={[]}
        {...selectedProps}
        onSelect={(param) => {
          if (onMenuSelect instanceof Function) {
            // @ts-ignore
            onMenuSelect({ ...param, menuData: param.item.props['data-menu'] });
          }
        }}
        onClick={(param) => {
          if (onMenuClick instanceof Function) {
            // @ts-ignore
            onMenuClick({ ...param, menuData: param.item.props['data-menu'] });
          }
        }}
        {...menuProps}
      >
        {menuNodes}
      </Menu>
    );
  }

  protected getCustomMenu() {
    const { menuClassName, menuStyle = {} } = this.props;
    // 菜单项
    const menuNodes = this.getCustomMenuNode();
    return (
      <div className={classNames(styles.customMenu, menuClassName)} style={menuStyle}>
        {menuNodes}
      </div>
    );
  }

  protected getCustomMenuNode(): React.ReactNode[] {
    const { layoutMenuData, menuIconScriptUrl, defaultSelectedKeys, selectedKeys, onMenuSelect, onMenuClick, menuItemRender, menuItemClassName, menuItemStyle = {} } = this.props;
    const { showRootMenus } = layoutMenuData;
    // 选中的菜单项 key 数组
    const selectedProps: AntdMenuProps = {};
    if (defaultSelectedKeys) {
      selectedProps.defaultSelectedKeys = defaultSelectedKeys;
    }
    if (selectedKeys) {
      selectedProps.selectedKeys = selectedKeys;
    }
    const nodes: React.ReactNode[] = [];
    if (showRootMenus && showRootMenus.length >= 0) {
      showRootMenus.forEach((menu) => {
        // 菜单图标
        const icon = getMenuIcon(menu.runtimeRouter.icon, menuIconScriptUrl);
        let active = false;
        if (selectedProps.defaultSelectedKeys && selectedProps.defaultSelectedKeys.findIndex((key) => key === menu.menuKey) !== -1) {
          active = true;
        }
        if (selectedProps.selectedKeys && selectedProps.selectedKeys.findIndex((key) => key === menu.menuKey) !== -1) {
          active = true;
        }
        // 菜单内容
        const node = (
          <div
            key={menu.menuKey}
            className={classNames(styles.customMenuItem, { [styles.customMenuItemActive]: active }, { [styles.customMenuItemCompact]: true }, menuItemClassName)}
            style={menuItemStyle}
            onClick={(event) => {
              const key = menu.menuKey;
              const keyPath = menu.parentKeys ?? [];
              const item = event.target as React.ReactInstance;
              const domEvent = event;
              const menuData = menu;
              if (!active && onMenuSelect instanceof Function) {
                let selectedKeysTmp = selectedProps.selectedKeys ?? selectedProps.defaultSelectedKeys ?? [];
                selectedKeysTmp = selectedKeysTmp.filter((keyTmp) => keyTmp !== menu.menuKey);
                onMenuSelect({ key, keyPath, item, domEvent, selectedKeys: selectedKeysTmp, menuData });
              }
              if (onMenuClick instanceof Function) {
                onMenuClick({ key, keyPath, item, domEvent, menuData });
              }
            }}
          >
            {menuItemRender instanceof Function ? menuItemRender(menu, icon) : defaultCustomMenuItemRender(menu, icon)}
          </div>
        );
        nodes.push(node);
      });
    }
    // console.log("getMenuNode -> ", nodes);
    return nodes;
  }

  public render() {
    const { menuMode } = this.props;
    if (menuMode === SideFirstMenuMode.AntdMenu) {
      return this.getAntdMenu();
    }
    return this.getCustomMenu();
  }
}

export { SideFirstMenuSelectParam, SideFirstMenuClickParam, SideFirstMenuMode, SideFirstMenuProps, SideFirstMenuState, SideFirstMenu };
