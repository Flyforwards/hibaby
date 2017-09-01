/**
 * Created by Flyforwards on 2017/6/26.
 */
import request from '../utils/request';
//查询某一天基础食材餐单
export function getMenuByDay(values) {
  return request('/crm/api/v1/adjustableMeal/getCustomerMenuByDay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//查询某一餐基础餐单详情
export function getMenuByType(values) {
  return request('/crm/api/v1/adjustableMeal/getCustomerMenuByType', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询某一天高档食材餐单
export function getTopMenuByDay(values) {
  return request('/crm/api/v1/adjustableMeal/getCustomerTopMenuByDay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//查询某一餐高档食材餐单详情
export function getTopMenuByType(values) {
  return request('/crm/api/v1/adjustableMeal/getCustomerTopMenuByType', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//根据菜名查询餐单
export function getMenuByDishes(values) {
  return request('/crm/api/v1/adjustableMeal/getMenuByDishesAndCustomerId', {
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
  return request('/crm/api/v1/adjustableMeal/saveCustomerMenu', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//保存高档食材餐单
export function saveTopMenu(values) {
  return request('/crm/api/v1/adjustableMeal/saveCustomerTopMenu', {
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
//得到顾客入驻信息
export function getLoopByCustomerId(values) {
  return request('/crm/api/v1/adjustableMeal/getLoopByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
