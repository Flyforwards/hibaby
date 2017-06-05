import request from '../utils/request';
//修改密码
export function updatePassword(values) {
  return request('/crm/api/v1/user/updatePassword', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};




