import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';

export function system(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainPageLists', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function add(values) {
  return request('/crm/api/v1/dictionary/saveDictionary', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
export function view(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
