import * as roomManagement from '../services/roomManagement';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { parse } from 'qs'
export default {
  namespace: 'roomStatusManagement',
  state: {
    packageAry:[],
    dayStatusData:'',
  },

  reducers: {
    setPackageAry(state, { payload: todo }){
      return {...state,packageAry:todo.data};
    },
    setDayStatusData(state, { payload: todo }){
      return {...state,dayStatusData:todo.data};
    },
  }
  ,
  effects: {
    *listByMain({ payload: values }, { call,put }) {
      const { data: { code,data } } = yield call(roomManagement.listByMain);
      if (code == 0) {
        yield put({type: 'setPackageAry',payload:{data}});
      }
    },
    *dayStatus({ payload: values }, { call,put }) {
      const param = parse(location.search.substr(1))
      const defData = {useDate:moment().format()}
      const { data: { code,data } } = yield call(roomManagement.dayStatus,{...defData,...param});
      if (code == 0) {
        yield put({type: 'setDayStatusData',payload:{data}});
      }
    },
    *dayStatusUpdate({ payload: values }, { call,put }) {
      const { data: { code,data } } = yield call(roomManagement.dayStatusUpdate);
      if (code == 0) {
        console.log(data);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chamber/roomstatusindex') {
          dispatch({type: 'listByMain'});
          dispatch({type: 'dayStatus'});
        }
      })
    }
  }
}


