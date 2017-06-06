
import request from '../utils/request';

// 获取服务器时间
export function getSystemTime(values) {
  return request('/crm/api/v1/getSystemTime', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//集团保存接口
export function systemsave(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//添加权限
export function permissionAdd(values) {
  return request('/crm/api/v1/permission/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//修改权限
export function permissionUpdata(values) {
  return request('/crm/api/v1/permission/update', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取数据字典内容
export function Dictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//获取主模块
export function fromModal(values) {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//菜单列表数据
export function MainMenuList(values) {
  return request('/crm/api/v1/module/currentUserModuleList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//获取权限管理列表
export function listByPageSave(values) {
  return request('/crm/api/v1/permission/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function SelectListSave(values) {
  return request('/crm/api/v1/permission/treeByProjectId', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//删除权限数据
export function delpermissionSave(values) {
  return request('/crm/api/v1/permission/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function customer(values) {
  return request('/crm/api/v1/customer/getCustomerPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function LogView(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function add(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function checkData(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}


export function getRolesByPage(values) {
  return request('/crm/api/v1/role/listByPage', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function roleAdd(values) {
  return request('/crm/api/v1/role/add', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function roleEdit(values) {
  return request('/crm/api/v1/role/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function roleDel(values) {
  return request('/crm/api/v1/role/del', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

// 获取会员身份下拉选项， 也是卡种列表
export function getMemberShipCard(values) {
  return request('/crm/api/v1/membershipcard/getMembershipcard', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
