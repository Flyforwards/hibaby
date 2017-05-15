
import request from '../utils/request';
//服务项目列表
export function ServicePage(values) {
  return request('/crm/api/v1/serviceInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加服务项目
export function AddService(values) {
  return request('/crm/api/v1/serviceInfo/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//查看服务详情
export function LookService(values) {
  return request('/crm/api/v1/serviceInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除服务项目
export function deleteService(values) {
  return request('/crm/api/v1/serviceInfo/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
