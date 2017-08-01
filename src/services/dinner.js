
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
// 获取会员身份下拉选项， 也是卡种列表
export function getMemberShipCard(values) {
  return request('/crm/api/v1/membershipcard/getMembershipcard', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//数据字典
export function getDataDict(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 主套餐列表
export function listByMain(values) {
  return request('/crm/api/v1/packageInfo/listByMain', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取字典
export function getDictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
