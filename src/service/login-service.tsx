import { message } from "antd";
import Cookies from "js-cookie";
import { request } from "@/utils/request";
import { logger } from "@/utils/logger";
import { LayoutConfig, LayoutType, routerHistory } from "@/utils/router";
import { UserSecurityContext } from "@/utils/security";

const log = logger.getLogger("src/utils/login-service.ts");

/**
 * 菜单数据转换成路由配置
 */
const menuToRoute = (menu: MenuInfo): RouterConfig => {
  const { name, icon, path, pagePath, hideMenu, hideChildrenMenu, extConfig, children } = menu;
  let ext = {};
  if (extConfig) {
    try {
      ext = JSON.parse(extConfig);
    } catch (err) {
      console.error("菜单扩展配置解析失败 -> ", menu);
      ext = {};
    }
  }
  const route: RouterConfig = { name, icon, path, pagePath, hideMenu: hideMenu !== 0, hideChildrenMenu: hideChildrenMenu !== 0, ...ext };
  if (children) {
    route.routes = [];
    children.forEach(child => route.routes?.push(menuToRoute(child)));
  }
  return route;
}

/**
 * 获取当前登录用户信息
 */
const getCurrentUser = async (securityContext: any): Promise<void> => {
  if (!securityContext) return;
  // const securityContext = {
  //   "userInfo": {
  //     "uid": "001",
  //     "password": "******",
  //     "loginName": "admin",
  //     "telephone": "13260658831",
  //     "email": "1183409807@qq.com",
  //     "expiredTime": null,
  //     "enabled": 1,
  //     "extInfo": {
  //       "registerChannel": 0,
  //       "nickname": "admin",
  //       "description": null,
  //       "updateAt": "2021-01-24 16:30:30",
  //       "avatar": null,
  //       "fromSource": 0,
  //       "createAt": "2020-12-26 13:58:49"
  //     }
  //   },
  //   "permissions": [],
  //   "roles": [
  //     "角色a"
  //   ]
  // }
  // iotapi login info
  //  const securityContext = {
  //   "ACL": {
  //   "Klht7ERlYn": {
  //     "read": true,
  //       "write": true
  //   }
  // },
  //   "createdAt": "2021-03-30T03:45:59.228Z",
  //   "department": "CUgndqoYDy",
  //   "email": "dgiot_admin@iotn2n.com",
  //   "emailVerified": true,
  //   "nick": "管理员",
  //   "objectId": "Klht7ERlYn",
  //   "phone": "",
  //   "roles": [
  //   {
  //     "alias": "系统管理员",
  //     "name": "admin",
  //     "org_type": "SW",
  //     "tag": {
  //       "appconfig": {
  //         "expires": 180000,
  //         "file": "http://127.0.0.1:1250/shapes/upload",
  //         "graphql": "http://127.0.0.1:5080/iotapi/graphql",
  //         "home": "D:/shuwa/shuwa_data_center/datacenter/file/files",
  //         "rest": "http://127.0.0.1:5080/iotapi",
  //         "secret": "TTY4NDMyMTExNjAyNTU1ODI4MTc5",
  //         "topo": "http://127.0.0.1:1350/"
  //       }
  //     }
  //   }
  // ],
  //   "sessionToken": "r:8aea077b0dceec04dc908c451d012efa",
  //   "updatedAt": "2021-10-13T01:42:11.635Z",
  //   "username": "dgiot_admin"
  // }
  log.info("getCurrentUser -> ", securityContext);
  const { userInfo = securityContext, roles = [], permissions = [] } = securityContext;
  const { extInfo = securityContext, ...restProps } = userInfo;
  window.currentUser = { ...restProps, ...extInfo };
  window.securityContext = new UserSecurityContext(userInfo, roles, permissions);
};

/**
 * 加载服务端菜单数据
 */
const getMenus = async (routerConfigs: LayoutConfig[], menuApi: string): Promise<LayoutConfig[] | undefined> => {
  if (!menuApi) return;
  const menus = await request.get(menuApi);
  const newRoutes = menus.map((menu: any) => menuToRoute(menu));
  let updated: boolean = false;
  routerConfigs.forEach(layoutConfig => {
    if (updated || layoutConfig.layout === LayoutType.Blank) return;
    updated = true;
    layoutConfig.routes = newRoutes;
  });
  if (!updated) return;
  return routerConfigs;
}

/**
 * 用户登录
 */
const userLogin = (loginData: any, loginApi: string, securityContext: any, defaultPath: string, onStart?: () => void, onFinally?: () => void): void => {
  if (!loginApi) {
    message.warn("未配置layoutSettings.loginApi").then();
    return;
  }
  if (onStart instanceof Function) onStart();
  // 设置header
  request.post(loginApi, loginData,{ headers: { 'accept': 'application/json', 'Content-Type': 'text/plain' , 'platform': 'dgiot_amis'}})
    .then((securityContext) => {
      const { sessionToken, nick, message: msg } = securityContext
      if (!sessionToken || !nick) {
        message.error(msg || "用户名/密码错误").then();
        return;
      }
      message.success(msg || "登录成功").then();
      if (securityContext) {
        // 登录成功之后 存下token
        // https://github.com/js-cookie/js-cookie#basic-usage
        Cookies.set("authorization",sessionToken, );
        getCurrentUser(securityContext).then(() => {
          window.appComponent.refreshMenu(() => {
            if (defaultPath) routerHistory.push({ path: defaultPath });
          }).then();
        });
      } else if (defaultPath) {
        routerHistory.push({ path: defaultPath });
      }
    }).finally(onFinally);
};

/**
 * 退出登录
 */
const userLogout = (logoutApi: string, loginPath: string): void => {
  window.currentUser = undefined;
  window.securityContext = undefined;
  const finallyFuc = () => {
    Cookies.remove("authorization");
    if (loginPath) routerHistory.push({ path: loginPath });
  };
  if (logoutApi) {
    request.get(logoutApi).finally(finallyFuc);
  } else {
    finallyFuc();
  }
}

export { getCurrentUser, getMenus, userLogin, userLogout }
