/*
 * @Author: sky.li
 * @LastEditors: sky.li
 * @Description:
 * @可以输入预定的版权声明、个性签名、空行等
 */
// @ts-ignore
import Mock from 'mockjs';
// 将所有的mock文件引入
// @ts-ignore
import listAPI from './listData';

export default {
    startMock() {
        // 设置所有ajax请求的超时时间，模拟网络传输耗时
        Mock.setup({
            timeout: 0 - 300
        });
        //在index.js中引入数据
        Mock.mock('/list/index', 'get', listAPI.listData);
        Mock.mock('/form/add', 'get', listAPI.add);
    }
};
