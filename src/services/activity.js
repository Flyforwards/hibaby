import request from '../utils/request';

// 添加活动
export function saveActivity(values) {
  return request('/crm/api/v1/activity/saveActivity', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 地方中心活动列表
export function getActivityPageList(values) {
  return request('/crm/api/v1/activity/getActivityPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 预约非会员用户
export function saveOutsiderCustomer(values) {
  return request('/crm/api/v1/activity/saveOutsiderCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取会员用户列表
export function saveMemberCustomer(values) {
  return request('/crm/api/v1/activity/saveMemberCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除活动
export function deleteActivity(values) {
  return request('/crm/api/v1/activity/deleteActivity', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除活动
export function getActivityById(values) {
  return request('/crm/api/v1/activity/getActivityById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 编辑活动保存
export function updateActivity(values) {
  return request('/crm/api/v1/activity/updateActivity', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


//根据活动id及筛选条件查询预约人员分页列表
export function getActivityCustomerPageList(values) {
  return request('/crm/api/v1/activity/getActivityCustomerPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取会员用户列表
export function getNoAppointmentCustomerPageList(values) {
  return request('/crm/api/v1/customer/getNoAppointmentCustomerPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除预约客户
export function deleteActivityCustomer(values) {
  return request('/crm/api/v1/activity/deleteActivityCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 根据预约id签到预约客户
export function signedActivityCustomer(values) {
  return request('/crm/api/v1/activity/signedActivityCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}













