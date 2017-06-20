
import request from '../utils/request';
import  { PAGE_SIZE　} from 'common/constants';

//获取分页列表
export function listByPage(values) {
  return request('/crm/api/v1/packageInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除套餐
export function del(values) {
  return request('/crm/api/v1/packageInfo/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加套餐
export function add(values) {
  return request('/crm/api/v1/packageInfo/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改套餐
export function edit(values) {
  return request('/crm/api/v1/packageInfo/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取套房下拉列表
export function selectData(values) {
  return request('/crm/api/v1/suite/selectData', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据套餐ID查询套餐详情
export function findById(values) {
  return request('/crm/api/v1/packageInfo/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取套餐等级列表
export function getCardLevel(values) {
  return request('/crm/api/v1/membershipcard/getCardLevel', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//服务项目分页列表
export function serviceListByPage(values) {
  return request('/crm/api/v1/serviceInfo/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//房间分页列表
export function roomList(values) {
  return request('/crm/api/v1/room/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据字典主表id和删除标识和字典类型获取字典
export function getDictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//套房分页列表
export function suiteListByPage(values) {
  return request('/crm/api/v1/suite/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//添加套房信息
export function roomAdd(values) {
  return request('/crm/api/v1/suite/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除套房信息
export function roomDel(values) {
  return request('/crm/api/v1/suite/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据ID查询套房管理信息
export function roomFindById(values) {
  return request('/crm/api/v1/suite/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改套房信息
export function roomEdit(values) {
  return request('/crm/api/v1/suite/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取商品分页列表信息
export function commodityListByPage(values) {
  return request('/crm/api/v1/commodity/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//汉字转拼音首字符
export function chineseToPinyin(values) {
  return request('/crm/api/v1/chineseToPinyin', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//新增商品
export function commodityAdd(values) {
  return request('/crm/api/v1/commodity/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除商品
export function commodityDel(values) {
  return request('/crm/api/v1/commodity/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//根据ID查询商品信息
export function commodityFindById(values) {
  return request('/crm/api/v1/commodity/findById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改商品的信息
export function commodityFindEdit(values) {
  return request('/crm/api/v1/commodity/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
