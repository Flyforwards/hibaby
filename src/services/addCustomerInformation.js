import request from '../utils/request';

//获取省市级联地址字典信息 ，取省时id传0，取市时传省id
export function getCityData(values) {
  return request('/crm/api/v1/dictionary/getProvincesDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

export function getNationalData() {
  return request('/crm/api/v1/dictionary/getNationDictionary', {
    method: 'POST',
  })
};


export function saveCustomer(values) {
  return request('/crm/api/v1/customer/saveCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

export function updateCustomer(values) {
  return request('/crm/api/v1/customer/updateCustomer', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


export function savaExtensionInfo(values) {
  return request('/crm/api/v1/customer/saveCustomerExtend', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

export function updateCustomerExtend(values) {
  return request('/crm/api/v1/customer/updateCustomerExtend', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


export function savaRemark(values) {
  return request('/crm/api/v1/customer/saveCustomerRemark', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//数据字典
export function getDataDict(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//会员身份 特殊身份  1会员 2特殊
export function getMembershipcardByType(values) {
  return request('/crm/api/v1/membershipcard/getMembershipcardByType', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//会员编号
export function getMemberSerial(values) {
  return request('/crm/api/v1/serial/getMemberSerial', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
// 购买套餐
export function getMainCustomerPackageById(values) {
  return request('/crm/api/v1/customer/getMainCustomerPackageById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//获取基本信息
export function getCustomerById(values) {
  return request('/crm/api/v1/customer/getCustomerById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//获取扩展信息
export function getCustomerExtendById(values) {
  return request('/crm/api/v1/customer/getCustomerExtendById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

// 获取备注信息
export function getCustomerRemarkById(values) {
  return request('/crm/api/v1/customer/getCustomerRemarkById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

// 获取附件信息
export function getFileURL(values) {
  return request('/crm/api/v1/getFileURL', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

// 获取套餐信息
export function getCustomerPackageById(values) {
  return request('/crm/api/v1/customer/getMainCustomerPackageById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};





