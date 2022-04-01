/*
 * @Author: sky.li
 * @LastEditors: sky.li
 * @Description:
 * @可以输入预定的版权声明、个性签名、空行等
 */

// @ts-ignore
import Mock from 'mockjs';

export default {
    listData: () => {
        // confit中存放的是{url: "/list/index", type: "GET", body: null}
        // body是传过来的值
        return Mock.mock({
            'list|5': [
                {
                    'id|+1': 1,
                    content: '@ctitle(10,20)',
                    title: '@ctitle(5,10)'
                }
            ],
            total: 100
        });
    },
    add: () => {
        // confit中存放的是{url: "/list/index", type: "GET", body: null}
        // body是传过来的值
        return Mock.mock({});
    }
};
