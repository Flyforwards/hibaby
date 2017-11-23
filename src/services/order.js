import request from '../utils/request';


//订单列表
export function getOrderList(values) {
  return request('/crm/api/v1/order/customerorderlist', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//订单详情
export function getOrderDetail(values) {
  return request('/crm/api/v1/order/detail', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//订单提交
export function orderSubmit(values) {
  return request('/crm/api/v1/order/submit', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//订单支付
export function orderPay(values) {
  return request('/crm/api/v1/order/pay', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//收支记录列表
export function getBalancePaymentslist(values) {
  return request('/crm/api/v1/transactionrecords/balancepaymentslist', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//账户变更记录
export function transactionrecordList(values) {
  return request('/crm/api/v1/transactionrecords/transactionrecordList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
