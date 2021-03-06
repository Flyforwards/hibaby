/**
 * Created by Flyforwards on 2017/7/11.
 */
import request from '../utils/request';

//增加banner
export function addBanner(values) {
  return request('/crm/api/v1/web/banner/add',{
    method:'POST',
    body:JSON.stringify(values),
  })
}

//删除banner
export function deleteBanner(values) {
  return request('/crm/api/v1/web/banner/delete',{
    method:'POST',
    body:JSON.stringify(values),
  })
}

//修改banner

export function upDateBanner(values) {
  return request('/crm/api/v1/web/banner/update',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据类型获取banner列表

export function getBannerList(values) {
  return request('/crm/api/v1/web/banner/findListByType',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
//根据类型获取banner

export function getBannerByType(values) {
  return request('/crm/api/v1/web/banner/findOneByType',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//根据id获取banner

export function getBannerById(values) {
  return request('/crm/api/v1/web/banner/findOneById',{
    method:'POST',
    body:JSON.stringify(values)
  })
}


//获取初始列表
export function getInitialList(values) {
  return request('/crm/api/v1/web/banner/findList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}

//首页 ---专家团队

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
//类型列表
export function typeList(values) {
  return request('/crm/api/v1/web/banner/typeList',{
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
