
import request from '../utils/request';

//集团数据保存
export function saveData(values) {
  return request('/crm/api/v1/dictionary/saveGroupDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//集团数据查看
export function checkData(values) {
  return request('/crm/api/v1/dictionary/getGroupDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//编辑集团数据
export function editData(values) {
  return request('/crm/api/v1/dictionary/modifyGroupDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

//集团列表数据
export function groupCharList(values) {
  return request('/crm/api/v1/dictionary/getGroupDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
