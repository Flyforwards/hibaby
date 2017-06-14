import * as roomManagement from '../services/roomManagement';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
export default {
  namespace: 'roomStatusManagement',
  state: {
    packageAry:[]
  },

  reducers: {
    setPackageAry(state, { payload: todo }){
      return {...state,packageAry:todo.data};
    },
  }
  ,
  effects: {
    *listByMain({ payload: values }, { call,put }) {
      const { data: { code,data } } = yield call(roomManagement.listByMain);
      if (code == 0) {
        yield put({type: 'setPackageAry',payload:{data}});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chamber/roomstatusindex') {
          dispatch({type: 'listByMain'});
        }
      })
    }
  }
}


