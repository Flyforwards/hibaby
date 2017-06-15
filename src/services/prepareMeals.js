import request from '../utils/request';
//查询某一天基础食材餐单
export function getMenuByDay(values) {
  return request('/crm/api/v1/menu/getMenuByDay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询某一天高档食材餐单
export function getTopMenuByDay(values) {
  return request('/crm/api/v1/menu/getTopMenuByDay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
