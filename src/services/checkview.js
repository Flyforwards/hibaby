
import request from '../utils/request';

//获取查看ID
export function getCheckPage(values) {
  return request('/crm/api/v1/dictionary/getDictionaryMainAndSide', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
