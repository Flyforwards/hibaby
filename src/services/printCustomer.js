/**
 * Created by Flyforwards on 2017/6/13.
 */

import request from '../utils/request';

//获取根据客户ID查询客户基本信息
export function getPrintBase(values) {
  return request('/crm/api/v1/customer/getCustomerById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
export function getPrintExtend(values) {
  return request('/crm/api/v1/customer/getCustomerExtendById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

