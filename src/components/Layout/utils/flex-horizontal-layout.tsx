import React, { CSSProperties } from 'react';
import classNames from 'classnames';

interface FlexHorizontalProp {
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
  leftRender?: (props: any, defaultLeftClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centerRender?: (props: any, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义右侧区域渲染逻辑 */
  rightRender?: (props: any, defaultRightClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;

  /** 其他属性 */
  [prop: string]: any;
}

type RenderPreCallBack = (elementMap: Map<String, React.ReactNode>) => void;

/**
 * 左侧区域内容
 * @param props                 组件属性
 * @param defaultLeftClassName  默认的左侧区域样式名称(less或css文件中定义的样式名)
 * @param renderPreCallBack   渲染之前的回调
 */
function getLeftNode<Prop extends FlexHorizontalProp>(props: Prop, defaultLeftClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { leftRender, ...otherProps } = props;
  if (leftRender instanceof Function) {
    return leftRender(otherProps, defaultLeftClassName, elementMap);
  }
  const { leftClassName, leftStyle = {} } = props;
  return (
    <div className={classNames(defaultLeftClassName, leftClassName)} style={leftStyle}>
      {[...elementMap.values()]}
    </div>
  );
}

/**
 * 中间动态宽度区域内容
 * @param props                   组件属性
 * @param defaultCenterClassName  默认的中间区域样式名称(less或css文件中定义的样式名)
 * @param renderPreCallBack   渲染之前的回调
 */
function getCenterNode<Prop extends FlexHorizontalProp>(props: Prop, defaultCenterClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { centerRender, ...otherProps } = props;
  if (centerRender instanceof Function) {
    return centerRender(otherProps, defaultCenterClassName, elementMap);
  }
  const { centerClassName, centerStyle = {} } = props;
  return (
    <div className={classNames(defaultCenterClassName, centerClassName)} style={centerStyle}>
      {[...elementMap.values()]}
    </div>
  );
}

/**
 * 右侧区域内容
 * @param props                 组件属性
 * @param defaultRightClassName 默认的右侧区域样式名称(less或css文件中定义的样式名)
 * @param renderPreCallBack   渲染之前的回调
 */
function getRightNode<Prop extends FlexHorizontalProp>(props: Prop, defaultRightClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { rightRender, ...otherProps } = props;
  if (rightRender instanceof Function) {
    return rightRender(otherProps, defaultRightClassName, elementMap);
  }
  const { rightClassName, rightStyle = {} } = props;
  return (
    <div className={classNames(defaultRightClassName, rightClassName)} style={rightStyle}>
      {[...elementMap.values()]}
    </div>
  );
}

export { getLeftNode, getCenterNode, getRightNode };
