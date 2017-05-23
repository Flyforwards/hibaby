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

export function savaExtensionInfo(values) {
  return request('/crm/api/v1/customer/saveCustomerExtend', {
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

