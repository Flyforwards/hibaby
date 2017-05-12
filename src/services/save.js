
import request from '../utils/request';
const headers={
  "Content-Type":"application/json"
}
//集团数据保存
export function saveData(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//集团数据查看
export function checkData(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
//编辑集团数据
export function editData(values) {
  return request('/crm/api/v1/dictionary/modifyDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
