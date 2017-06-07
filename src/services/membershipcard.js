/**
 * Created by Flyforwards on 2017/6/1.
 */

import request from '../utils/request';

//销卡
export function cancelCard(values) {
  return request('/crm/api/v1/customer/cancelCard', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//扣费
export function chargingAmount(values) {
  return request('/crm/api/v1/customer/chargingAmount', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询扣费记录
export function getDeductionRecord(values) {
  return request('/crm/api/v1/customer/getDeductionRecord',{
    method: 'POST',
    body: JSON.stringify(values),
  })

};

//查询退费记录
export function getRefund(values) {
  return request('/crm/api/v1/customer/getRefund', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询续费记录
export function getRenew(values) {
  return request('/crm/api/v1/customer/getRenew', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//续费
export function renewAmount(values) {
  return request('/crm/api/v1/customer/renewAmount', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//退费
export function returnsAmount(values) {
  return request('/crm/api/v1/customer/returnsAmount', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};


//查询客户会员卡信息
export function getCustomerMembershipcard (values) {
  return request('/crm/api/v1/customer/getCustomerMembershipcard',{
    method:'post',
    body:JSON.stringify(values)
  })
};

//查询客户余额信息
export function getCustomerBalance (values) {
  return request('/crm/api/v1/customer/getCustomerBalance',{
    method:'post',
    body:JSON.stringify(values)
  })
};

//获取会员卡级别
export function getLevel(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//获取商品信息
export function getGoodsList(values) {
  return request('/crm/api/v1/commodity/selectData', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取打印基础信息
export function getPrintBaseMsg(values) {
  return request('/crm/api/v1/customer/getMemberCardBillInfo', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取服务器时间
export function getSystemTime(values) {
  return request('/crm/api/v1/getSystemTime', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取账单打印信息
export function getPrintAccountList(values) {
  return request('/crm/api/v1/customer/getMemberCardBillList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

