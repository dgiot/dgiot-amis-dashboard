import React, { CSSProperties } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import { getBottomNode, getCenterNode, getTopNode } from '../utils/flex-vertical-layouts';
import { AntdInputSearchProps, AntdMenuProps, AntdMenuTheme } from '../layout-types';
import { SideSecondMenu, SideSecondMenuClickParam, SideSecondMenuOpenChangeParam, SideSecondMenuSelectParam } from './SecondMenu';
import styles from './SideMenu.less';

interface SideMenuProps {
  /** 菜单折叠状态(true:已折叠) */
  menuCollapsed: boolean;
  /** 侧边栏菜单宽度 */
  sideMenuWidth?: number;
  // ----------------------------------------------------------------------------------- SearchInput 配置
  /** 是否启用过滤菜单功能 */
  enableSearchMenu?: boolean;
  /** 默认的过滤菜单关键字 */
  searchDefaultValue?: string;
  /** 过滤菜单关键字 */
  searchValue?: string;
  /** 触发搜索菜单事件 */
  onSearchMenu?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  /** 过滤菜单关键字改变事件 */
  onSearchValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 自定义搜索输入框class样式 */
  searchClassName?: string;
  /** 自定义搜索输入框样式 */
  searchStyle?: CSSProperties;
  /** 自定义搜索输入框属性 */
  searchProps?: AntdInputSearchProps;
  // ----------------------------------------------------------------------------------- Menu 配置
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
  onSubMenuTitleClick?: () => void;
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
  // ----------------------------------------------------------------------------------- 自定义渲染逻辑
  /** 上部区域class样式 */
  topClassName?: string;
  /** 上部区域样式 */
  topStyle?: CSSProperties;
  /** 中间菜单区域class样式 */
  centreClassName?: string;
  /** 中间菜单区域样式 */
  centreStyle?: CSSProperties;
  /** 底部区域class样式 */
  bottomClassName?: string;
  /** 底部区域样式 */
  bottomStyle?: CSSProperties;
  /** 自定义顶部区域渲染逻辑 */
  topRender?: (props: Omit<SideMenuProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centreRender?: (props: Omit<SideMenuProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  bottomRender?: (props: Omit<SideMenuProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  sideMenuRender?: (props: Omit<SideMenuProps, 'sideMenuRender'>) => React.ReactNode;
  // ----------------------------------------------------------------------------------- 其他选项
  /** 是否美化滚动条 */
  beautifyScrollbar?: boolean;
  /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  autoHideScrollbar?: boolean;
  /** 自定义美化滚动条class样式 */
  scrollbarClassName?: string;
}

interface SideMenuState {
}

/** 侧边栏菜单 */
class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  /**
   * 获取搜索输入框
   */
  public getInputSearch() {
    const { menuCollapsed, enableSearchMenu, searchDefaultValue, searchValue, onSearchMenu, onSearchValueChange, searchClassName, searchStyle = {}, searchProps } = this.props;
    if (menuCollapsed || !enableSearchMenu) return undefined;
    const valueProp: AntdInputSearchProps = {};
    if (searchDefaultValue !== undefined) valueProp.defaultValue = searchDefaultValue;
    if (searchValue !== undefined) valueProp.value = searchValue;
    // console.log("getInputSearch -> ", valueProp);
    return (
      <div key="inputSearch" className={classNames(styles.inputSearch, searchClassName)} style={searchStyle}>
        <Input.Search
          {...valueProp}
          placeholder="过滤菜单"
          maxLength={16}
          onSearch={(value, event) => {
            if (onSearchMenu instanceof Function) onSearchMenu(value, event);
          }}
          onChange={(event) => {
            if (onSearchValueChange instanceof Function) onSearchValueChange(event.target.value, event);
          }}
          {...searchProps}
        />
      </div>
    );
  }

  /**
   * 获取二级菜单
   */
  public getSecondMenu() {
    const {
      menuCollapsed, menuData, menuIconScriptUrl, menuTheme, defaultSelectedKeys, selectedKeys, defaultOpenKeys, openKeys,
      menuItemRender, menuFolderRender, menuItemGroupRender, onMenuSelect, onMenuClick, onMenuOpenChange, onSubMenuTitleClick,
      menuClassName, menuStyle, menuItemClassName, menuItemStyle, menuProps, beautifyScrollbar = true, autoHideScrollbar = true,
      scrollbarClassName,
    } = this.props;
    const secondMenu = (
      <SideSecondMenu
        menuCollapsed={menuCollapsed}
        key="secondMenu"
        menuData={menuData}
        menuIconScriptUrl={menuIconScriptUrl}
        menuTheme={menuTheme}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        openKeys={openKeys}
        menuItemRender={menuItemRender}
        menuFolderRender={menuFolderRender}
        menuItemGroupRender={menuItemGroupRender}
        onMenuSelect={onMenuSelect}
        onMenuClick={onMenuClick}
        onMenuOpenChange={onMenuOpenChange}
        onSubMenuTitleClick={onSubMenuTitleClick}
        menuClassName={menuClassName}
        menuStyle={menuStyle}
        menuItemClassName={menuItemClassName}
        menuItemStyle={menuItemStyle}
        menuProps={menuProps}
      />
    );
    if (!beautifyScrollbar) return secondMenu;
    // console.log("getSecondMenu -> ", autoHideScrollbar);
    return (
      <SimpleBarReact
        key="secondMenuScrollbar"
        className={classNames(styles.simpleBar, scrollbarClassName)}
        style={{ height: '100%', width: '100%', overflowX: 'hidden' }}
        autoHide={autoHideScrollbar}
        timeout={350}
      >
        {secondMenu}
      </SimpleBarReact>
    );
  }

  public render() {
    const { sideMenuRender, ...otherProps } = this.props;
    if (sideMenuRender instanceof Function) {
      return sideMenuRender(otherProps);
    }
    // (elementMap) => {
    //   // 空白块
    //   // elementMap.set("blank", <div key="blank" style={{ height: 16 }} />);
    // }
    return (
      <>
        {/* 顶部区域 */}
        {getTopNode<SideMenuProps>(this.props, styles.sideMenuTop, (elementMap) => elementMap.set('inputSearch', this.getInputSearch()))}
        {/* 中间菜单区域 */}
        {getCenterNode<SideMenuProps>(this.props, styles.sideMenuCentre, (elementMap) => elementMap.set('secondMenu', this.getSecondMenu()))}
        {/* 底部区域 */}
        {getBottomNode<SideMenuProps>(this.props, styles.sideMenuBottom)}
      </>
    );
  }
}

export { SideMenuProps, SideMenuState, SideMenu };
