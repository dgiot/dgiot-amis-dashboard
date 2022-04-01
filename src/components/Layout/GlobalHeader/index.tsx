import React, { CSSProperties } from 'react';
import { getCenterNode, getLeftNode, getRightNode } from '../utils/flex-horizontal-layout';
import styles from './index.less';

interface GlobalHeaderProps {
  /** 当前Layout菜单数据 */
  layoutMenuData: LayoutMenuData;
  // ----------------------------------------------------------------------------------- 自定义渲染逻辑
  /** 左侧区域class样式 */
  leftClassName?: string;
  /** 左侧区域样式 */
  leftStyle?: CSSProperties;
  /** 中间动态宽度区域class样式 */
  centerClassName?: string;
  /** 中间动态宽度区域样式 */
  centerStyle?: CSSProperties;
  /** 左侧区域class样式 */
  rightClassName?: string;
  /** 左侧区域样式 */
  rightStyle?: CSSProperties;
  /** 自定义左侧区域渲染逻辑 */
  leftRender?: (props: Omit<GlobalHeaderProps, 'leftRender'>, defaultLeftClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centerRender?: (props: Omit<GlobalHeaderProps, 'centerRender'>, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义右侧区域渲染逻辑 */
  rightRender?: (props: Omit<GlobalHeaderProps, 'rightRender'>, defaultRightClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义渲染逻辑 */
  headerRender?: (props: Omit<GlobalHeaderProps, 'headerRender'>) => React.ReactNode;
}

interface GlobalHeaderState {
}

/**
 * 全局页头
 */
class GlobalHeader extends React.Component<GlobalHeaderProps, GlobalHeaderState> {
  public render() {
    const { headerRender, ...otherProps } = this.props;
    if (headerRender instanceof Function) {
      return headerRender(otherProps);
    }
    return (
      <>
        {/* 左侧区域 */}
        {getLeftNode<GlobalHeaderProps>(this.props, styles.headerLeft)}
        {/* 中间动态宽度区域 */}
        {getCenterNode<GlobalHeaderProps>(this.props, styles.headerCenter)}
        {/* 右侧区域 */}
        {getRightNode<GlobalHeaderProps>(this.props, styles.headerRight)}
      </>
    );
  }
}

export { GlobalHeaderProps, GlobalHeaderState, GlobalHeader };
