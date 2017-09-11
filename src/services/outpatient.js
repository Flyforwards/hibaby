
import request from '../utils/request';

//获取组织架构列表
export function getClinicRooms(values) {
  return request('/crm/api/v1/clinic/getClinicRooms', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//切换满月汗房间上线离线状态
export function changeClinicState(values) {
  return request('/crm/api/v1/clinic/changeClinicState', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//根据日期查询门诊详情
export function getClinicRoomsInfo(values) {
  return request('/crm/api/v1/clinic/getClinicRoomsInfo', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//取消门诊预约
export function cancelClinic(values) {
  return request('/crm/api/v1/clinic/cancelClinic', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getClinicHistory(values) {
  return request('/crm/api/v1/clinic/getClinicHistory', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


