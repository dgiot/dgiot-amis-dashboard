import classnames from 'classnames';
import { FormClassName } from '@/amis-types';
import { serverHost } from './server-api';

const schema = {
    type: 'page',
    title: '',
    toolbar: [],
    body: [
        // --------------------------------------------------------------- 常规表单
        {
            type: 'form',
            title: '常规表单',
            mode: 'horizontal',
            className: classnames(FormClassName.flex_label6x, FormClassName.flex_input26x),
            // submitText: "提交",
            trimValues: true,
            controls: [
                { type: 'text', name: 'f1', label: '供应商名称', required: false, placeholder: '请输入', clearable: true },
                { type: 'text', name: 'f2', label: '登录账号', required: false, placeholder: '请输入', clearable: true },
                { type: 'text', name: 'f3', label: '联系人', required: false, placeholder: '请输入', clearable: true },
                { type: 'text', name: 'f4', label: '联系人手机号', required: false, placeholder: '请输入', clearable: true },
                { type: 'text', name: 'f5', label: '供货范围', required: false, placeholder: '请输入', clearable: true },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 简单多列
        {
            type: 'form',
            title: '简单多行多列',
            mode: 'inline',
            className: classnames(FormClassName.label6x, FormClassName.input26x),
            submitText: '',
            trimValues: true,
            controls: [
                { type: 'text', name: 'f1', label: '供应商名称', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f2', label: '登录账号', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f3', label: '联系人', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f4', label: '联系人手机号', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f5', label: '供货范围', required: false, placeholder: '请输入', clearable: true },
                { type: 'button', label: '查看供货公司' },
                { type: 'html', html: '<br />' },
                { type: 'html', html: "<span style='display: inline-block; width: 95px;'></span>" },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 复杂多行多列
        {
            type: 'form',
            title: '复杂多行多列(支持不太好)',
            mode: 'inline',
            className: classnames(FormClassName.label6x, FormClassName.input26x),
            submitText: '',
            trimValues: true,
            controls: [
                { type: 'text', name: 'f5', label: '供货范围', required: false, placeholder: '请输入', clearable: true },
                { type: 'button', label: '查看供货公司' },
                { type: 'html', html: "<span style='display: inline-block; width: 8px;'></span>" },
                { type: 'text', name: 'f2', label: '登录账号', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'password', name: 'f6', label: '设置密码', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: "<span style='display: inline-block; width: 117px;'></span>" },
                { type: 'password', name: 'f7', label: '确认密码', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f3', label: '联系人', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: "<span style='display: inline-block; width: 117px;'></span>" },
                { type: 'text', name: 'f4', label: '联系人手机号', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f1', label: '供应商名称', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: "<span style='display: inline-block; width: 117px;'></span>" },
                { type: 'text', name: 'f8', label: '其他', required: false, placeholder: '请输入', clearable: true },
                { type: 'html', html: '<br />' },
                { type: 'html', html: "<span style='display: inline-block; width: 95px;'></span>" },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 表单分组
        {
            type: 'form',
            title: '表单分组',
            mode: 'inline',
            className: classnames(FormClassName.label6x, FormClassName.input26x),
            submitText: '',
            trimValues: true,
            controls: [
                {
                    type: 'fieldSet',
                    title: '供应商注册信息',
                    collapsable: true,
                    controls: [
                        { type: 'text', name: 'f2', label: '登录账号', required: false, placeholder: '请输入', clearable: true },
                        { type: 'html', html: '<br />' },
                        { type: 'password', name: 'f6', label: '设置密码', required: false, placeholder: '请输入', clearable: true },
                        { type: 'html', html: '<br />' },
                        { type: 'password', name: 'f7', label: '确认密码', required: false, placeholder: '请输入', clearable: true },
                        { type: 'html', html: '<br />' },
                        { type: 'text', name: 'f3', label: '联系人', required: false, placeholder: '请输入', clearable: true },
                        { type: 'html', html: '<br />' },
                        { type: 'text', name: 'f4', label: '联系人手机号', required: false, placeholder: '请输入', clearable: true }
                    ]
                },
                {
                    type: 'fieldSet',
                    title: '供应商业务信息',
                    collapsable: false,
                    controls: [
                        { type: 'text', name: 'f1', label: '供应商名称', required: false, placeholder: '请输入', clearable: true },
                        { type: 'html', html: '<br />' },
                        { type: 'text', name: 'f5', label: '供货范围', required: false, placeholder: '请输入', clearable: true },
                        { type: 'button', label: '查看供货公司' }
                    ]
                },
                { type: 'html', html: "<span style='display: inline-block; width: 95px;'></span>" },
                { type: 'submit', label: '提交', level: 'primary' }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' }
    ]
};
export { schema };
