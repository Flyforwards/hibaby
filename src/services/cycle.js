import request from '../utils/request';

//查询循环周期
export function getLoopList(values) {
  return request('/crm/api/v1/loop/getLoopList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

// 获取服务器时间
export function getSystemTime(values) {
  return request('/crm/api/v1/getSystemTime', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
