
import request from '../utils/request';
import  { PAGE_SIZE　} from 'common/constants';
const headers={
  "Content-Type":"application/json"
}
//获取组织架构列表
export function getDepartmentNodes(values) {
  return request('/crm/api/v1/department/getDepartmentNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//组织架构用户列表页数据
export function organizationPage(values) {
  return request('/crm/api/v1/user/getUserPageListByDeptId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//按条件查询用户列表页数据
export function getUserPageListByDeptId(values) {
  return request('/crm/api/v1/user/getUserPageListByDeptId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加用户信息
export function addUser(values) {
  return request('/crm/api/v1/user/addUser', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//生成用户编号
export function getEmpSerial(values) {
  return request('/crm/api/v1/serial/getEmpSerial', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据部门id获取下属职位
export function getPositionByDeptId(values) {
  return request('/crm/api/v1/position/getPositionByDeptId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据地方中心id查询下属部门
export function getDeptListByEndemicId(values) {
  return request('/crm/api/v1/department/getDeptListByEndemicId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//系统角色下拉列表
export function roleSelectData(values) {
  return request('/crm/api/v1/role/selectData', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存组织架构节点信息
export function saveDepartment(values) {
  return request('/crm/api/v1/department/saveDepartment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据用户id禁用用户
export function forbiddenUser(values) {
  return request('/crm/api/v1/user/forbiddenUser', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据用户id查看用户信息
export function getUserListById(values) {
  return request('/crm/api/v1/user/getUserListById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改用户信息
export function modifyUser(values) {
  return request('/crm/api/v1/user/modifyUser', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加用户入职信息
export function addUserEntrydata(values) {
  return request('/crm/api/v1/user/addUserEntry', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据入职信息id删除入职信息
export function deleteUserEntry(values) {
  return request('/crm/api/v1/user/deleteUserEntry', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}