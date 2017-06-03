/**
 * 健康档案
 * Created by yangjingjing on 2017/6/1.
 */
import request from '../utils/request';
//保存客户健康档案
export function saveHealthInformation(values) {
  return request('/crm/api/v1/customer/saveCustomerHealth', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//更新客户健康档案
export function updateCustomerHealth(values) {
  return request('/crm/api/v1/customer/updateCustomerHealth', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//根据客户id查询客户健康档案信息
export function getHealthInformationListByCustomerId(values) {
  return request('/crm/api/v1/customer/getCustomerHealthById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
