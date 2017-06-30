import request from '../utils/request';

// 根据地方中心查询客户投诉分页
export function getCustomerCompList(values) {
  return request('/crm/api/v1/customerComp/getCustomerCompList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 创建投诉信息
export function saveCustomerComp(values) {
  return request('/crm/api/v1/customerComp/saveCustomerComp', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除投诉信息
export function deleteCustomerComp(values) {
  return request('/crm/api/v1/customerComp/deleteCustomerComp', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 详情数据
export function getCustomerCompById(values) {
  return request('/crm/api/v1/customerComp/getCustomerCompById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 部门负责人提交处理结果
export function submitTreatmentResult(values) {
  return request('/crm/api/v1/customerComp/submitTreatmentResult', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 确认投诉已处理
export function confirmTreatmentFinish(values) {
  return request('/crm/api/v1/customerComp/confirmTreatmentFinish', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 创建参观信息
export function saveCustomerVis(values) {
  return request('/crm/api/v1/customerVis/saveCustomerVis', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据日期获取预约信息
export function getCustomerVisListByDate(values) {
  return request('/crm/api/v1/customerVis/getCustomerVisListByDate', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 客户参观详情数据
export function getCustomerVisById(values) {
  return request('/crm/api/v1/customerVis/getCustomerVisById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除客户参观信息
export function deleteCustomerVis(values) {
  return request('/crm/api/v1/customerVis/deleteCustomerVis', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


// 编辑保存预约参观信息
export function saveCustomerVisEdit(values) {
  return request('/crm/api/v1/customerVis/saveCustomerVisEdit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取当前地方中心配置的客服列表
export function listByPage(values) {
  return request('/crm/api/v1/customerServiceConfig/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取当前地方中心可设置员工列表
export function listByUserPage(values) {
  return request('/crm/api/v1/customerServiceConfig/listByUserPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 添加客服信息
export function phoneSystemSave(values) {
  return request('/crm/api/v1/customerServiceConfig/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 编辑客服信息
export function phoneSystemEditSave(values) {
  return request('/crm/api/v1/customerServiceConfig/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取400电话配置信息
export function getPhoneSystemById(values) {
  return request('/crm/api/v1/customerServiceConfig/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除400电话配置
export function phoneSystemDelete(values) {
  return request('/crm/api/v1/customerServiceConfig/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}















