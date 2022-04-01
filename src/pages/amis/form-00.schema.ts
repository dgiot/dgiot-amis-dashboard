import classnames from 'classnames';
import { FormClassName, WidthClassName } from '@/amis-types';
import { statusMapper } from './enum-data';
import { serverHost } from './server-api';

// const api = {
//   api_1: "https://houtai.baidu.com/api/mock2/options/chainedOptions?waitSeconds=1&parentId=$parentId&level=$level&maxLevel=4",
// };

const treeData = [
    {
        label: 'A',
        value: 'a'
    },
    {
        label: 'B',
        value: 'b',
        children: [
            {
                label: 'B-1',
                value: 'b-1'
            },
            {
                label: 'B-2',
                value: 'b-2'
            },
            {
                label: 'B-3',
                value: 'b-3'
            }
        ]
    },
    {
        label: 'C',
        value: 'c'
    }
];

const schema = {
    type: 'page',
    title: '',
    toolbar: [],
    body: [
        // --------------------------------------------------------------- 输入框类型
        {
            type: 'form',
            title: '输入框类型',
            mode: 'horizontal',
            className: classnames(FormClassName.flex_label6x, FormClassName.flex_input26x),
            // submitText: "提交",
            controls: [
                { type: 'text', name: 'f1', label: '简单文本' },
                { type: 'textarea', name: 'f2', label: '多行文本' },
                { type: 'number', name: 'f3', label: '数字' },
                { type: 'checkbox', name: 'f6', label: '多选框' },
                { type: 'checkboxes', name: 'f7', label: '多选组', columnsCount: 3, options: statusMapper },
                { type: 'switch', name: 'f29', label: '开关' },
                { type: 'radios', name: 'f24', label: '单选框', columnsCount: 3, options: statusMapper },
                { type: 'list', name: 'f20', label: '选择列表', options: statusMapper, inputClassName: WidthClassName.width_unset },
                { type: 'date', name: 'f10', label: '日期', inputClassName: WidthClassName.width13x },
                { type: 'datetime', name: 'f11', label: '日期时间', inputClassName: WidthClassName.width13x },
                { type: 'time', name: 'f30', label: '时间选择', inputClassName: WidthClassName.width13x },
                { type: 'date-range', name: 'f12', label: '日期范围' },
                { type: 'datetime-range', name: 'f13', label: '日期时间范围' },
                { type: 'month', name: 'f14', label: '月份', inputClassName: WidthClassName.width13x },
                { type: 'select', name: 'f4', label: '下拉选择', options: statusMapper },
                { type: 'tree-select', name: 'f34', label: '树形选择器', options: treeData },
                { type: 'nested-select', name: 'f22', label: '级联选择器', options: treeData },
                { type: 'tag', name: 'f29', label: '标签选择器', options: statusMapper },
                { type: 'color', name: 'f9', label: '颜色选择', inputClassName: WidthClassName.width13x },
                { type: 'city', name: 'f8', label: '城市选择' },
                // { type: "chained-select", name: "f5", label: "级联下拉", source: api.api_1, value: "a,b" },
                { type: 'picker', name: 'f23', label: '对话框选择', options: statusMapper, inputClassName: WidthClassName.width13x },
                { type: 'tree', name: 'f33', label: '树形选择', options: treeData },
                { type: 'file', name: 'f17', label: '上传文件', reciever: `${serverHost}/iotapi/curd-page@uploadFile` },
                { type: 'image', name: 'f18', label: '上传图片', reciever: `${serverHost}/iotapi/curd-page@uploadFile` },
                { type: 'rating', name: 'f25', label: '评分' },
                { type: 'range', name: 'f26', label: '滑动输入' },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 不常用表单项
        {
            type: 'form',
            title: '不常用表单项',
            mode: 'horizontal',
            className: classnames(FormClassName.flex_label6x, FormClassName.flex_input26x),
            submitText: '',
            controls: [
                { type: 'repeat', name: 'f27', label: '频率选择器' },
                {
                    type: 'matrix',
                    name: 'f21',
                    label: '矩阵选择',
                    rowLabel: '人员',
                    columns: [{ label: '篮球' }, { label: '美术' }, { label: '音乐' }],
                    rows: [{ label: '张三' }, { label: '李四' }, { label: '王五' }]
                },
                { type: 'transfer', name: 'f31', label: '穿梭器', options: statusMapper },
                {
                    type: 'tabs-transfer',
                    name: 'f32',
                    label: '组合穿梭器',
                    inputClassName: WidthClassName.width48x,
                    selectMode: 'tree',
                    options: [
                        { label: '成员', selectMode: 'tree', children: treeData },
                        { label: '用户', selectMode: 'chained', children: treeData }
                    ]
                },
                // Array 数组输入框
                // Button 按钮
                // Button-Toolbar 按钮工具栏
                // Button-Group 按钮集合
                // Combo 组合
                // Formula 公式
                // Input-Group 输入框组合
                // Select 选择器
                // SubForm 子表单
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 编辑器
        {
            type: 'form',
            title: '编辑器',
            mode: 'horizontal',
            className: classnames(FormClassName.flex_label6x, FormClassName.flex_input26x),
            submitText: '',
            controls: [
                { type: 'rich-text', name: 'f28', label: '富文本编辑器', inputClassName: WidthClassName.width_unset },
                {
                    type: 'editor',
                    name: 'f15',
                    label: '代码编辑器',
                    language: 'json',
                    value: JSON.stringify(statusMapper, null, 2),
                    inputClassName: WidthClassName.width_unset
                },
                {
                    type: 'diff-editor',
                    name: 'f16',
                    label: '对比编辑器',
                    value: 'hello',
                    diffValue: 'hello world',
                    inputClassName: WidthClassName.width_unset
                },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        { type: 'divider' }
    ]
};
export { schema };
