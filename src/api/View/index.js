// * @Author: h7ml
// * @Date: 2021-11-16 12:31:49
// * @LastEditors: h7ml
// * @LastEditTime: 2021-11-16 12:31:49
// * @Description: View 视图管理
// * @FilePath: src\api\View\index.js
// * @DocumentLink: http://prod.iotn2n.com/swagger/#/View
import {
  create_object,
  del_object,
  get_object,
  query_object,
  update_object,
} from '@/api/Parse'

export async function queryView(params) {
  return query_object('View', params)
}

/**
 * @doc-api http://prod.iotn2n.com/swagger/#/View/get_classes_view_id
 * @description 获取视图详情
 * @param ObjectId
 * @return {Promise<*|ElMessageComponent>}
 */
export async function getView(ObjectId:String) {
  return get_object('View', ObjectId)
}

/**
 * @docs-api http://prod.iotn2n.com/swagger/#/View/delete_classes_view_id
 * @description 删除视图管理
 * @param ObjectId
 * @return {Promise<*|ElMessageComponent>}
 */
export async function delView(ObjectId:String) {
  return del_object('View', ObjectId)
}

/**
 * @doc-api http://prod.iotn2n.com/swagger/#/View/put_classes_view_id
 * @description 更新视图管理
 * @param ObjectId
 * @param params
 * @return {Promise<*|ElMessageComponent>}
 */
export async function putView(ObjectId, params) {
  return update_object('View', ObjectId, params)
}

/**
 * @doc-api http://prod.iotn2n.com/swagger/#/View/post_classes_view
 * @description 新增识图管理
 * @param params
 * @return {Promise<*|ElMessageComponent>}
 */
export async function postView(params) {
  return create_object('View', params)
}
