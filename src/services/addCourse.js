
import request from '../utils/request';

//根据字典主表id和删除标识和字典类型获取字典
export function getDictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据套餐ID查询套餐详情
export function findById(values) {
  return request('/crm/api/v1/packageInfo/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存客户套餐信息
export function saveCustomerPackage(values) {
  return request('/crm/api/v1/customer/saveCustomerPackage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据客户id查询客户套餐信息
export function getCustomerPackageById(values) {
  return request('/crm/api/v1/customer/getCustomerPackageById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}