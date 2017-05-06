
import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';

export function system(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加权限
export function permissionAdd(values) {
  return request('/crm/api/v1/permission/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改权限
export function permissionUpdata(values) {
  return request('/crm/api/v1/permission/update', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取数据字典内容
export function Dictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取主模块
export function fromModal(values) {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取组织架构列表
export function getDepartmentNodes(values) {
  return request('/crm/api/v1/department/getDepartmentNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取权限管理列表
export function listByPage(values) {
  return request('/crm/api/v1/permission/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function SelectList(values) {
  return request('/crm/api/v1/permission/treeByProjectId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//组织架构列表页数据
export function organization(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function customer(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function LogView(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function add(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function view(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
