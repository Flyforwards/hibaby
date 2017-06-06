
import request from '../utils/request';


// 获取地方中心会员用户
export function getCustomerPage(values) {
  return request('/crm/api/v1/customer/getCustomerPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 删除客户
export function deleteCustomer(values) {
  return request('/crm/api/v1/customer/deleteCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}















