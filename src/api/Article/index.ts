// * @Author: h7ml
// * @Date: 2021-08-23 18:12:12
// * @LastEditors: h7ml
// * @LastEditTime: 2021-08-23 18:12:12
// * @Description: dgiot doc api
// * @FilePath: src\api\Article\index.js
// * @DocumentLink: http://121.5.171.21/swagger/#/Article
import { create_object, del_object, get_object, query_object, update_object } from '@/api/Parse';
import moment from 'moment';
import _ from 'lodash';
export async function createArticle(params: Object) {
    return create_object(
        'Article',
        // eslint-disable-next-line no-undef
        _.merge(params, {
            ACL: {
                '*': {
                    read: true,
                    write: false
                }
            },
            timestamp: moment(new Date()).valueOf()
        })
    );
}

export async function getArticle(ObjectId: String) {
    return get_object('Article', ObjectId);
}

export async function delArticle(ObjectId: String) {
    return del_object('Article', ObjectId);
}

export async function putArticle(ObjectId: String, params: Object) {
    return update_object('Article', ObjectId, params);
}

export async function queryArticle(params: Object) {
    return query_object('Article', params);
}
