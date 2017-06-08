import request from '../utils/request';
//获取卡种分页列表
export function getMembershipcardPageList(values) {
  return request('/crm/api/v1/membershipcard/getMembershipcardPageList', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//获取折扣权限,接口还没出
export function getZhekou(values) {
  return request('/crm/api/v1/membershipcard/getSale', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//获取卡种类型
export function getCardType(values) {
  return request('/crm/api/v1/membershipcard/getCardType',{
    method: 'POST',
    body: JSON.stringify(values),
  })

}


//根据卡种id获取卡种信息
export function getMembershipcardById(values) {
  return request('/crm/api/v1/membershipcard/getMembershipcardById', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//保存卡种信息
export function saveMembershipcard(values) {
  return request('/crm/api/v1/membershipcard/saveMembershipcard', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};
//更新卡种信息
export function modifyMembershipcard(values) {
  return request('/crm/api/v1/membershipcard/modifyMembershipcard', {
    method: 'POST',
    body: JSON.stringify(values),
  })
};

//删除卡种信息

export function deleteCardById (values) {
  return request('/crm/api/v1/membershipcard/deleteMembershipcard',{
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
