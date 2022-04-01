import React, { CSSProperties } from 'react';
import { Menu } from 'antd';
import classNames from 'classnames';
import { AntdMenuClickParam, AntdMenuProps, AntdMenuSelectInfo } from '../layout-types';
import { getAntdMenuItems } from '../utils/layouts-utils';
import styles from './HeaderFirstMenu.less';

interface HeaderFirstMenuSelectParam extends AntdMenuSelectInfo {
  // /** 当前url path */
  // currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface HeaderFirstMenuClickParam extends AntdMenuClickParam {
  // /** 当前url path */
  // currentPath: string;
  /** 当前菜单数据 */
  menuData: RuntimeMenuItem;
}

interface HeaderFirstMenuProps {
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
  onMenuSelect?: (param: HeaderFirstMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  onMenuClick?: (param: HeaderFirstMenuClickParam) => void;
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

interface HeaderFirstMenuState {
}

class HeaderFirstMenu extends React.Component<HeaderFirstMenuProps, HeaderFirstMenuState> {
  public render() {
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
        style={menuStyle}
        mode="horizontal"
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
}

export { HeaderFirstMenuSelectParam, HeaderFirstMenuClickParam, HeaderFirstMenuProps, HeaderFirstMenuState, HeaderFirstMenu };
