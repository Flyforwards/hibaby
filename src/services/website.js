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
//获取初始列表
export function getInitialList(values) {
  return request('/crm/api/v1/web/banner/findList',{
    method:'POST',
    body:JSON.stringify(values)
  })
}
