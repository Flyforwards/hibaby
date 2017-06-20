import request from '../utils/request';
//查询某一天基础食材餐单
export function getMenuByDay(values) {
  return request('/crm/api/v1/menu/getMenuByDay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//查询某一餐基础餐单详情
export function getMenuByType(values) {
  return request('/crm/api/v1/menu/getMenuByType', {
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

//查询某一餐高档食材餐单详情
export function getTopMenuByType(values) {
  return request('/crm/api/v1/menu/getTopMenuByType', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//根据菜名查询餐单
export function getMenuByDishes(values) {
  return request('/crm/api/v1/menu/getMenuByDishes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询针对套餐
export function getCardLevel(values) {
  return request('/crm/api/v1/membershipcard/getCardLevel', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
