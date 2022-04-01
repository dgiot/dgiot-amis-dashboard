import classnames from 'classnames';
import { FormClassName, HeightClassName } from '@/amis-types';
import { serverHost } from './server-api';

const schema = {
    type: 'page',
    title: '',
    toolbar: [],
    body: [
        // --------------------------------------------------------------- 支持的校验类型
        {
            type: 'form',
            title: '支持的校验类型',
            mode: 'inline',
            className: classnames(FormClassName.label6x, FormClassName.input26x, FormClassName.item_height3_5x),
            data: {
                f2: 'init-f2',
                f3: 'init-f3'
            },
            // submitText: "提交",
            trimValues: false,
            controls: [
                { type: 'text', name: 'f1', label: '随意填', placeholder: '随意填' },
                { type: 'text', name: 'f2', label: '必填', placeholder: '必填', required: true },
                {
                    type: 'text',
                    name: 'f2-1',
                    label: '非空字符',
                    placeholder: '不能填空字符',
                    required: true,
                    validations: { notEmptyString: true }
                },
                { type: 'text', name: 'f3', label: '邮箱', placeholder: '必须是Email', required: true, validations: { isEmail: true } },
                { type: 'text', name: 'f4', label: '网站地址', placeholder: '必须是Url', required: true, validations: { isUrl: true } },
                // {type: "text", name: "f4-1", label: "URL路径", placeholder: "必须是url路径", required: true, validations: {isUrlPath: true}},
                { type: 'text', name: 'f5', label: '数字', placeholder: '必须是数值', required: true, validations: { isNumeric: true } },
                { type: 'text', name: 'f6', label: '字母', placeholder: '必须是字母', required: true, validations: { isAlpha: true } },
                {
                    type: 'text',
                    name: 'f7',
                    label: '字母或数字',
                    placeholder: '必须是字母或者数字',
                    required: true,
                    validations: { isAlphanumeric: true }
                },
                { type: 'text', name: 'f8', label: '整数', placeholder: '必须是整数', required: true, validations: { isInt: true } },
                {
                    type: 'text',
                    name: 'f9',
                    label: '整数或小数',
                    placeholder: '必须是整数或小数',
                    required: true,
                    validations: { isFloat: true }
                },
                {
                    type: 'text',
                    name: 'f10',
                    label: '长度限制',
                    placeholder: '长度必须是6',
                    required: true,
                    validations: { isLength: 6 }
                },
                {
                    type: 'text',
                    name: 'f11',
                    label: '长度限制',
                    placeholder: '长度在6~10',
                    required: true,
                    validations: { minLength: 6, maxLength: 10 }
                },
                {
                    type: 'text',
                    name: 'f12',
                    label: '数值限制',
                    placeholder: '数值在6~10.5',
                    required: true,
                    validations: { minimum: 6, maximum: 10.5 }
                },
                {
                    type: 'text',
                    name: 'f13',
                    label: '必须填AAA',
                    placeholder: '必须填AAA',
                    required: true,
                    validations: { equals: 'AAA' }
                },
                {
                    type: 'text',
                    name: 'f14',
                    label: '密码',
                    placeholder: '随意填密码',
                    required: true
                },
                {
                    type: 'text',
                    name: 'f15',
                    label: '确认密码',
                    placeholder: '必须与密码一致',
                    required: true,
                    validations: { equalsField: 'f14' }
                },
                {
                    type: 'text',
                    name: 'f16',
                    label: 'Json',
                    placeholder: '必须是合法的Json字符串',
                    required: true,
                    validations: { isJson: true }
                },
                {
                    type: 'text',
                    name: 'f17',
                    label: '正则匹配',
                    placeholder: '必须以“aaa”结尾',
                    required: true,
                    validations: { matchRegexp: /.+aaa$/ }
                },
                {
                    type: 'text',
                    name: 'f18',
                    label: '自定义函数',
                    placeholder: '自定义函数校验，只能填“a”、“b”、“c”',
                    validate: (values: any, value: any): any => {
                        if (!value) {
                            return '自定义函数校验 - 必填';
                        }
                        if (['a', 'b', 'c'].indexOf(value) === -1) {
                            return '自定义函数校验 - 只能填“a”、“b”、“c”';
                        }
                    }
                },
                { type: 'html', html: '<br />' },
                { type: 'submit', label: '提交', level: 'primary', className: HeightClassName.height_unset },
                {
                    type: 'reset',
                    label: '重置',
                    className: HeightClassName.height_unset,
                    onClick: (event: any, context: any) => {
                        const formStore = context.formStore;
                        formStore.data.f2 = '';
                        formStore.updateData();
                    }
                }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@mockSubmit`
            }
        },
        { type: 'divider' },
        // --------------------------------------------------------------- 服务端校验
        {
            type: 'form',
            title: '服务端校验(支持较弱)',
            mode: 'inline',
            className: classnames(FormClassName.label4x, FormClassName.input26x, FormClassName.item_height3_5x),
            // submitText: "提交",
            trimValues: false,
            // onChange: (values: any, diff: any, props: any) => {
            //   // console.log("form--->", values, diff);
            //   if (values.f1 !== diff.__prev.f1) {
            //     values.f3 = "AAA";
            //     props.store.updateData(values);
            //   }
            // },
            controls: [
                { type: 'text', name: 'f1', label: '随意填1', placeholder: '只能填“aaa”' },
                { type: 'html', html: '<br />' },
                {
                    type: 'text',
                    name: 'f2',
                    label: '随意填2',
                    placeholder: '只能填“bbb”'
                    // onChange: function (value: any, oldValue: any, model: any, form: any) {
                    //   form.setValueByName('f3', 'CCC');
                    // }
                },
                { type: 'html', html: '<br />' },
                { type: 'text', name: 'f3', label: '随意填3', placeholder: '只能填“ccc”' },
                { type: 'html', html: '<br />' },
                { type: 'formula', name: 'f3', value: '', formula: "'BBB'", condition: '${f1}', initSet: false },
                { type: 'submit', label: '提交', level: 'primary', className: HeightClassName.height_unset }
            ],
            api: {
                method: 'post',
                url: `${serverHost}/iotapi/curd-page@serverVerify`
            }
        },
        { type: 'divider' }
    ]
};

export { schema };
