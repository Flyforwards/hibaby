import request from '../utils/request';
//分页列表
export function listByPage(values) {
  return request('/crm/api/v1/room/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//新增房间
export function addRoom(values) {
  return request('/crm/api/v1/room/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//根据id查询房间
export function findById(values) {
  return request('/crm/api/v1/room/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
