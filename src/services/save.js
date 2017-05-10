
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
