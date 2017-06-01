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
