/**
 * 菜品管理
 * Created by yangjingjing on 2017/6/12.
 */
import request from '../utils/request';
export function saveHealthInformation(values) {
  return request('/crm/api/v1/customer/saveCustomerHealth', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
