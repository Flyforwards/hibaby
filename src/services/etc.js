/**
 * Created by UI on 2017/5/24.
 */

import request from '../utils/request';

export function getRawData(params) {
  return request('/crm/api/v1/dictionary/getDictionary', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

