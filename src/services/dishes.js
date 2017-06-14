/**
 * 菜品管理
 * Created by yangjingjing on 2017/6/12.
 */
import request from '../utils/request';
//获取菜品详情
export function getDishesById(values) {
  return request('/crm/api/v1/dishes/getDishesById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取菜品分页数据
export function getDishesPageList(values){
  return request('/crm/api/v1/dishes/getDishesPageList',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存菜品信息
export function saveDishes(values){
  return request('/crm/api/v1/dishes/saveDishes',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除菜品信息
export function deleteDishes(values){
  return request('/crm/api/v1/dishes/deleteDishes',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
