
import request from '../utils/request';
const headers={
  "Content-Type":"application/json"
}
//添加地方数据
export function AddPlaceData(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//地方数据查看
export function PlaceFind(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//编辑地方集团数据
export function EditPlaceData(values) {
  return request('/crm/api/v1/dictionary/modifyDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
