
import request from '../utils/request';
// 保存或编辑评估
export function saveAssessment(values) {
  return request('/crm/api/v1/assessment/saveAssessment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getDoctorNoteById(values) {
  return request('/crm/api/v1/assessment/getDoctorNoteById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

