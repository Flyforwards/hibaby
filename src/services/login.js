import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';
const headers={
  "Content-Type":"application/json"
}
export function login(values) {
  return request('/crm/api/v1/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function test(values) {
  return request('/crm/api/v1/getVerCode', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function findSubmit(values) {
  return request('/crm/api/v1/resetPassword', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}