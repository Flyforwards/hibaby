import request from '../utils/request';
// 满月汗取消预约
export function cancelSweating(values) {
  return request('/crm/api/v1/sweating/cancelSweating', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//切换满月汗房间上线离线状态
export function changeSweatingState(values) {
  return request('/crm/api/v1/sweating/changeSweatingState', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//关闭预约
export function closeSweating(values) {
  return request('/crm/api/v1/sweating/closeSweating', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询满月汗历史记录分页列表
export function getSweatingHistory(values) {
  return request('/crm/api/v1/sweating/getSweatingHistory', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//根据日期查询房间列表
export function getSweatingRooms(values) {
  return request('/crm/api/v1/sweating/getSweatingRooms', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//根据日期查询房间详情
export function getSweatingRoomsInfo(values) {
  return request('/crm/api/v1/sweating/getSweatingRoomsInfo', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询使用率
export function getSweatingUtilization(values) {
  return request('/crm/api/v1/sweating/getSweatingUtilization', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//开启预约
export function openSweating(values) {
  return request('/crm/api/v1/sweating/openSweating', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

