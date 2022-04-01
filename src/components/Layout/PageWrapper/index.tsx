import React from 'react';
import classNames from 'classnames';
import SimpleBarReact from 'simplebar-react';
import { PageContext, PageContextProps } from '../PageContext';
import styles from './index.less';

/** 页面参数 */
interface PageWrapperProps {
  // /** pageHeaderModel=“MultiTab”时，是否启用 PageHeader 组件 */
  // enablePageHeader?: boolean;
  // // ----------------------------------------------------------------------------------- MultiTab 配置
  // /** 点击跳回首页按钮事件 */
  // onClickHomeButton?: () => void;
  // /** 点击更多按钮项事件 */
  // onClickMoreButton?: (param: AntdMenuClickParam, eventKey: MoreButtonEventKey) => void;
  // /** 点击RouterTabItem上的关闭按钮事件 */
  // onCloseTab?: (multiTab: MultiTabItem) => void;
  // /** 单击RouterTabItem上的标题事件 */
  // onClickTab?: (multiTab: MultiTabItem) => void;
  // /** 左侧区域class样式 */
  // leftClassName?: string;
  // /** 左侧区域样式 */
  // leftStyle?: CSSProperties;
  // /** 中间动态宽度区域class样式 */
  // centreClassName?: string;
  // /** 中间动态宽度区域样式 */
  // centreStyle?: CSSProperties;
  // /** 左侧区域class样式 */
  // rightClassName?: string;
  // /** 左侧区域样式 */
  // rightStyle?: CSSProperties;
  // /** 多页签Tab class样式 */
  // tabClassName?: string;
  // /** 多页签Tab样式 */
  // tabStyle?: CSSProperties;
  // /** 多页签active Tab class样式 */
  // tabActiveClassName?: string;
  // /** Tab标题class样式 */
  // tabTitleClassName?: string;
  // /** Tab标题样式 */
  // tabTitleStyle?: CSSProperties;
  // /** Tab关闭按钮class样式 */
  // tabCloseClassName?: string;
  // /** Tab关闭按钮样式 */
  // tabCloseStyle?: CSSProperties;
  // /** 自定义当前选中页签渲染 */
  // activeTabRender?: (props: Omit<MultiTabNavProps, 'activeTabRender'>, tabItem: MultiTabItem, elementMap: Map<String, React.ReactNode>) => Map<String, React.ReactNode>;
  // // ----------------------------------------------------------------------------------- AntPageHeader 配置
  // /** 返回上一页 */
  // onBack?: boolean | (() => void) | string | UmiLocation;
  // /** 页面标题 */
  // pageHeaderTitle?: React.ReactNode;
  // /** 页面描述 */
  // pageHeaderSubTitle?: React.ReactNode;
  // /** title 旁的 tag 列表 */
  // pageHeaderTags?: React.ReactElement<AntdTagType> | React.ReactElement<AntdTagType>[];
  // /** 面包屑配置 */
  // pageHeaderBreadcrumb?: AntdBreadcrumbProps;
  // /** PageHeader内容 */
  // pageHeaderContent?: React.ReactNode;
  // /** 操作区，位于 title 行的行尾 */
  // pageHeaderExtra?: React.ReactNode;
  // /** PageHeader 的页脚，一般用于渲染 TabBar */
  // pageHeaderFooter?: React.ReactNode;
  // /** PageHeader扩展属性 */
  // pageHeaderProps?: AntdPageHeaderProps;
  // /** Ant PageHeader组件class样式 */
  // pageHeaderClassName?: string;
  // /** Ant PageHeader组件样式 */
  // pageHeaderStyle?: CSSProperties;
  // // ----------------------------------------------------------------------------------- PageContent 配置
  // /** 是否美化滚动条 */
  // beautifyScrollbar?: boolean;
  // /** 是否自动隐藏页面滚动条(beautifyScrollbar = true有用) */
  // autoHideScrollbar?: boolean;
  // /** 自定义美化滚动条class样式 */
  // scrollbarClassName?: string;
  // // ----------------------------------------------------------------------------------- 扩展配置
  // /** 页面class样式 */
  // contentClassName?: string;
  // /** 页面样式 */
  // contentStyle?: CSSProperties;
}

interface PageWrapperState {
}

/**
 * 页面包装器
 */
class PageWrapper extends React.Component<PageWrapperProps, PageWrapperState> {
  // 定义使用 PageContext
  static contextType = PageContext;

  // 获取PageContext值
  protected getContext(): PageContextProps {
    return this.context as PageContextProps;
  }

  // 页面内容
  protected getPageContent() {
    const { children } = this.props;
    return (
      <div className={classNames(styles.simpleBarContent)}>
        <SimpleBarReact className={classNames(styles.simpleBar)} style={{ height: '100%', width: '100%' }} autoHide={true}>
          <div className={classNames(styles.content)}>
            {children}
          </div>
        </SimpleBarReact>
      </div>
    );
  }

  public render() {
    return (
      <>
        {/* 页面内容 */}
        {this.getPageContent()}
      </>
    );
  }
}

export { PageWrapperProps, PageWrapperState, PageWrapper };
