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
//宣教手册id详情
export function getBrouchurDetailById(values) {
  return request('/crm/api/v1/brochure/getBrochureById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//宣教手册客户id 查询列表
export function getBrouchurDetailList(values) {
  return request('/crm/api/v1/brochure/getBrochureList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//删除宣教手册客户Byid
export function deleteBrouchurById(values) {
  return request('/crm/api/v1/brochure/delBrochure', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//宣教手册创建及保存
export function saveBrouchurs(values) {
  return request('/crm/api/v1/brochure/saveBrochure', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getBabyFeedingNoteList(values) {
  return request('/crm/api/v1/babyFeedingNote/getBabyFeedingNoteList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function saveBabyFeedingNote(values) {
  return request('/crm/api/v1/babyFeedingNote/saveBabyFeedingNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getBabyGrowthNoteById(values) {
  return request('/crm/api/v1/babyGrowthNote/getBabyGrowthNoteById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getBabyFeedingNoteById(values) {
  return request('/crm/api/v1/babyFeedingNote/getBabyFeedingNoteById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getMaternalEverydayPhysicalEvaluationById(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/getMaternalEverydayPhysicalEvaluationById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function delBabyFeedingNote(values) {
  return request('/crm/api/v1/babyFeedingNote/delBabyFeedingNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function delBabyGrowthNote(values) {
  return request('/crm/api/v1/babyGrowthNote/delBabyGrowthNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function delMaternalEverydayPhysicalEvaluation(values) {
  return request('/crm/api/v1/maternalEverydayPhysicalEvaluation/delMaternalEverydayPhysicalEvaluation', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


export function getBabyGrowthNoteList(values) {
  return request('/crm/api/v1/babyGrowthNote/getBabyGrowthNoteList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function saveBabyGrowthNote(values) {
  return request('/crm/api/v1/babyGrowthNote/saveBabyGrowthNote', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//对内婴儿游泳记录
export function getInsideBabySwimList(values) {
  return request('/crm/api/v1/babySwimming/getBabySwimmingList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//保存对内婴儿游泳记录
export function saveInsideBabySwim(values) {
  return request('/crm/api/v1/babySwimming/saveBabySwimming', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function getInsideBabySwimById(values) {
  return request('/crm/api/v1/babySwimming/getBabySwimmingById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
// 发送生产通知单
export function sendProductionNotification(values) {
  return request('/crm/api/v1/productionNotification/sendProductionNotification', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
// 发送入住通知单
export function sendOccupancyNotice(values) {
  return request('/crm/api/v1/occupancyNotice/sendOccupancyNotice', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
// 发送外出通知单
export function senddepartureNotice(values) {
  return request('/crm/api/v1/departureNotice/senddepartureNotice', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
// 发送退房通知单
export function sendCheckOutNotice(values) {
  return request('/crm/api/v1/checkOutNotice/sendCheckOutNotice', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
// 发送自由通知单
export function sendFreeNotice(values) {
  return request('/crm/api/v1/freeNotice/sendFreeNotice', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

//根据id删除婴儿评估
export function onDeleteBabydata(values) {
  return request('/crm/api/v1/assessment/DelBabyOccupancyAssessment', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
export function getCustomerInfoByCustomerName(values) {
  return request('/crm/api/v1/customer/getCustomerInfoByCustomerName', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//根据客户id 查询婴儿评估
export function getBabydataByCustomerid(values) {
  return request('/crm/api/v1/assessment/getBabyOccupancyAssessmentByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getCurrentEndemicDeptList(values) {
  return request('/crm/api/v1/department/getCurrentEndemicDeptList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//根据id查询婴儿入住评估详情
export function getBabyDataById(values) {
  return request('/crm/api/v1/assessment/getBabyOccupancyAssessmentById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//保存或编辑婴儿入住评估
export function onSaveBabyData(values) {
  return request('/crm/api/v1/assessment/saveBabyOccupancyAssessment', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//根据客户信息id得到婴儿信息
export function getBabymsgByCustomerId(values) {
  return request('/crm/api/v1/productionNotification/getBabyListByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


export function getBabyListByCustomerId(values) {
  return request('/crm/api/v1/productionNotification/getBabyListByCustomerId', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


export function getJournal(values) {
  return request('/crm/api/v1/journal/getJournal', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


export function updateJournal(values) {
  return request('/crm/api/v1/journal/updateJournal', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}


//爱丁堡忧郁单详情页
//1.保存或编辑爱丁堡忧郁单
export function saveEdinburghMelancholyGauge(values) {
  return request('/crm/api/v1/edinburghMelancholyGauge/saveEdinburghMelancholyGauge', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//2.根据客户id以及筛选条件查询爱丁堡忧郁单列表
export function getEdinburghMelancholyGaugeList(values) {
  return request('/crm/api/v1/edinburghMelancholyGauge/getEdinburghMelancholyGaugeList', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//3.根据id删除爱丁堡忧郁单
export function delEdinburghMelancholyGauge(values) {
  return request('/crm/api/v1/edinburghMelancholyGauge/delEdinburghMelancholyGauge', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}
//4.根据id查询爱丁堡忧郁单详情
export function getEdinburghMelancholyGaugeById(values) {
  return request('/crm/api/v1/edinburghMelancholyGauge/getEdinburghMelancholyGaugeById', {
    method: 'POST',
    body: JSON.stringify(values)
  })
}

export function getAssessmentById(values) {
  return request('/crm/api/v1/assessment/getAssessmentById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


export function delBabySwimming(values) {
  return request('/crm/api/v1/babySwimming/delBabySwimming', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


//预约技师
//1.根据日期查询技师列表
export function getTechnicians(values) {
  return request('/crm/api/v1/technician/getTechnicians', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//2.根据日期查询技师预约详情
export function getTechniciansInfo(values) {
  return request('/crm/api/v1/technician/getTechniciansInfo', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//3.查询使用率
export function getTechnicianUtilization(values) {
  return request('/crm/api/v1/technician/getTechnicianUtilization', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//4.查询技师预约历史记录分页列表
export function getTechnicianHistory(values) {
  return request('/crm/api/v1/technician/getTechnicianHistory', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//5.开启预约
export function openTechnician(values) {
  return request('/crm/api/v1/technician/openTechnician', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//6.关闭预约
export function closeTechnician(values) {
  return request('/crm/api/v1/technician/closeTechnician', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//7.切换技师预约上线离线状态
export function changeTechnicianState(values) {
  return request('/crm/api/v1/technician/changeTechnicianState', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//8.取消预约
export function cancelTechnician(values) {
  return request('/crm/api/v1/technician/cancelTechnician', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//9,查询技师列表
export function getTechnicianList(values) {
  return request('/crm/api/v1/technician/getTechnicianList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


//根据客户id 查询婴儿护理记录单
export function getBabyNursingNoteList(values) {
  return request('/crm/api/v1/babyNursingNote/getBabyNursingNoteList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//根据ID查询婴儿护理记录

export function getBabyNursingById(values) {
  return request('/crm/api/v1/babyNursingNote/getBabyNursingNoteById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//根据id删除婴儿护理记录
export function delBabyNursing(values) {
  return request('/crm/api/v1/babyNursingNote/delBabyNursingNote', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//查询宝宝托管状态
export function getBabySwitchState(values) {
  return request('/crm/api/v1/babyNursingNote/getBabySwitchState', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//保存编辑婴儿护理记录单
export function saveBabyNursing(values) {
  return request('/crm/api/v1/babyNursingNote/saveBabyNursingNote', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//修改宝宝托管开关状态
export function updateBabySwitchState(values) {
  return request('/crm/api/v1/babyNursingNote/updateBabySwitchState', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

























