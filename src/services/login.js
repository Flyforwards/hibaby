
import request from '../utils/request';

export function login(values) {
  return request('/crm/api/v1/user/login', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function logout() {
  return request('/crm/api/v1/user/logout', {
    method: 'POST',
  })
}

export function getVerCode(values) {
  return request('/crm/api/v1/user/getVerCode', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function findSubmit(values) {
  return request('/crm/api/v1/user/resetPassword', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}



