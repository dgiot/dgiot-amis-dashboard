import React, { CSSProperties } from 'react';
import classNames from 'classnames';

interface FlexVerticalProp {
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
  topRender?: (props: any, defaultTopClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义中间动态宽度区域渲染逻辑 */
  centreRender?: (props: any, defaultCenterClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;
  /** 自定义底部区域渲染逻辑 */
  bottomRender?: (props: any, defaultBottomClassName: string, elementMap: Map<String, React.ReactNode>) => React.ReactNode;

  /** 其他属性 */
  [prop: string]: any;
}

type RenderPreCallBack = (elementMap: Map<String, React.ReactNode>) => void;

/**
 * 上部区域内容
 * @param props               组件属性
 * @param defaultTopClassName 默认的上部区域样式名称(less或css文件中定义的样式名)
 * @param renderPreCallBack   渲染之前的回调
 */
function getTopNode<Prop extends FlexVerticalProp>(props: Prop, defaultTopClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { topRender, ...otherProps } = props;
  if (topRender instanceof Function) {
    return topRender(otherProps, defaultTopClassName, elementMap);
  }
  const { topClassName, topStyle = {} } = props;
  return (
    <div className={classNames(defaultTopClassName, topClassName)} style={topStyle}>
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
function getCenterNode<Prop extends FlexVerticalProp>(props: Prop, defaultCenterClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { centreRender, ...otherProps } = props;
  if (centreRender instanceof Function) {
    return centreRender(otherProps, defaultCenterClassName, elementMap);
  }
  const { centreClassName, centreStyle = {} } = props;
  return (
    <div className={classNames(defaultCenterClassName, centreClassName)} style={centreStyle}>
      {[...elementMap.values()]}
    </div>
  );
}

/**
 * 底部区域内容
 * @param props                 组件属性
 * @param defaultBottomClassName 默认的底部区域样式名称(less或css文件中定义的样式名)
 * @param renderPreCallBack   渲染之前的回调
 */
function getBottomNode<Prop extends FlexVerticalProp>(props: Prop, defaultBottomClassName: string, renderPreCallBack?: RenderPreCallBack): React.ReactNode {
  const elementMap: Map<String, React.ReactNode> = new Map<String, React.ReactNode>();
  if (renderPreCallBack instanceof Function) {
    renderPreCallBack(elementMap);
  }
  // 支持自定义渲染逻辑
  const { bottomRender, ...otherProps } = props;
  if (bottomRender instanceof Function) {
    return bottomRender(otherProps, defaultBottomClassName, elementMap);
  }
  const { bottomClassName, bottomStyle = {} } = props;
  return (
    <div className={classNames(defaultBottomClassName, bottomClassName)} style={bottomStyle}>
      {[...elementMap.values()]}
    </div>
  );
}

export { getTopNode, getCenterNode, getBottomNode };
