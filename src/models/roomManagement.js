import * as roomManagement from '../services/roomManagement';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';

export default {
  namespace: 'roomManagement',
  state: {
    listData:[]
  },

  reducers: {

  }
  ,
  effects: {
    *listByPage({ payload: values }, { call,put }) {
      let size = 10;
      let page = 1;

      const dict = {page:page,size:size}

      const { data: { code } } = yield call(roomManagement.listByPage, dict);
      if (code == 0) {

      }
    }
  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {

      })
    }
  }
}


