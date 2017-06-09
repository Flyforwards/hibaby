
import request from '../utils/request';

//获取组织架构列表
export function getDepartmentByEndemicId(values) {
  return request('/crm/api/v1/position/getDepartmentByEndemicId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

// 根据部门id获取下属职位
export function getPosition(values) {
  return request('/crm/api/v1/position/getPositionByDeptId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

 //根据职位id删除职位信息
export function delPosition(values) {
  return request('/crm/api/v1/position/deletePosition', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//保存或修改职位信息
export function saveOrModifyPosition(values) {
  return request('/crm/api/v1/position/saveOrModifyPosition', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};



