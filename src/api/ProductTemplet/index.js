// * @Author: h7ml
// * @Date: 2021-08-17 12:09:24
// * @LastEditors: h7ml
// * @LastEditTime: 2021-08-17 12:09:24
// * @Description: api ProductTemplet
// * @FilePath: src\api\ProductTemplet\index.js
// * @DocumentLink: http://121.5.171.21/swagger/#/ProductTemplet
import request from '@/utils/request/request'
import {
  create_object,
  del_object,
  get_object,
  update_object,
} from '@/api/Parse'

export async function queryProductTemplet(params) {
  return request({
    url: `/classes/ProductTemplet`,
    method: 'get',
    params: params,
  })
}

export async function getProductTemplet(ObjectId:String) {
  return get_object('ProductTemplet', ObjectId)
}

export async function delProductTemplet(ObjectId:String) {
  return del_object('ProductTemplet', ObjectId)
}

export async function putProductTemplet(ObjectId, params) {
  return update_object('ProductTemplet', ObjectId, params)
}

export async function postProductTemplet(params) {
  return create_object('ProductTemplet', params)
}
