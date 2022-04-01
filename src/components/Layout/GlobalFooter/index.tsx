import React from 'react';
import classNames from 'classnames';
import { TypeEnum, variableTypeOf } from '@/utils/typeof';
import styles from './index.less';

/** 页脚连接配置 */
interface GlobalFooterLink {
  /** 唯一的 Key */
  key?: string;
  /** a 标签的 href 属性 */
  href: string;
  /** 显示内容 */
  title: React.ReactNode;
  /** a 标签的 target 属性 */
  blankTarget?: '_blank' | '_self' | '_parent' | '_top';
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义class样式 */
  className?: string;
}

interface GlobalFooterProps {
  /** 页脚链接 */
  links?: GlobalFooterLink[] | false;
  /** 页脚版权说明内容 */
  copyright?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义class样式 */
  className?: string;
  /** 自定义渲染逻辑 */
  footerRender?: (props: Omit<GlobalFooterProps, 'footerRender'>) => React.ReactNode;
}

interface GlobalFooterState {
}

/** 页脚组件 */
class GlobalFooter extends React.Component<GlobalFooterProps, GlobalFooterState> {
  render() {
    const { links, copyright, className, style = {}, footerRender } = this.props;
    if (footerRender && variableTypeOf(footerRender) === TypeEnum.function) {
      const { footerRender: _, ...globalFooterRenderParams } = this.props;
      return footerRender(globalFooterRenderParams);
    }
    if ((!links || (Array.isArray(links) && links.length === 0)) && !copyright) {
      return null;
    }
    return (
      <div className={classNames(styles.globalFooter, className)} style={style}>
        {links && (
          <div className={styles.links}>
            {links.map((link, index) => {
              const { key, href, title, blankTarget = '_blank', ...linkProp } = link;
              return (
                <a key={`${key}_${index}`} target={blankTarget} {...linkProp}>
                  {title}
                </a>
              );
            })}
          </div>
        )}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    );
  }
}

export { GlobalFooterLink, GlobalFooterProps, GlobalFooterState, GlobalFooter };
