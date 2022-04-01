import React from 'react';
import { Avatar, Dropdown, Menu } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import avatar from '@/assets/images/avatar.png';
import styles from './index.less';

enum AvatarMode {
  /** 垂直 */
  Vertical = "Vertical",
  /** 水平 */
  Horizontal = "Horizontal",
}

enum ActionKey {
  /** 个人中心 */
  PersonalCenter = "personal-center",
  /** 个人设置 */
  PersonalSettings = "personal-settings",
  /** 退出登录 */
  Logout = "log-out",
}

interface UserAvatarProps {
  /** 模式 */
  mode: AvatarMode,
  /** 头像图片地址 */
  avatarSrc?: React.ReactNode;
  /** 用户昵称 */
  nickname?: React.ReactNode;
  /** 菜单点击事件 */
  onMenuClick?: (key: ActionKey) => void;
}

interface UserAvatarState {
}

class UserAvatar extends React.Component<UserAvatarProps, UserAvatarState> {
  protected getHorizontalAvatar() {
    const { avatarSrc, nickname, onMenuClick } = this.props;
    return (
      <Dropdown
        key="avatar"
        placement={"bottomCenter"}
        overlay={
          <Menu
            style={{ width: 96 }}
            onClick={info => {
              if (!(onMenuClick instanceof Function)) return;
              onMenuClick(info.key as any);
            }}
          >
            <Menu.Item key={ActionKey.PersonalCenter} icon={<UserOutlined/>}>个人中心</Menu.Item>
            <Menu.Item key={ActionKey.PersonalSettings} icon={<SettingOutlined/>}>个人设置</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={ActionKey.Logout} icon={<LogoutOutlined/>}>退出登录</Menu.Item>
          </Menu>
        }
      >
        <div className={styles.avatarHorizontal}>
          <Avatar src={avatarSrc || avatar}/>
          <span style={{ marginLeft: 2 }}>{nickname}</span>
        </div>
      </Dropdown>
    );
  }

  protected getVerticalAvatar() {
    const { avatarSrc, nickname, onMenuClick } = this.props;
    return (
      <Menu
        key="avatar-menu"
        className={styles.avatarVertical}
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
        onClick={info => {
          if (!(onMenuClick instanceof Function)) return;
          onMenuClick(info.key as any);
        }}
        // openKeys={["avatar"]}
      >
        <Menu.SubMenu
          key="avatar"
          className={styles.nickname}
          icon={<Avatar src={avatarSrc || avatar}/>}
          popupOffset={[1, 0]}
          popupClassName={styles.menuItem}
        >
          <Menu.Item key={ActionKey.PersonalCenter} icon={<UserOutlined/>}>个人中心</Menu.Item>
          <Menu.Item key={ActionKey.PersonalSettings} icon={<SettingOutlined/>}>个人设置</Menu.Item>
          <Menu.Item key={ActionKey.Logout} icon={<LogoutOutlined/>}>退出登录</Menu.Item>
          <Menu.Divider className={styles.divider}/>
          <Menu.Item key="nickname" disabled={true}>{nickname}</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  public render() {
    const { mode } = this.props;
    switch (mode) {
      case AvatarMode.Horizontal:
        return this.getHorizontalAvatar();
      case AvatarMode.Vertical:
        return this.getVerticalAvatar();
    }
    return this.getHorizontalAvatar();
  }
}

export { AvatarMode, ActionKey, UserAvatarProps, UserAvatarState, UserAvatar }
