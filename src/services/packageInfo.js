
import request from '../utils/request';
import  { PAGE_SIZE　} from 'common/constants';
const headers={
  "Content-Type":"application/json"
}
//获取分页列表
export function listByPage(values) {
  return request('/crm/api/v1/packageInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除套餐
export function del(values) {
  return request('/crm/api/v1/packageInfo/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加套餐
export function add(values) {
  return request('/crm/api/v1/packageInfo/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改套餐
export function edit(values) {
  return request('/crm/api/v1/serviceInfo/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据套餐ID查询套餐详情
export function findById(values) {
  return request('/crm/api/v1/packageInfo/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//服务项目分页列表
export function serviceListByPage(values) {
  return request('/crm/api/v1/serviceInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//房间分页列表
export function roomList(values) {
  return request('/crm/api/v1/room/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}