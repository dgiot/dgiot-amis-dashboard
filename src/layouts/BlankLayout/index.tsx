import React from "react";
import { Helmet } from "react-helmet";
import lodash from "lodash";
import classNames from "classnames";
import { Button, Drawer, message, Spin } from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import SimpleBarReact from "simplebar-react";
import { logger } from "@/utils/logger";
import { TypeEnum, variableTypeOf } from "@/utils/typeof";
import { amisRender, loadAmisPageByPath, loadReactPageByPath } from "@/utils/amis-utils";
import { IFramePage } from "@/components/IFramePage";
import { base62Encode, getHtmlTitle, getPageType, routerLocationToStr } from "@/components/Layout/utils/layouts-utils";
import styles from "./index.less";

const log = logger.getLogger("src/layouts/BlankLayout/index.tsx");

interface BlankLayoutProps extends LayoutPageComponentProps {
  /** 当前Layout菜单数据 */
  layoutMenuData: LayoutMenuData;
  /** html页面title后缀 */
  htmlTitleSuffix?: string;
}

interface BlankLayoutState {
  /** 页面加载状态 */
  loading: boolean;
  /** 当前路由页面的LocationKey */
  currentLocationKey?: string;
  /** Amis组件挂载ID */
  mountedDomId?: string;
  /** 组件内容 */
  component?: any;
  /** 页面组件类型  */
  pageType: TabPageType;
  /** 是否显示编辑代码对话框 */
  showEditCodeModal: boolean;
  /** amis页面应用对象名称 */
  amisPageName?: string;
}

class BlankLayout extends React.Component<BlankLayoutProps, BlankLayoutState> {
  /** Amis代码编辑器应用 */
  protected editCodeAmisApp: AmisApp | undefined;

  constructor(props: BlankLayoutProps) {
    super(props);
    this.state = {
      loading: true,
      pageType: "amis",
      showEditCodeModal: false,
    };
  }

  componentDidMount() {
    this.showPage();
  }

  componentDidUpdate(prevProps: Readonly<BlankLayoutProps>, prevState: Readonly<BlankLayoutState>, snapshot?: any) {
    this.showPage();
  }

  render() {
    log.info("BlankLayout render");
    const { route, htmlTitleSuffix, layoutMenuData: { currentMenu } } = this.props;
    if (!currentMenu) return "BlankLayout - 404";
    const { currentLocationKey } = this.state;
    if (!currentLocationKey) return <div/>;
    return (
      <>
        <Helmet>
          <title>{getHtmlTitle(route, htmlTitleSuffix)}</title>
        </Helmet>
        {(!isProdEnv || true) && this.getEditCodeButton()}
        {this.getPage()}
        <div id="amis-modal-container" key="amis-modal-container" className="amis-scope" style={{ height: 0 }} />
      </>
    );
  }

  // -----------------------------------------------------------------------------------

  protected getPage() {
    const { loading, mountedDomId, component, pageType } = this.state;
    const { layoutMenuData: { currentMenu } } = this.props;
    if (currentMenu && pageType === "iframe") {
      return (
        <IFramePage
          defaultSrc={currentMenu.runtimeRouter.pagePath}
          style={{ height: "100%" }}
          spinProps={{ size: "large", tip: "页面加载中..." }}
        />
      );
    }
    return (
      <Spin size={"large"} delay={200} spinning={loading} tip="页面加载中..." style={{ height: "100%" }} wrapperClassName={styles.spinWrapper}>
        <SimpleBarReact className={classNames(styles.simpleBar)} autoHide={true}>
          {
            pageType === "react" ?
              (component?.default ? <component.default/> : <div/>) :
              <div id={mountedDomId} key={mountedDomId} className={styles.pageContent}/>
          }
        </SimpleBarReact>
      </Spin>
    );
  }

  /** 编辑Amis代码按钮 */
  protected getEditCodeButton() {
    const { mountedDomId, component, pageType, showEditCodeModal } = this.state;
    if (!component || pageType !== "amis") return;
    const editCodeDomId = "amisId-BlankLayout-editCodeDomId";
    if (document.getElementById(editCodeDomId) && showEditCodeModal) {
      const amisApp = amisRender(editCodeDomId, {
        type: "page",
        name: "page",
        title: "",
        toolbar: [],
        body: {
          type: "form",
          name: "form",
          title: "",
          controls: [{ type: "editor", language: "json", name: "code", label: false, disabled: false }],
          actions: [],
        },
      }, { data: { code: component.schema } });
      if (amisApp) this.editCodeAmisApp = amisApp;
    }
    return (
      <div className={styles.editCode}>
        <Button
          type={showEditCodeModal ? "default" : "primary"}
          shape={"circle"}
          size={"large"}
          icon={showEditCodeModal ? <CloseOutlined/> : <EditOutlined/>}
          onClick={() => this.setState({ showEditCodeModal: !showEditCodeModal })}
        />
        <Drawer
          title={"Amis代码"}
          visible={showEditCodeModal}
          placement={"right"}
          width={"35%"}
          mask={false}
          maskClosable={false}
          className={styles.editCodeDrawer}
          bodyStyle={{ padding: "0" }}
          forceRender={true}
          onClose={() => this.setState({ showEditCodeModal: false })}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button
                type={"primary"}
                icon={<SaveOutlined/>}
                onClick={() => {
                  if (!this.editCodeAmisApp) return;
                  const component = this.editCodeAmisApp.getComponentByName("page.form");
                  // Object.keys(component.__proto__.__proto__);
                  if (!component) return;
                  const values = component.getValues();
                  if (!values || !values.code) return;
                  try {
                    if (variableTypeOf(values.code) === TypeEnum.string) values.code = JSON.parse(values.code);
                  } catch (e) {
                    message.error("Amis代码不是正确的json格式").then();
                    return;
                  }
                  const newComponent = { ...component, schema: values.code };
                  amisRender(mountedDomId!, newComponent.schema);
                  message.success("Amis代码应用成功，页面已更新").then(undefined);
                }}
              >
                应用
              </Button>
            </div>
          }
        >
          <div id={editCodeDomId} key={editCodeDomId}/>
        </Drawer>
      </div>
    );
  }

  // -----------------------------------------------------------------------------------

  protected showPage() {
    const { currentLocationKey, amisPageName } = this.state;
    const { location, layoutMenuData: { currentMenu } } = this.props;
    if (!currentMenu) {
      if (currentLocationKey) {
        this.setState({ loading: false, currentLocationKey: undefined, mountedDomId: undefined });
      }
      // 在Window全局对象下删除已经关闭了的Amis页面应用
      if (amisPageName) {
        delete window.amisPages[amisPageName];
      }
      return;
    }
    const locationKey = base62Encode(routerLocationToStr(location));
    if (currentLocationKey === locationKey) return;
    const { pagePath } = currentMenu.runtimeRouter;
    const mountedDomId = lodash.uniqueId('amisId-');
    const pageType = getPageType(currentMenu.runtimeRouter);
    if (pageType === "amis") window.currentAmisId = mountedDomId;
    this.setState(
      { loading: true, currentLocationKey: locationKey, mountedDomId, pageType, showEditCodeModal: false },
      async () => {
        let component: any;
        let newAmisPageName: string | undefined;
        if (pageType === "react") {
          // react 组件
          component = await loadReactPageByPath(pagePath!);
        } else if (pageType === "amis") {
          // Dgiot Amis组件
          component = await loadAmisPageByPath(pagePath!);
          const amisPage = amisRender(mountedDomId, component.schema);
          newAmisPageName = component.amisPageName;
          // 把Amis页面应用挂载到Window全局对象下
          if (amisPage && newAmisPageName && variableTypeOf(newAmisPageName) === TypeEnum.string) {
            if (!window.amisPages) window.amisPages = {};
            if (window.amisPages[newAmisPageName]) {
              log.warn(`window.amisPages.${newAmisPageName}值被覆盖 | pagePath -> `, pagePath);
            }
            window.amisPages[newAmisPageName] = amisPage;
          }
        }
        // 在Window全局对象下删除已经关闭了的Amis页面应用
        if (amisPageName && amisPageName !== newAmisPageName) {
          delete window.amisPages[amisPageName];
        }
        this.setState({ loading: false, component, amisPageName: newAmisPageName });
      }
    );
  }
}

export { BlankLayoutProps, BlankLayoutState, BlankLayout };
