
import request from '../utils/request';

const headers={
  "Content-Type":"application/json"
}

//菜单列表
export function MainMenuList(values) {
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
<<<<<<< HEAD
//增添菜单列表数据
export function AddMenuList(values) {
  return request('/crm/api/v1/module/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//编辑菜单列表数据
export function EditMenuListData(values) {
  return request('/crm/api/v1/module/update', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单主模块下拉
export function MainModuleSelect(values) {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单上级菜单下拉
export function ParentNodeSelect(values) {
  return request('/crm/api/v1/module/selectData', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单权限下拉
export function MenuPermissionSelect(values) {
  return request('/crm/api/v1/permission/treeByProjectId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
=======
>>>>>>> 494ba3fd91f43df62921e99c4882a5a43ed6570b
