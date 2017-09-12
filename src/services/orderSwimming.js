/**
 * 预约游泳
 * Created by yangjingjing on 2017/9/11.
 */
import request from '../utils/request';

// 取消预约
export function cancelSwimming(values) {
  return request('/crm/api/v1/swimming/cancelSwimming', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

// 切换泳池上线离线状态
export function changeSwimmingState(values) {
  return request('/crm/api/v1/swimming/changeSwimmingState', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


// 关闭预约
export function closeSwimming(values) {
  return request('/crm/api/v1/swimming/closeSwimming', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


// 查询游泳历史记录分页列表
export function getSwimmingHistory(values) {
  return request('/crm/api/v1/swimming/getSwimmingHistory', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

// 根据日期查询泳池列表
export function getSwimmingRooms(values) {
  return request('/crm/api/v1/swimming/getSwimmingRooms', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


// 根据日期查询泳池详情
export function getSwimmingRoomsInfo(values) {
  return request('/crm/api/v1/swimming/getSwimmingRoomsInfo', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


// 查询使用率
export function getSwimmingUtilization(values) {
  return request('/crm/api/v1/swimming/getSwimmingUtilization', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
