/*
 * @Description: Dlink 协议
 * @FilePath: src/api/Dlink/index.js
 */
// https://docs.parseplatform.org/rest/guide/#batch-operations
// http://121.5.171.21/dgiot_swagger/#/Dlink/get_topic
import {
  create_object,
  del_object,
  get_object,
  query_object,
  update_object,
} from '@/api/Parse'
import request from '@/utils/request/request'

/**
 * @description: 获取dlink json 列表
 * @param type
 * @returns {Promise<*>}
 */
export async function getDlinkJson(type = 'Topic') {
  return request({
    url: `dlinkjson?type=${type}`,
    method: 'get',
  })
}
