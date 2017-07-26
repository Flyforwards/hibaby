/**
 * Created by Flyforwards on 2017/7/18.
 */
//首页 ---专家团队
import request from '../utils/request';

//获取初始列表
export function getExpertInitialList(values) {
  return request('/crm/api/v1/web/news/findListByType',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//新增专家
export function addExpert(values) {
  return request('/crm/api/v1/web/news/add',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//删除专家
export function deleteExpert(values) {
  return request('/crm/api/v1/web/news/delete',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//根据表单类型获取单一信息
export function getExpertByOneType(values) {
  return request('/crm/api/v1/web/news/findOneByType',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据id获取专家信息
export function getExpertById(values) {
  return request('/crm/api/v1/web/news/findOneById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//修改专家信息
export function updateExpert(values) {
  return request('/crm/api/v1/web/news/update',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
