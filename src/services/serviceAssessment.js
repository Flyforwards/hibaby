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

export function getAssessmentBabyInfoByCustomerId(values) {
  return request('/crm/api/v1/assessment/getAssessmentBabyInfoByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function saveAssessmentBabyInfo(values) {
  return request('/crm/api/v1/assessment/saveAssessmentBabyInfo', {
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

//中医、产科查房记录单详情
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

//儿科查房记录详情单
//1.根据id查询记录详情
export function getPediatricNoteById(values) {
  return request('/crm/api/v1/pediatricnote/getPediatricNoteById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//2.根据客户id和记录单类型以及筛选条件查询记录单列表
export function getPediatricNoteList(values) {
  return request('/crm/api/v1/pediatricnote/getPediatricNoteList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//3.保存或编辑记录单
export function savePediatricNote(values) {
  return request('/crm/api/v1/pediatricnote/savePediatricNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//4.根据id删除记录
export function DelPediatricNote(values) {
  return request('/crm/api/v1/pediatricnote/DelPediatricNote', {
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
//对内婴儿游泳记录
export function getInsideBabySwimList(values) {
  return request('/crm/api/v1/babySwimming/getBabySwimmingList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存对内婴儿游泳记录
export function saveInsideBabySwim(values) {
  return request('/crm/api/v1/babySwimming/saveBabySwimming', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function getInsideBabySwimById(values) {
  return request('/crm/api/v1/babySwimming/getBabySwimmingById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
// 发送生产通知单
export function sendProductionNotification(values) {
  return request('/crm/api/v1/productionNotification/sendProductionNotification', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


//根据id删除婴儿评估
export function onDeleteBabydata(values) {
  return request('/crm/api/v1/assessment/DelBabyOccupancyAssessment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function getCustomerInfoByCustomerName(values) {
  return request('/crm/api/v1/customer/getCustomerInfoByCustomerName', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据客户id 查询婴儿评估
export function getBabydataByCustomerid(values) {
  return request('/crm/api/v1/assessment/getBabyOccupancyAssessmentByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function getCurrentEndemicDeptList(values) {
  return request('/crm/api/v1/department/getCurrentEndemicDeptList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据id查询婴儿入住评估详情
export function getBabyDataById(values) {
  return request('/crm/api/v1/assessment/getBabyOccupancyAssessmentById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存或编辑婴儿入住评估
export function onSaveBabyData(values) {
  return request('/crm/api/v1/assessment/saveBabyOccupancyAssessment', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据客户信息id 得到婴儿信息
export function getBabymsgByCustomerId(values) {
  return request('/crm/api/v1/productionNotification/getBabyListByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


export function getBabyListByCustomerId(values) {
  return request('/crm/api/v1/productionNotification/getBabyListByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
