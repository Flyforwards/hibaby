/**
 * 招聘信息管理
 * Created by zhurw on 2017/7/19.
 */
import request from '../utils/request';
//获取招聘详情
export function getJobById(values) {
  return request('/crm/api/v1/web/webJob/findOneById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取招聘分页数据
export function getJobPageList(values){
  return request('/crm/api/v1/web/webJob/listByPage',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存招聘信息
export function saveJob(values){
  return request('/crm/api/v1/web/webJob/add',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除招聘信息
export function deleteJob(values){
  return request('/crm/api/v1/web/webJob/delete',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改招聘信息
export function updateJob(values){
  return request('/crm/api/v1/web/webJob/update',{
    method: 'POST',
    body: JSON.stringify(values),
  })
};
