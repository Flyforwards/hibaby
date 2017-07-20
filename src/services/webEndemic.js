/**
 * 地方中心管理
 * Created by zhurw on 2017/7/19.
 */
import request from '../utils/request';
//获取地方中心详情
export function getEndemicById(values) {
  return request('/crm/api/v1/web/webEndemic/findOneById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取地方中心分页数据
export function getEndemicPageList(values){
  return request('/crm/api/v1/web/webEndemic/listByPage',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存地方中心信息
export function saveEndemic(values){
  return request('/crm/api/v1/web/webEndemic/add',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除地方中心信息
export function deleteEndemic(values){
  return request('/crm/api/v1/web/webEndemic/delete',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改地方中心信息
export function updateEndemic(values){
  return request('/crm/api/v1/web/webEndemic/update',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取地方中心下拉
export function getEndemicDropdownList(values){
  return request('/crm/api/v1/web/webEndemic/dropdown',{
    method: 'POST',
    body: JSON.stringify(values),
  })
};
