import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';
const headers={
	"Content-Type":"application/json"
}
const host = "http://118.190.112.88:8087";

export function fetch({ page }) {
  return request(`/crm/api/v1/user/list?_page=${page}&_limit=PAGE_SIZE`);
}
export function login(values) {
  return request('/crm/api/v1/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function position(values) {
  return request('/crm/api/v1/position/getPositionByDeptId', {
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
export function findValue(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'GET',
    headers,
    body: JSON.stringify(values),
  })
}