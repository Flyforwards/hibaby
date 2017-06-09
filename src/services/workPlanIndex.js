
import request from '../utils/request';
//查询工作计划日期
export function getWorkPlanDateList(values) {
  return request('/crm/api/v1/workplan/getWorkPlanDateList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//根据月份或者日期查询工作计划列表
export function getWorkPlanList(values) {
  return request('/crm/api/v1/workplan/getWorkPlanList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//新增工作计划
export function addWorkPlan(values) {
  return request('/crm/api/v1/workplan/addWorkPlan', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//删除工作计划
export function delWorkPlan(values) {
  return request('/crm/api/v1/workplan/delWorkPlan', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//编辑工作计划
export function updateWorkPlan(values) {
  return request('/crm/api/v1/workplan/updateWorkPlan', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};














