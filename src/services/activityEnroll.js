/**
 * 报名管理
 * Created by zhurw on 2017/7/18.
 */
import request from '../utils/request';
//获取报名详情
export function getEnrollById(values) {
  return request('/crm/api/v1/web/webApply/findOneById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取报名分页数据
export function getEnrollPageList(values){
  return request('/crm/api/v1/web/webApply/listByPage',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存报名信息
export function saveEnroll(values){
  return request('/crm/api/v1/web/webApply/add',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除报名信息
export function deleteEnroll(values){
  return request('/crm/api/v1/web/webApply/delete',{
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改课程信息
export function updateEnroll(values){
  return request('/crm/api/v1/web/webApply/update',{
    method: 'POST',
    body: JSON.stringify(values),
  })
};
