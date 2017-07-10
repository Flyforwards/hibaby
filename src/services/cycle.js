import request from '../utils/request';

//查询循环周期
export function getLoopList(values) {
  return request('/crm/api/v1/loop/getLoopList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询单个循环周期详情
export function getLoopListByWeek(values) {
  return request('/crm/api/v1/loop/getLoopListByWeek', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询循环周期房间送餐信息
export function getLoopRoomDishesList(values) {
  return request('/crm/api/v1/loop/getLoopRoomDishesList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询单个循环周期房间送餐详情
export function getLoopRoomDishesListByWeek(values) {
  return request('/crm/api/v1/loop/getLoopRoomDishesListByWeek', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询循环周期菜品界面
export function getLoopDishesList(values) {
  return request('/crm/api/v1/loop/getLoopDishesList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//查询单个循环菜品详情界面
export function getLoopDishesListByWeek(values) {
  return request('/crm/api/v1/loop/getLoopDishesListByWeek', {
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
