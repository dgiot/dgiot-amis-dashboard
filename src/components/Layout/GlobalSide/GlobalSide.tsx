import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import SimpleBarReact from 'simplebar-react';
import appLogo from '@/assets/images/logo.png';
import { AntdMenuProps } from '../layout-types';
import { getBottomNode, getCenterNode, getTopNode } from '../utils/flex-vertical-layouts';
import { SideFirstMenu, SideFirstMenuClickParam, SideFirstMenuMode, SideFirstMenuSelectParam } from './SideFirstMenu';
import styles from './GlobalSide.less';

interface GlobalSideProps {
  // ----------------------------------------------------------------------------------- Logo 配置
  /** 系统logo图片(32 x 32) */
  logo?: React.ReactNode | false;
  /** 点击系统logo事件 */
  onLogoClick?: () => void;
  /** 自定义logo class样式 */
  logoClassName?: string;
  /** 自定义logo样式 */
  logoStyle?: CSSProperties;
  // ----------------------------------------------------------------------------------- FirstMenu 配置
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
  topRender?: (props: Omit<GlobalSideProps, 'topRender'>, defaultTopClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centreRender?: (props: Omit<GlobalSideProps, 'centreRender'>, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  bottomRender?: (props: Omit<GlobalSideProps, 'bottomRender'>, defaultBottomClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  globalSideRender?: (props: Omit<GlobalSideProps, 'globalSideRender'>) => React.ReactNode;
  // ----------------------------------------------------------------------------------- 其他选项
  /** 是否强制隐藏滚动条 */
  forceHideScrollbar?: boolean;
  /** 是否自动隐藏页面滚动条 */
  autoHideScrollbar?: boolean;
  /** 自定义美化滚动条class样式 */
  scrollbarClassName?: string;
}

interface GlobalSideState {
}

/** 全局侧边栏菜单 */
class GlobalSide extends React.Component<GlobalSideProps, GlobalSideState> {
  static defaultProps: Partial<GlobalSideProps> = {
    forceHideScrollbar: false,
    autoHideScrollbar: true,
  };

  /** 系统Logo */
  public getLogo() {
    const { logo, onLogoClick, logoClassName, logoStyle = {} } = this.props;
    if (onLogoClick instanceof Function) {
      logoStyle.cursor = 'pointer';
    }
    return (
      <div key="logo" className={classNames(styles.logo, logoClassName)} style={logoStyle} onClick={onLogoClick}>
        {logo ?? <img src={appLogo} alt="logo" style={{ width: 32 }}/>}
      </div>
    );
  }

  /** 获取一级菜单 */
  public getFirstMenu() {
    const {
      menuMode,
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
      forceHideScrollbar,
      autoHideScrollbar,
      scrollbarClassName,
    } = this.props;
    return (
      <SimpleBarReact
        key="secondMenuScrollbar"
        className={classNames(styles.simpleBar, { [styles.hiddenScrollbarVertical]: forceHideScrollbar }, scrollbarClassName)}
        style={{ height: '100%', width: '100%' }}
        autoHide={autoHideScrollbar}
        timeout={450}
      >
        <SideFirstMenu
          key="menu"
          menuMode={menuMode}
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
      </SimpleBarReact>
    );
  }

  public render() {
    const { globalSideRender, ...otherProps } = this.props;
    if (globalSideRender instanceof Function) {
      return globalSideRender(otherProps);
    }
    // (elementMap) => {
    //   // 空白块
    //   // elementMap.set("blank", <div key="blank" style={{ height: 16 }} />);
    // }
    return (
      <>
        {/* 顶部区域 */}
        {getTopNode<GlobalSideProps>(this.props, styles.globalSideTop, (elementMap) => elementMap.set('logo', this.getLogo()))}
        {/* 中间菜单区域 */}
        {getCenterNode<GlobalSideProps>(this.props, styles.globalCentre, (elementMap) => elementMap.set('firstMenu', this.getFirstMenu()))}
        {/* 底部区域 */}
        {getBottomNode<GlobalSideProps>(this.props, styles.globalBottom)}
      </>
    );
  }
}

export { GlobalSideProps, GlobalSideState, GlobalSide };
