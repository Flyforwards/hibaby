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





