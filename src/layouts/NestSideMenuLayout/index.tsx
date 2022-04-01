import React, { CSSProperties } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { logger } from "@/utils/logger";
import { BaseLayout, BaseLayoutProps, BaseLayoutState, DefaultSideMenuTopRender } from "@/layouts/BaseLayout";
import { AntdMenuProps } from "@/components/Layout/layout-types";
import { GlobalSide, GlobalSideProps, SideFirstMenuClickParam, SideFirstMenuMode, SideFirstMenuSelectParam } from "@/components/Layout/GlobalSide";
import { getCurrentFirstMenu, getCurrentFirstMenuKey, getFirstMenu, getFirstShowMenu, getMenuItemByKey, menuToRouter } from "@/components/Layout/utils/layouts-utils";
import styles from './index.less';
import { HeaderFirstMenuSelectParam } from "@/components/Layout/HeaderMenu";
import { routerHistory } from "@/utils/router";

const log = logger.getLogger("src/layouts/NestSideMenuLayout/index.tsx");

interface NestSideMenuLayoutProps extends BaseLayoutProps {
  // ----------------------------------------------------------------------------------- 基础配置
  // ----------------------------------------------------------------------------------- NestSideMenuLayout 扩展配置
  /** 最外层Layout容器class样式 */
  layoutClassName?: string;
  /** 最外层Layout容器样式 */
  layoutStyle?: CSSProperties;
  /** GlobalSide容器class样式 */
  globalSideClassName?: string;
  /** GlobalSide容器样式 */
  globalSideStyle?: CSSProperties;
  /** 嵌套的Layout容器class样式 */
  nestLayoutClassName?: string;
  /** 嵌套的Layout容器样式 */
  nestLayoutStyle?: CSSProperties;
  /** 侧边栏二级菜单容器class样式 */
  sideClassName?: string;
  /** 侧边栏二级菜单容器样式 */
  sideStyle?: CSSProperties;
  /** 二级嵌套的Layout容器class样式 */
  twoLevelNestLayoutClassName?: string;
  /** 二级嵌套的Layout容器样式 */
  twoLevelNestLayoutStyle?: CSSProperties;
  /** Header容器class样式 */
  headerClassName?: string;
  /** Header容器样式 */
  headerStyle?: CSSProperties;
  /** Content容器class样式 */
  contentClassName?: string;
  /** Content容器样式 */
  contentStyle?: CSSProperties;
  /** Footer容器class样式 */
  footerClassName?: string;
  /** Footer容器样式 */
  footerStyle?: CSSProperties;
  // ----------------------------------------------------------------------------------- GlobalSide 配置
  /** 系统logo图片(32 x 32) */
  globalSideLogo?: React.ReactNode | false;
  /** 点击系统logo事件 */
  globalSideOnLogoClick?: () => void;
  /** 自定义logo class样式 */
  globalSideLogoClassName?: string;
  /** 自定义logo样式 */
  globalSideLogoStyle?: CSSProperties;
  /** 菜单模式 */
  globalSideMenuMode?: SideFirstMenuMode;
  /** 菜单模式是"CustomMenu"时, 一级菜单的宽度 */
  globalSideMenuWidth?: number;
  /** 初始选中的菜单项 key 数组 */
  globalSideDefaultSelectedKeys?: string[];
  /** 当前选中的菜单项 key 数组 */
  globalSideSelectedKeys?: string[];
  /** 自定义渲染菜单项 */
  globalSideMenuItemRender?: (menu: RuntimeMenuItem, icon?: React.ReactNode) => React.ReactNode;
  /** 菜单被选中的事件(用于处理菜单跳转) */
  globalSideOnMenuSelect?: (param: SideFirstMenuSelectParam) => void;
  /** 菜单被点击MenuItem的事件(用于处理菜单跳转) */
  globalSideOnMenuClick?: (param: SideFirstMenuClickParam) => void;
  /** 自定义菜单class样式 */
  globalSideMenuClassName?: string;
  /** 自定义菜单样式 */
  globalSideMenuStyle?: CSSProperties;
  /** 自定义菜单项class样式 */
  globalSideMenuItemClassName?: string;
  /** 自定义菜单项样式 */
  globalSideMenuItemStyle?: CSSProperties;
  /** 自定义antd Menu 组件属性 */
  globalSideMenuProps?: AntdMenuProps;
  /** 上部区域class样式 */
  globalSideTopClassName?: string;
  /** 上部区域样式 */
  globalSideTopStyle?: CSSProperties;
  /** 中间菜单区域class样式 */
  globalSideCentreClassName?: string;
  /** 中间菜单区域样式 */
  globalSideCentreStyle?: CSSProperties;
  /** 底部区域class样式 */
  globalSideBottomClassName?: string;
  /** 底部区域样式 */
  globalSideBottomStyle?: CSSProperties;
  /** 自定义顶部区域渲染逻辑 */
  globalSideTopRender?: (props: Omit<GlobalSideProps, 'topRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  globalSideCentreRender?: (props: Omit<GlobalSideProps, 'centreRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  globalSideBottomRender?: (props: Omit<GlobalSideProps, 'bottomRender'>, className: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  globalSideGlobalSideRender?: (props: Omit<GlobalSideProps, 'globalSideRender'>) => React.ReactNode;
  /** 是否强制隐藏滚动条 */
  globalSideForceHideScrollbar?: boolean;
  /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  globalSideAutoHideScrollbar?: boolean;
  /** 自定义美化滚动条class样式 */
  globalSideScrollbarClassName?: string;
  // -----------------------------------------------------------------------------------
}

interface NestSideMenuLayoutState extends BaseLayoutState {
}

class NestSideMenuLayout extends BaseLayout<NestSideMenuLayoutProps, NestSideMenuLayoutState> {
  /** props的默认值 */
  static defaultProps: Readonly<Partial<NestSideMenuLayoutProps>> = {
    headerHeight: 40,
    sideMenuWidth: 160,
    sideMenuTheme: 'light',
    defaultOpen: true,
    globalSideMenuWidth: 96,
    sideMenuEnableSearchMenu: false,
    sideMenuBeautifyScrollbar: true,
    sideMenuAutoHideScrollbar: true,
  };

  constructor(props: NestSideMenuLayoutProps) {
    super(props);
    this.state = {
      menuCollapsed: false,
      sideMenuSelectedKeysMap: new Map<string, { menuKey: string; location: RouterLocation }>(),
      sideMenuOpenKeysMap: Immutable.Map<string, string[]>(),
      sideMenuSearchValueMap: Immutable.Map<string, string>(),
      activePageKey: undefined,
      multiTabs: [],
      showEditCodeModal: false,
    };
  }

  /** 全局侧边栏(一级菜单) */
  protected getGlobalSide() {
    const { layoutMenuData } = this.props;
    const {
      menuIconScriptUrl,
      globalSideLogo, globalSideOnLogoClick, globalSideLogoClassName, globalSideLogoStyle, globalSideMenuMode, globalSideDefaultSelectedKeys,
      globalSideSelectedKeys, globalSideMenuItemRender, globalSideOnMenuSelect, globalSideOnMenuClick, globalSideMenuClassName, globalSideMenuStyle,
      globalSideMenuItemClassName, globalSideMenuItemStyle, globalSideMenuProps, globalSideTopClassName, globalSideTopStyle, globalSideCentreClassName,
      globalSideCentreStyle, globalSideBottomClassName, globalSideBottomStyle, globalSideTopRender, globalSideCentreRender, globalSideBottomRender,
      globalSideGlobalSideRender, globalSideForceHideScrollbar, globalSideAutoHideScrollbar, globalSideScrollbarClassName,
    } = this.props;
    // 计算 defaultSelectedKeys selectedKeys
    // 事件 onMenuSelect
    // 扩展 menuProps? rightRender!
    let defaultSelectedKeys: string[] = [];
    let selectedKeys: string[] = [];
    const currentFirstMenuKey = getCurrentFirstMenuKey(layoutMenuData.currentMenu);
    if (currentFirstMenuKey) {
      defaultSelectedKeys = [currentFirstMenuKey];
      selectedKeys = [currentFirstMenuKey];
    }
    log.info("[getGlobalHeader] currentMenu -> ", layoutMenuData.currentMenu);
    log.info("[getGlobalHeader] selectedKeys -> ", selectedKeys);
    return (
      <GlobalSide
        logo={globalSideLogo}
        onLogoClick={globalSideOnLogoClick}
        logoClassName={globalSideLogoClassName}
        logoStyle={globalSideLogoStyle}
        menuMode={globalSideMenuMode}
        layoutMenuData={layoutMenuData}
        menuIconScriptUrl={menuIconScriptUrl}
        defaultSelectedKeys={globalSideDefaultSelectedKeys || defaultSelectedKeys}
        selectedKeys={globalSideSelectedKeys || selectedKeys}
        menuItemRender={globalSideMenuItemRender}
        onMenuSelect={(param) => {
          if (globalSideOnMenuSelect instanceof Function) globalSideOnMenuSelect(param);
          this.firstMenuOnSelect(param);
        }}
        onMenuClick={globalSideOnMenuClick}
        menuClassName={globalSideMenuClassName}
        menuStyle={globalSideMenuStyle}
        menuItemClassName={globalSideMenuItemClassName}
        menuItemStyle={globalSideMenuItemStyle}
        menuProps={globalSideMenuProps}
        topClassName={globalSideTopClassName}
        topStyle={globalSideTopStyle}
        centreClassName={globalSideCentreClassName}
        centreStyle={globalSideCentreStyle}
        bottomClassName={globalSideBottomClassName}
        bottomStyle={globalSideBottomStyle}
        topRender={globalSideTopRender}
        centreRender={globalSideCentreRender}
        bottomRender={globalSideBottomRender}
        globalSideRender={globalSideGlobalSideRender}
        forceHideScrollbar={globalSideForceHideScrollbar}
        autoHideScrollbar={globalSideAutoHideScrollbar}
        scrollbarClassName={globalSideScrollbarClassName}
      />
    );
  }

  /** 二级菜单自定义侧边栏顶部部区域渲染逻辑 */
  protected sideMenuTopRender: DefaultSideMenuTopRender = (props, className, elementMap, currentFirstMenu) => {
    const { topClassName, topStyle } = props;
    const { sideMenuWidth } = this.props;
    const menuCollapsed = this.getMenuCollapsed();
    const CollapseCursor = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    return (
      <div className={classNames(className, topClassName)} style={topStyle}>
        <div className={styles.sideMenuCollapse}>
          <div className={styles.sideMenuCollapseFill}>
            {!this.getMenuCollapsed() && (
              <span className={styles.sideMenuCollapseTitle} style={{ width: sideMenuWidth - 16 - 48 }}>
                {currentFirstMenu.runtimeRouter.name}
              </span>
            )}
          </div>
          <CollapseCursor onClick={() => this.setState({ menuCollapsed: !menuCollapsed })} className={styles.sideMenuCollapseCursor}/>
          <div className={styles.sideMenuCollapseEmpty}/>
        </div>
        {[...elementMap.values()]}
      </div>
    );
  };

  /** 页面布局内容 */
  protected getLayoutPage() {
    const {
      layoutMenuData, hideGlobalHeader, hideGlobalFooter, headerHeight, globalSideMenuMode, globalSideMenuWidth,
      layoutClassName, layoutStyle, globalSideClassName, globalSideStyle, nestLayoutClassName, nestLayoutStyle,
      sideMenuWidth,
      sideClassName, sideStyle, twoLevelNestLayoutClassName, twoLevelNestLayoutStyle, headerClassName, headerStyle,
      contentClassName, contentStyle, footerClassName, footerStyle,
    } = this.props;
    const currentFirstMenu = getCurrentFirstMenu(layoutMenuData);
    return (
      <section className={classNames(styles.layout, layoutClassName)} style={layoutStyle}>
        <aside
          className={classNames(styles.firstSideMenuLayout, globalSideClassName)}
          style={{ ...(globalSideMenuMode === SideFirstMenuMode.CustomMenu ? { width: globalSideMenuWidth } : {}), ...globalSideStyle }}
        >
          {/* 全局侧边栏 - 一级菜单 */}
          {this.getGlobalSide()}
        </aside>
        <section className={classNames(styles.nestLayout, nestLayoutClassName)} style={nestLayoutStyle}>
          {/* 二级侧边栏 - 二级级菜单 */}
          {
            currentFirstMenu && currentFirstMenu.children && currentFirstMenu.children.length > 0 &&
            <aside className={classNames(styles.layoutSide, sideClassName)} style={{ ...sideStyle, width: this.getMenuCollapsed() ? 48 : sideMenuWidth }}>
              {this.getSideMenu(undefined, this.sideMenuTopRender)}
            </aside>
          }
          <section className={classNames(styles.twoLevelNestLayout, twoLevelNestLayoutClassName)} style={twoLevelNestLayoutStyle}>
            {/* 全局页头 */}
            {
              !hideGlobalHeader &&
              <header
                className={classNames(styles.header, headerClassName)}
                style={{ ...headerStyle, ...(headerHeight ? { height: headerHeight, lineHeight: `${headerHeight}px` } : {}) }}
              >
                {this.getGlobalHeader()}
              </header>
            }
            {/* 页面内容 */}
            <main className={classNames(styles.content, contentClassName)} style={contentStyle}>
              {this.getPageContent()}
            </main>
            {/* 全局页脚 */}
            {
              !hideGlobalFooter && this.existsFooter() &&
              <footer className={classNames(styles.footer, footerClassName)} style={footerStyle}>
                {this.getGlobalFooter()}
              </footer>
            }
            {/* Dgiot AmisUI 弹窗容器 */}
            {this.getAmisModalContainer()}
          </section>
        </section>
      </section>
    );
  }

  // -----------------------------------------------------------------------------------

  /** 一级菜单选中事件 */
  protected firstMenuOnSelect(param: HeaderFirstMenuSelectParam): void {
    const { menuData } = param;
    // 点击菜单打开新页面
    if (menuData?.runtimeRouter?.openOptions?.url) {
      const options = menuData.runtimeRouter.openOptions;
      // @ts-ignore
      window.open(options.url, options.target, options.features, options.replace);
      return;
    }
    // 获取当前一级菜单下的二级菜单的 selectedKeys 对应的 RuntimeMenuItem
    const { layoutMenuData } = this.props;
    const { sideMenuSelectedKeysMap } = this.state;
    let routerMenu: RuntimeMenuItem | undefined;
    let routerMenuKey: string | undefined;
    if (menuData.menuKey) {
      const valueTmp = sideMenuSelectedKeysMap.get(menuData.menuKey);
      if (valueTmp) {
        routerMenuKey = valueTmp.menuKey;
      }
    }
    if (routerMenuKey) routerMenu = getMenuItemByKey(layoutMenuData.flattenMenuMap, routerMenuKey);
    // 获取默认的第一个 RouterMenuItem
    if (!routerMenu) routerMenu = getFirstShowMenu(menuData) || getFirstMenu(menuData);
    // console.log("headerMenuOnMenuSelect ", routerMenu, location);
    const router = menuToRouter(routerMenu);
    if (!router) return;
    routerHistory.push(router);
  }

  protected getAmisModalContainer() {
    return (
      <div id="amis-modal-container" key="amis-modal-container" className="amis-scope" style={{ height: 0 }}>
        {/*<div className="amis-routes-wrapper">*/}
        {/*<div className="a-Toast-wrap a-Toast-wrap--topRight"/>*/}
        {/*<div className="a-Page">*/}
        {/*<div className="a-Page-content">*/}
        {/*  <div className="a-Page-main">*/}
        {/*    <div className="a-Page-toolbar"/>*/}
        {/*    <div className="a-Page-body"/>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }

  render() {
    return (
      <>
        {this.getHtmlTitle()}
        {(!isProdEnv || true) && this.getEditCodeButton()}
        {this.getLayoutPage()}
      </>
    );
  }
}

export { NestSideMenuLayoutProps, NestSideMenuLayoutState, NestSideMenuLayout };
