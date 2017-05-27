
import request from '../utils/request';


//菜单列表
export function mainMenuList(values) {
  return request('/crm/api/v1/module/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除菜单列表数据
export function deleteService(values) {
  return request('/crm/api/v1/module/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//增添菜单列表数据
export function addMenuList(values) {
  return request('/crm/api/v1/module/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//编辑菜单列表数据
export function editMenuListData(values) {
  return request('/crm/api/v1/module/update', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单主模块下拉
export function mainModuleSelect(values) {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单上级菜单下拉
export function parentNodeSelect(values) {
  return request('/crm/api/v1/module/selectData', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单权限下拉
export function menuPermissionSelect(values) {
  return request('/crm/api/v1/permission/fullTreeByProjectId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
