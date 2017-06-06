
import request from '../utils/request';

const host = "http://118.190.112.88:8087";

export function customer(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


// 获取当前用户可以访问的地方中心列表
export function getCurrentUserEndemic() {
  return request('/crm/api/v1/user/getCurrentUserEndemic', {
    method: 'POST',
  })
}


export function getProjectList() {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
  })
}

export function setEndemic(values) {
  return request('/crm/api/v1/permission/setEndemic', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getCurrUserMenu(values) {
  return request('/crm/api/v1/module/currentUserModuleList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据角色Id主模块ID查看权限
export function treeByRoleID(values) {
  return request('/crm/api/v1/permission/treeByRoleId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据系统角色查询用户列表
export function getUserPageListByRoleId(values) {
  return request('/crm/api/v1/user/getUserPageListByRoleId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function configRolePermission(values) {
  return request('/crm/api/v1/role/configRolePermission', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据地方中心查询下属部门
export function getDeptListByEndemicId(values) {
  return request('/crm/api/v1/department/getDeptListByEndemicId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 解绑用户角色
export function DelUserRoleInput(values) {
  return request('/crm/api/v1/user/DelUserRoleInput', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取当前用户选择地方中心的组织架构树
export function getRoleDepartmentNodes(values) {
  return request('/crm/api/v1/department/getRoleDepartmentNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取选择部门的未分配角色用户
export function getUserPageListByUserRole(values) {
  return request('/crm/api/v1/user/getUserPageListByUserRole', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 绑定用户角色  // 一个传ID 多个逗号连接
export function bindUserRole(values) {
  return request('/crm/api/v1/user/bindUserRole', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 查询当前用户选择的地方中心
export function getCurrentUserSelectEndemic(values) {
  return request('/crm/api/v1/user/getCurrentUserSelectEndemic', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


// 获取当前登录的用户信息
export function getCurrentUserInfo(values) {
  return request('/crm/api/v1/user/getCurrentUserInfo', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


// 获取主模块树
export function getProjectAndModuleTree(values) {
  return request('/crm/api/v1/module/currentUserModuleAllList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 所有按钮权限别名列表
export function currentUserPermissionAliasList(values) {
  return request('/crm/api/v1/permission/currentUserPermissionAliasList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 根据地方中心id查询下属部门
export function getPositionByDeptId(values) {
  return request('/crm/api/v1/position/getPositionByDeptId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 修改用户信息
export function modifyUser(values) {
  return request('/crm/api/v1/user/updateUserEntry', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

