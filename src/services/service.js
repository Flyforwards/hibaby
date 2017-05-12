
import request from '../utils/request';
const headers={
  "Content-Type":"application/json"
}
//服务项目列表
export function ServicePage(values) {
  return request('/crm/api/v1/serviceInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
