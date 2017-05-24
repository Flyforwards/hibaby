
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
  return request('/crm/api/v1/packageInfo/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取套房下拉列表
export function selectData(values) {
  return request('/crm/api/v1/suite/selectData', {
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
//根据字典主表id和删除标识和字典类型获取字典
export function getDictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//套房分页列表
export function suiteListByPage(values) {
  return request('/crm/api/v1/suite/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加套房信息
export function roomAdd(values) {
  return request('/crm/api/v1/suite/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除套房信息
export function roomDel(values) {
  return request('/crm/api/v1/suite/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据ID查询套房管理信息
export function roomFindById(values) {
  return request('/crm/api/v1/suite/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改套房信息
export function roomEdit(values) {
  return request('/crm/api/v1/suite/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}