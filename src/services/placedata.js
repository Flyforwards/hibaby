
import request from '../utils/request';

//  添加地方数据
export function AddPlaceData(values) {
  return request('/crm/api/v1/dictionary/saveLocalDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//  地方数据查看
export function PlaceFind(values) {
  return request('/crm/api/v1/dictionary/getLocalDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//  编辑地方集团数据
export function EditPlaceData(values) {
  return request('/crm/api/v1/dictionary/modifyLocalDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//地方列表数据
export function localCharList(values) {
  return request('/crm/api/v1/dictionary/getLocalDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
