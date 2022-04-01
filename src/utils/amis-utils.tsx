import React from "react";
import lodash from "lodash";
import { SchemaObject } from "amis";
import { RenderOptions } from "amis/src/factory";
import { RootRenderProps } from "amis/src/Root";
import { amisRenderOptions } from './amis-render-options';
import { logger } from '@/utils/logger';

const log = logger.getLogger("src/utils/amis-utils.tsx");

/** amis组件 */
interface Amis {
  embed(mounted: string, schema: SchemaObject, props: RootRenderProps, options: RenderOptions, pathPrefix?: string): AmisApp;

  [name: string]: any;
}

/** Amis Require */
type AmisRequire = (module: string) => Amis;
declare const amisRequire: AmisRequire;

/** amis实例 */
const amis = amisRequire("amis/embed");
/** 页面root挂载点id */
const rootMountedId = "app-root";
/** 页面root挂载点dom对象 */
let $rootMounted: HTMLElement = document.getElementById(rootMountedId)!;

/** 初始化root div容器 */
const initRootDiv = function (): void {
  if (!$rootMounted) {
    $rootMounted = document.createElement('div');
    $rootMounted.id = rootMountedId;
    document.appendChild($rootMounted);
  }
}

/**
 * 渲染amis组件
 * @param mountedId   挂载点id
 * @param schema      amis schema
 * @param props       props
 * @param options     amis选项
 */
const amisRender = function (mountedId: string, schema: SchemaObject, props: RootRenderProps = {}, options: RenderOptions = {}): AmisApp {
  const ops = { ...amisRenderOptions, ...options } as RenderOptions;
  return amis.embed(`#${mountedId}`, schema, props, ops);
}

/**
 * 动态加载组件
 * @param schemaPath schema文件路径
 */
const loadDynamicComponent = async function (schemaPath: string): Promise<AmisPage | ReactPage> {
  const fileExtArr = [".ts", ".tsx", ".js", ".json"];
  let flag = false;
  fileExtArr.forEach(fileExt => {
    if (flag) return;
    if (schemaPath.endsWith(fileExt)) {
      schemaPath = schemaPath.substr(0, schemaPath.length - fileExt.length);
      flag = true;
    }
  });
  if (schemaPath.startsWith("/") || schemaPath.startsWith(".")) schemaPath = schemaPath.substring(1);
  if (schemaPath.startsWith("./")) schemaPath = schemaPath.substring(2);
  // webpack.conf.ts(splitChunks.schema.test) ---> /[\\/]src[\\/]pages[\\/].*\.(schema|react)\.(ts|tsx|js|jsx|json)$/
  return import(
    /* webpackInclude: /[\\/]src[\\/]pages[\\/].*\.(schema|react)\.(ts|tsx|js|jsx|json)$/ */
    /* webpackChunkName: "[request]" */
    `@/pages/${schemaPath}`
    );
}

/**
 * 根据schemaPath加载amis页面
 */
const loadAmisPageByPath = async function (schemaPath: string): Promise<AmisPage> {
  return loadDynamicComponent(schemaPath)
    .then(page => {
      const amisPage: AmisPage = page as AmisPage;
      if (amisPage?.schema) return amisPage;
      return {
        schema: {
          type: "page",
          title: "当前组件不是不符合Amis页面组件规则",
          body: {
            type: "html",
            html: "<pre>当前组件不是不符合Amis页面组件规则</pre>",
          },
        },
      };
    }).catch(reason => {
      // 默认的异常处理
      const jsonReason = JSON.stringify({ schemaPath, reason, msg: lodash.toString(reason) }, null, 2);
      log.error(reason);
      log.error(jsonReason);
      return {
        schema: {
          type: "page",
          title: `schema文件加载失败: ${schemaPath}`,
          body: {
            type: "html",
            html: `<pre>${jsonReason}</pre>`,
          },
        },
      };
    });
}

/**
 * 根据pagePath加载React组件
 */
const loadReactPageByPath = async function (pagePath: string): Promise<ReactPage> {
  return loadDynamicComponent(pagePath)
    .then(page => {
      const reactPage: ReactPage = page as ReactPage;
      if (reactPage?.default) return reactPage;
      return {
        default: () => <div>当前组件不符合React组件页面规则</div>,
      };
    }).catch(reason => {
      log.error(reason);
      return {
        default: () => <div>加载React组件页面失败</div>,
      };
    });
}

export { amis, rootMountedId, $rootMounted, initRootDiv, amisRender, loadDynamicComponent, loadAmisPageByPath, loadReactPageByPath };
