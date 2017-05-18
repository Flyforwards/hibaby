
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
