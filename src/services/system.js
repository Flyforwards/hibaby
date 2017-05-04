import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';
const headers={
  "Content-Type":"application/json"
}
export function system(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
//获取数据字典内容
export function Dictionary(values) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function fromModal(values) {
  return request('/crm/api/v1/project/list', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function listByPage(values) {
  return request('/crm/api/v1/permission/listByPage', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function SelectList(values) {
  return request('/crm/api/v1/permission/treeByProjectId', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function organization(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function customer(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function LogView(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}
export function add(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })  
}
export function view(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    headers,
    body: JSON.stringify(values),
  })
}