const fs = require('fs');
const path = './node_modules/@ant-design/icons/es/icons';
const files: Array<string> = fs.readdirSync(path);
const names: Array<string> = [];

files.forEach(function (item) {
  if (!item.toLocaleLowerCase().endsWith('.js')) {
    return;
  }
  if (item.charCodeAt(0) < 65 || item.charCodeAt(0) > 90) {
    return;
  }
  names.push(item.substring(0, item.length - 3));
});

const importStr = names.join(',\n  ');
const iconMapperStr = names.map((name) => `"${name}": AntDesignIcons.${name},\n  `).join('');
let index = 0;
const antdIconNameStr = names
  .map((name) => {
    index++;
    if (index === names.length) {
      return name;
    }
    return `${name}" |${index % 6 === 0 ? '\n  ' : ' '}"`;
  })
  .join('');

// noinspection JSUnresolvedVariable
const code = `import React, { FunctionComponent } from 'react';
import { AntdIconProps as IconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { CustomIconOptions } from '@ant-design/icons/lib/components/IconFont';
import * as AntDesignIcons from '@ant-design/icons';
// noinspection SpellCheckingInspection
const iconMapper = {
  ${iconMapperStr.trimRight()}
};
// noinspection SpellCheckingInspection
export type AntdIconName = "${antdIconNameStr}";

export interface AntdIconProps extends Omit<IconProps, "ref">, React.RefAttributes<HTMLSpanElement> {
  icon?: AntdIconName;
  type?: string;
}
const AntdIcon: FunctionComponent<AntdIconProps> = (props: AntdIconProps): React.ReactElement | null => {
  let Icon: any;
  if (props.icon) {
    Icon = iconMapper[props.icon];
  }
  if (!Icon && props.type) {
    Icon = iconMapper[props.type];
  }
  if (!Icon) {
    return null;
  }
  return (
    <Icon {...props} />
  );
};
export default AntdIcon;

export interface IconFontProps extends IconBaseProps {
  type: string;
}
export type AntdIconFont = FunctionComponent<IconFontProps>;
// noinspection JSUnusedGlobalSymbols
export const createIconFontCN = (options: CustomIconOptions): AntdIconFont => {
  return AntDesignIcons.createFromIconfontCN({ ...options });
};

// 代码使用 auto-generate.js 自动生成
`;

fs.writeFile('./src/components/AntdIcon/index.tsx', code, function (error: any) {
  if (error) {
    console.log('写入失败');
  } else {
    console.log('写入成功了');
  }
});

// console.log(code);
