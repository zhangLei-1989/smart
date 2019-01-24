import request from '@/utils/require.js'
const baseUrl = 'http://172.16.124.16:55001'

export function auditText (data) {
  return request({
    url: `${baseUrl}/review/api/audit/text`,
    method: 'post',
    data
  })
}
export function auditSimilar (data) {
  return request({
    url: `${baseUrl}/review/api/audit/similar/${data.id}`,
    method: 'get',
    data
  })
}
export function auditRegion () {
  return request({
    url: `${baseUrl}/review/api/audit/region`,
    method: 'get'
  })
}
export function auditType () {
  return request({
    url: `${baseUrl}/review/api/audit/type`,
    method: 'get'
  })
}
