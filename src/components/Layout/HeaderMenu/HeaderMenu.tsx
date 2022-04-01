import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { getCenterNode, getLeftNode, getRightNode } from '../utils/flex-horizontal-layout';
import appLogo from '@/assets/images/logo.png';
import { AntdMenuProps } from '../layout-types';
import { HeaderFirstMenu, HeaderFirstMenuClickParam, HeaderFirstMenuSelectParam } from './HeaderFirstMenu';
import styles from './HeaderMenu.less';

interface HeaderMenuProps {
  // ----------------------------------------------------------------------------------- Logo 配置
  /** 系统logo图片(32 x 32) */
  logo?: React.ReactNode | false;
  /** 系统标题 */
  title?: React.ReactNode;
  /** 点击系统logo事件 */
  onLogoClick?: () => void;
  /** 自定义logo class样式 */
  logoClassName?: string;
  /** 自定义logo样式 */
  logoStyle?: CSSProperties;
  // ----------------------------------------------------------------------------------- FirstMenu 配置
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
  // ----------------------------------------------------------------------------------- 自定义渲染逻辑
  /** 左侧区域class样式 */
  leftClassName?: string;
  /** 左侧区域样式 */
  leftStyle?: CSSProperties;
  /** 中间动态宽度区域class样式 */
  centreClassName?: string;
  /** 中间动态宽度区域样式 */
  centreStyle?: CSSProperties;
  /** 左侧区域class样式 */
  rightClassName?: string;
  /** 左侧区域样式 */
  rightStyle?: CSSProperties;
  /** 自定义左侧区域渲染逻辑 */
  leftRender?: (props: Omit<HeaderMenuProps, 'leftRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centreRender?: (props: Omit<HeaderMenuProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义右侧区域渲染逻辑 */
  rightRender?: (props: Omit<HeaderMenuProps, 'rightRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  headerMenuRender?: (props: Omit<HeaderMenuProps, 'headerMenuRender'>) => React.ReactNode;
}

interface HeaderMenuState {
}

class HeaderMenu extends React.Component<HeaderMenuProps, HeaderMenuState> {
  /** 系统Logo */
  public getLogo() {
    const { logo, title, onLogoClick, logoClassName, logoStyle = {} } = this.props;
    if (onLogoClick instanceof Function) {
      logoStyle.cursor = 'pointer';
    }
    return (
      <div key="logo" className={classNames(styles.logo, logoClassName)} style={logoStyle} onClick={onLogoClick}>
        {logo ?? <img src={appLogo} alt="logo" style={{ width: 36 }}/>}
        {title ?? <div className={styles.title}>Ant-Layout</div>}
      </div>
    );
  }

  /** 获取一级菜单 */
  public getFirstMenu() {
    const {
      layoutMenuData,
      menuIconScriptUrl,
      defaultSelectedKeys,
      selectedKeys,
      menuItemRender,
      onMenuSelect,
      onMenuClick,
      menuClassName,
      menuStyle,
      menuItemClassName,
      menuItemStyle,
      menuProps,
    } = this.props;
    return (
      <HeaderFirstMenu
        key="menu"
        layoutMenuData={layoutMenuData}
        menuIconScriptUrl={menuIconScriptUrl}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        menuItemRender={menuItemRender}
        onMenuSelect={onMenuSelect}
        onMenuClick={onMenuClick}
        menuClassName={menuClassName}
        menuStyle={menuStyle}
        menuItemClassName={menuItemClassName}
        menuItemStyle={menuItemStyle}
        menuProps={menuProps}
      />
    );
  }

  public render() {
    const { headerMenuRender, ...otherProps } = this.props;
    if (headerMenuRender instanceof Function) return headerMenuRender(otherProps);
    return (
      <>
        {/* 左侧区域 */}
        {getLeftNode<HeaderMenuProps>(this.props, styles.headerLeft, (elementMap) => {
          // 系统Logo
          elementMap.set('logo', this.getLogo());
          // 一级菜单
          elementMap.set('menu', this.getFirstMenu());
        })}
        {/* 中间动态宽度区域 */}
        {getCenterNode<HeaderMenuProps>(this.props, styles.headerCentre)}
        {/* 右侧区域 */}
        {getRightNode<HeaderMenuProps>(this.props, styles.headerRight)}
      </>
    );
  }
}

export { HeaderMenuProps, HeaderMenuState, HeaderMenu };
