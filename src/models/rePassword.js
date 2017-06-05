import * as rePswService from '../services/rePassword';
import { message } from 'antd';
import { browserHistory } from 'react-router'

export default {
  namespace: 'rePassword',
  state: {},
  reducers: {},
  effects: {
    //修改密码
    *updatePsw({ payload: values }, { call }) {
      const { data: { code } } = yield call(rePswService.updatePassword, values);
      if (code == 0) {
        message.success('修改成功');
        browserHistory.push('/login');
      }
    }
  }
}


