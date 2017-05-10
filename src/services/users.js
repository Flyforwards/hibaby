
import request from '../utils/request';

const host = "http://118.190.112.88:8087";

export function fetch({ page }) {
  return request(`/crm/api/v1/user/list?_page=${page}&_limit=PAGE_SIZE`);
}
export function login(values) {
  return request('/crm/api/v1/login', {
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

export function test(values) {
  return request('/crm/api/v1/getVerCode', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function findSubmit(values) {
  return request('/crm/api/v1/resetPassword', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function findValue(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'GET',
    body: JSON.stringify(values),
  })
}
export function getEndemic() {
  return request('/crm/api/v1/department/getEndemic', {
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


