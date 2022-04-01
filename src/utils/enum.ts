import React, { CSSProperties } from 'react';

type EnumItemValue = string | number | boolean;
type EnumItemLabel = string | number | boolean;

interface EnumArrayItem {
    /** 数据值 */
    value: EnumItemValue;
    /** 数据显示值 */
    label: EnumItemLabel;
    /** 自定义显示样式 */
    style?: CSSProperties;
    /** 自定义显示组件 */
    customLabel?: React.ReactNode;

    [key: string]: any;
}

type EnumArray = EnumArrayItem[];

type MapperData = EnumArrayItem[] | { [key: string]: any };

/**
 * 获取MapperData的label用来显示
 * @param mapperData    MapperData数据
 * @param value         value值
 * @param defaultLabel  默认的label
 */
const getMapperDataLabel = (mapperData: MapperData, value: EnumItemValue, defaultLabel: EnumItemLabel = '未知'): EnumItemLabel => {
    const strValue = `${value}`;
    let label = defaultLabel;
    if (mapperData instanceof Array) {
        mapperData.forEach((item) => {
            if (item && (item.value === value || `${item.value}` === strValue)) {
                label = item.label;
            }
        });
    } else if (mapperData[strValue]) {
        label = mapperData[strValue].label;
    }
    return label;
};

/**
 * 获取MapperData的Item用来显示
 * @param mapperArray   MapperData数据
 * @param value         value值
 * @param defaultObject 默认的label
 */
const getMapperDataItem = (
    mapperArray: MapperData,
    value: EnumItemValue,
    defaultObject: EnumArrayItem = { value, label: '未知' }
): EnumArrayItem => {
    const strValue = `${value}`;
    let label = defaultObject;
    if (mapperArray instanceof Array) {
        mapperArray.forEach((item) => {
            if (item && (item.value === value || `${item.value}` === strValue)) {
                label = item;
            }
        });
    } else if (mapperArray[strValue]) {
        label = mapperArray[strValue].label;
    }
    return label;
};

/** 枚举数组转成枚举对象 */
const enum2object = (enumArray: EnumArrayItem[]): { [key: string]: any } => {
    const mapperObject: { [key: string]: any } = {};
    if (enumArray) {
        enumArray.forEach((item) => {
            mapperObject[`${item.value}`] = item.label;
        });
    }
    return mapperObject;
};

/** 排序 */
const SorterOrderArray: MapperData = [
    { value: 'descend', label: 'DESC' },
    { value: 'ascend', label: 'ASC' }
];

export {
    EnumItemValue,
    EnumItemLabel,
    EnumArrayItem,
    EnumArray,
    MapperData,
    getMapperDataLabel,
    getMapperDataItem,
    enum2object,
    SorterOrderArray
};
