/**
 * 课程管理
 * Created by zhurw on 2017/7/17.
 */
import request from '../utils/request';
//获取课程详情
export function getCourseById(values) {
  return request('/crm/api/v1/web/webCourse/findOneById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取课程分页数据
export function getCoursePageList(values){
  return request('/crm/api/v1/web/webCourse/listByPage',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存课程信息
export function saveCourse(values){
  return request('/crm/api/v1/web/webCourse/add',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除课程信息
export function deleteCourse(values){
  return request('/crm/api/v1/web/webCourse/delete',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改课程信息
export function updateCourse(values){
  return request('/crm/api/v1/web/webCourse/update',{
    method: 'POST',
    body: JSON.stringify(values),
  })
};
