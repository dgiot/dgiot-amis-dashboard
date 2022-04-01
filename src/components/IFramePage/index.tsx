import React, { CSSProperties } from 'react';
import lodash from 'lodash';
import { Spin } from 'antd';
import { SpinProps } from 'antd/es/spin';
import styles from './index.less';

interface IFramePageProps {
  /** 内嵌页面地址(非受控属性，最好不要变化) */
  defaultSrc: string;
  /** 完成加载时的事件 () => boolean(返回true继续保持加载状态) */
  onload?: (iFramePage: IFramePage) => void;
  /** iframe属性 */
  iframeProps?: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
  /** Spin组件属性 */
  spinProps?: SpinProps;
  /** 最外层包装元素的className */
  className?: string;
  /** 最外层包装元素的样式 */
  style?: CSSProperties;
  /** iframe元素的className */
  iframeClassName?: string;
  /** iframe元素的样式 */
  iframeStyle: CSSProperties;
}

interface IFramePageState {
  /** 内嵌页面地址(非受控属性，最好不要变化) */
  src: string;
  /** IFrame页面加载状态 */
  loading: boolean;
}

class IFramePage extends React.Component<IFramePageProps, IFramePageState> {
  static defaultProps: Readonly<Partial<IFramePageProps>> = {};

  /** IFrameDomId */
  private readonly iframeId: string = lodash.uniqueId('iframe_');

  /** 组件初始化完成标识 */
  private initialized: boolean = false;

  constructor(props: IFramePageProps) {
    super(props);
    const { defaultSrc } = props;
    this.state = {
      src: defaultSrc,
      loading: !!(defaultSrc && lodash.trim(defaultSrc).length > 0),
    };
  }

  // 加载完成
  componentDidMount() {
    this.handleInit();
  }

  // 组件更新 prevProps
  componentDidUpdate() {
    this.handleInit();
  }

  protected getIframe() {
    const { src } = this.state;
    const { iframeProps = {}, iframeClassName, iframeStyle = {} } = this.props;
    const iframe = (
      <iframe
        id={this.iframeId}
        name={this.iframeId}
        key={this.iframeId}
        title="iframe"
        src={src}
        className={iframeClassName}
        style={{ border: 0, width: '100%', height: '100%', ...iframeStyle }}
        {...iframeProps}
      />
    );
    this.handleInit();
    return iframe;
  }

  protected handleInit() {
    if (this.initialized) return;
    const iframe = document.getElementById(this.iframeId);
    if (iframe) {
      this.initialized = true;
      iframe.onload = this.handleLoad;
    }
  }

  protected handleLoad = () => {
    const { onload } = this.props;
    if (onload instanceof Function) onload(this);
    this.setState({ loading: false });
  };

  public render() {
    const { loading } = this.state;
    const { spinProps = {}, className, style = {} } = this.props;
    return (
      <div className={className} style={{ width: '100%', height: 300, ...style }}>
        <Spin delay={100} spinning={loading} wrapperClassName={styles.spin} {...spinProps}>
          {this.getIframe()}
        </Spin>
      </div>
    );
  }

  // -------------------------------------------------------------------------------------------------------------- 外部方法

  /** 获取 iframe DOM */
  public getIFrameElement(): HTMLIFrameElement {
    return document.getElementById(this.iframeId) as HTMLIFrameElement;
  }

  /** 返回 iframe 下的 window 对象 */
  public getIFrameWindow(): Window {
    return window.frames[this.iframeId];
  }

  /** 返回 iframe 的ID (name) */
  public getIFrameID(): string {
    return this.iframeId;
  }

  /** 重新设置src */
  public setSrc(newSrc: string): void {
    const { src } = this.state;
    if (newSrc && lodash.trim(newSrc).length > 0 && lodash.trim(newSrc) !== lodash.trim(src)) {
      const iframe = this.getIFrameElement();
      if (iframe) {
        iframe.src = newSrc;
        this.setState({ loading: true });
      }
    }
  }

  /** 设置loading状态 */
  public setLoading(loading: boolean): void {
    this.setState({ loading });
  }

  /** 通过 postMessage 通信 */
  public postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void {
    const iframe = this.getIFrameElement();
    if (!iframe || !iframe.contentWindow) return;
    if (transfer && transfer.length > 0) {
      iframe.contentWindow.postMessage(message, targetOrigin, transfer);
    } else {
      iframe.contentWindow.postMessage(message, targetOrigin);
    }
  }
}

export { IFramePageProps, IFramePageState, IFramePage };
