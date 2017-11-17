import request from '../utils/request';


//菜单列表
export function getOrderList(values) {
  return request('/crm/api/v1/order/customerorderlist', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
