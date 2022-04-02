import request from '@/utils/request/request'

/**
 * @doc-apis https://prod.iotn2n.com/dgiot_swagger/#/Data/post_upload
 * @param params
 * @return {*}
 */
export async function uppyUpload(
  url,
  params,
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }
) {
  return axios.post(url, params, headers)
}
