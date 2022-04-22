import {
  create_object,
  del_object,
  get_object,
  query_object,
  update_object,
} from '@/api/Parse'

export async function queryDict(params) {
  return query_object('Dict', params)
}

export async function getBatchNumer() {
  const params = {
    order: '-createdAt',
    where: {
      type: 'batch_number',
    },
  }
  return query_object('Dict', params)
}

export async function createBatchNumer(params) {
  return create_object('Dict', params)
}

export async function getIndustry(key, limit) {
  const params = {
    limit: limit || 100,
    where: {
      'data.key': key || 'category',
    },
  }
  return query_object('Dict', params)
}

export async function queryIndustry(params) {
  return query_object('Instruct', params)
}

export async function postIndustry(params) {
  return create_object('Instruct', params)
}

export async function delIndustry(ObjectId:String) {
  return del_object('Instruct', ObjectId)
}

export async function updateIndustry(ObjectId, params) {
  return update_object('Instruct', ObjectId, params)
}

export async function getAllunit(key, limit) {
  const params = {
    limit: limit || 100,
    where: {
      type: key || 'unit',
    },
  }
  return query_object('Dict', params)
}

export async function getDict(ObjectId:String) {
  return get_object('Dict', ObjectId)
}

export async function delDict(ObjectId:String) {
  return del_object('Dict', ObjectId)
}

export async function putDict(ObjectId, params) {
  return update_object('Dict', ObjectId, params)
}

export async function postDict(params) {
  return create_object('Dict', params)
}

export async function getDictCount(params) {
  return query_object('Dict', params)
}
