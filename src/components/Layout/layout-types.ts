import React from 'react';
import { TagType } from 'antd/es/tag';
import { MenuProps } from 'antd/es/menu';
import { MenuTheme } from 'antd/es/menu/MenuContext';
import { SearchProps } from 'antd/es/input/Search';
import { SiderProps } from 'antd/es/layout';
import { BreadcrumbProps } from 'antd/es/breadcrumb';
import { PageHeaderProps } from 'antd/es/page-header';

// antd/es/menu MenuProps['onClick'] MenuClickEventHandler 函数参数
interface AntdMenuClickParam {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}

// antd/es/menu MenuProps['onSelect'] SelectEventHandler 函数参数
interface AntdMenuSelectInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
    selectedKeys?: React.Key[];
}

// antd/es/tag TagType
type AntdTagType = TagType;

// antd/es/menu MenuProps
type AntdMenuProps = MenuProps;

// antd/es/menu MenuTheme
type AntdMenuTheme = MenuTheme;

// antd/es/input/Search SearchProps
type AntdInputSearchProps = SearchProps;

// antd/es/layout SiderProps
type AntdSiderProps = SiderProps;

// antd/es/breadcrumb BreadcrumbProps
type AntdBreadcrumbProps = BreadcrumbProps;

// antd/es/page-header BreadcrumbProps
type AntdPageHeaderProps = PageHeaderProps;

/** “更多”按钮操作选项key */
type MoreButtonEventKey = 'closeLeft' | 'closeRight' | 'closeOther' | 'closeAll';

export {
    AntdMenuClickParam,
    AntdTagType,
    AntdMenuProps,
    AntdMenuSelectInfo,
    AntdMenuTheme,
    AntdInputSearchProps,
    AntdSiderProps,
    AntdBreadcrumbProps,
    AntdPageHeaderProps,
    MoreButtonEventKey
};
