import request from '../utils/request';
// 保存或编辑评估
export function saveAssessment(values) {
  return request('/crm/api/v1/assessment/saveAssessment', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getAssessmentByCustomerId(values) {
  return request('/crm/api/v1/assessment/getAssessmentByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function DelAssessment(values) {
  return request('/crm/api/v1/assessment/DelAssessment', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getMaternalEverydayPhysicalEvaluationList(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/getMaternalEverydayPhysicalEvaluationList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getCustomerInfoByCustomerId(values) {
  return request('/crm/api/v1/customer/getCustomerInfoByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function saveMaternalEverydayPhysicalEvaluation(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/saveMaternalEverydayPhysicalEvaluation', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//儿科、中医、产科记录单详情
//1.根据id查询记录详情
export function getDoctorNoteById(values) {
  return request('/crm/api/v1/doctornote/getDoctorNoteById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//2.根据客户id和记录单类型以及筛选条件查询记录单列表
export function getdoctornoteList(values) {
  return request('/crm/api/v1/doctornote/getdoctornoteList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//3.保存或编辑记录单
export function saveDoctorNote(values) {
  return request('/crm/api/v1/doctornote/saveDoctorNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//4.根据id删除记录
export function DelDoctornote(values) {
  return request('/crm/api/v1/doctornote/DelDoctornote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


export function getBrouchurDetailById(values) {
  return request('/crm/api/v1/brochure/getBrochureById', {
  method: 'POST',
  body: JSON.stringify(values),
   })
  }

export function getBabyFeedingNoteList(values) {
  return request('/crm/api/v1/babyFeedingNote/getBabyFeedingNoteList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function saveBabyFeedingNote(values) {
  return request('/crm/api/v1/babyFeedingNote/saveBabyFeedingNote', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getBabyGrowthNoteById(values) {
  return request('/crm/api/v1/babyGrowthNote/getBabyGrowthNoteById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getBabyFeedingNoteById(values) {
  return request('/crm/api/v1/babyFeedingNote/getBabyFeedingNoteById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getMaternalEverydayPhysicalEvaluationById(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/getMaternalEverydayPhysicalEvaluationById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getBabyGrowthNoteList(values) {
  return request('/crm/api/v1/babyGrowthNote/getBabyGrowthNoteList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function saveBabyGrowthNote(values) {
  return request('/crm/api/v1/babyGrowthNote/saveBabyGrowthNote', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

