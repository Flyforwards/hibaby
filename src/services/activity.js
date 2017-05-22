import request from '../utils/request';

// 添加活动
export function saveActivity(values) {
  return request('/crm/api/v1/activity/saveActivity', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//集团数据查看
export function checkData(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//编辑集团数据
export function editData(values) {
  return request('/crm/api/v1/dictionary/modifyDictionary', {
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




