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

//加载菜品库列表
export function getDishesLibraryNodes(values) {
  return request('/crm/api/v1/dishesLibrary/getDishesLibraryNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//根据菜品库id获取菜品分页列表
export function getDishesPageList(values) {
  return request('/crm/api/v1/dishes/getDishesPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//保存基础餐单
export function saveMenu(values) {
  return request('/crm/api/v1/menu/saveMenu', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//保存高档食材餐单
export function saveTopMenu(values) {
  return request('/crm/api/v1/menu/saveTopMenu', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//根据字典主表别名和删除标识获取字典
export function getDictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
