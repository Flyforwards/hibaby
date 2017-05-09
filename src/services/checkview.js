
import request from '../utils/request';
import  { PAGE_SIZE　} from '../constants';
const headers={
  "Content-Type":"application/json"
}
//获取查看ID
export function getCheckPage(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
