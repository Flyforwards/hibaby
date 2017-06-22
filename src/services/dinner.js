
import request from '../utils/request';
import  { PAGE_SIZE　} from 'common/constants'
//获取预备调餐的用户列表信息
export function getDepartmentNodes(values) {
  return request('/crm/api/v1/department/getDepartmentNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 查询客户餐单打印信息
export function getPrintMsg(values) {
  return request('/crm/api/v1/adjustableMeal/getPrintMenu', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 根据客户Id查询禁忌食材
export function getTabooFood(values) {
  return request('/crm/api/v1/adjustableMeal/getTabooByCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 保存客户禁忌食材
export function saveTabooFood(values) {
  return request('/crm/api/v1/adjustableMeal/saveTaboo', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 保存客户禁忌食材
export function getCustomerById(values) {
  return request('/crm/api/v1/customer/getCustomerById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据筛选条件查询成单客户基本信息分页列表
export function getCustomerList(values) {
  return request('/crm/api/v1/adjustableMeal/getCustomerAdjustableMealPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 获取服务器时间
export function getSystemTime(values) {
  return request('/crm/api/v1/getSystemTime', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

