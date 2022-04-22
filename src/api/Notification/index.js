// <!--
// * @Author: h7ml
// * @Date: 2021-07-27 09:51:54
// * @LastEditors:
// * @LastEditTime: 2021-07-27 09:51:54
// * @Description: Notification api
// * @FilePath: src\api\Notification\index.js
// * @DocumentLink: https://docs.parseplatform.org/dotnet/guide/#push-notifications
// -->

import request from '@/utils/request/request'
import {
  create_object,
  del_object,
  get_object,
  update_object,
  query_object,
} from '@/api/Parse'

export async function queryNotification(params) {
  return request({
    url: `notification`,
    method: 'get',
    params: params,
  })
  // return query_object('Notification', params)
}

export async function getNotification(ObjectId:String) {
  return get_object('Notification', ObjectId)
}

export async function delNotification(ObjectId:String) {
  return del_object('Notification', ObjectId)
}

export async function putNotification(ObjectId, params) {
  return update_object('Notification', ObjectId, params)
}

export async function postNotification(params) {
  return create_object('Notification', params)
}
