
import request from '../utils/request';
import  { PAGE_SIZE　} from 'common/constants'
//获取预备调餐的用户列表信息
export function getDepartmentNodes(values) {
  return request('/crm/api/v1/department/getDepartmentNodes', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
