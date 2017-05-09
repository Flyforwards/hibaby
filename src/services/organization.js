
import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';
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
