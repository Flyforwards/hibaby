import request from '../utils/request';
//分页列表
export function listByPage(values) {
  return request('/crm/api/v1/room/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//新增房间
export function addRoom(values) {
  return request('/crm/api/v1/room/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//修改房间
export function updateRoom(values) {
  return request('/crm/api/v1/room/update', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//根据id查询房间
export function findById(values) {
  return request('/crm/api/v1/room/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//根据id删除房间
export function delRoom(values) {
  return request('/crm/api/v1/room/delete', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

// 主套餐列表
export function listByMain(values) {
  return request('/crm/api/v1/packageInfo/listByMain', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//日房态
export function dayStatus(values) {
  return request('/crm/api/v1/room/dayStatus', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 日房状态更新
export function dayStatusUpdate(values) {
  return request('/crm/api/v1/room/dayStatusUpdate', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
/**
 * 获取月房态用户列表
 * @param values
 * @returns {Object}
 */
export function getMonthStatusCustomers(values) {
  return request('/crm/api/v1/room/monthRoomStatusCustomerList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
/**
 * 获取月房态房间列表
 * @param values
 * @returns {Object}
 */
export function getMonthRoomList(values) {
  return request('/crm/api/v1/room/monthRoomList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//取得一键排房数据
export function arrangeRoom(values) {
  return request('/crm/api/v1/room/arrangeRoom', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 确认入住
export function confirmReside(values) {
  return request('/crm/api/v1/room/confirmReside', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 月房状态更新
export function monthRoomUpdate(values) {
  return request('/crm/api/v1/room/monthRoomUpdate', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 入住客平移
export function resideMove(values) {
  return request('/crm/api/v1/room/resideMove', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 取消预订
export function cancelBooking(values) {
  return request('/crm/api/v1/room/cancelBooking', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

