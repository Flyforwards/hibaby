import request from '../utils/request';
//分页列表
export function listByPage(values) {
  return request('/crm/api/v1/suite/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
