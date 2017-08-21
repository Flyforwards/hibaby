
import request from '../utils/request';
// 保存或编辑评估
export function saveAssessment(values) {
  return request('/crm/api/v1/assessment/saveAssessment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getAssessmentByCustomerId(values) {
  return request('/crm/api/v1/assessment/getAssessmentByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function DelAssessment(values) {
  return request('/crm/api/v1/assessment/DelAssessment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getMaternalEverydayPhysicalEvaluationList(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/getMaternalEverydayPhysicalEvaluationList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getCustomerInfoByCustomerId(values) {
  return request('/crm/api/v1/customer/getCustomerInfoByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function saveMaternalEverydayPhysicalEvaluation(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/saveMaternalEverydayPhysicalEvaluation', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

