import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as cycleService from '../services/cycle';

export default {
  namespace: 'cyclePage',
  state: {
    isShowDetail: false,
    curTabsIndex: '1',
    curDetailTabsIndex: '1',
    loopList: {},
    systemTime: ''
  },
  reducers: {

    changedTabActivity(state, { payload: { status} }) {
      let index = Number(state.curTabsIndex) + status;
      let indexStr = index+'';
      return {...state, curTabsIndex: indexStr};
    },

    changedDetailTabActivity(state, { payload: { status} }) {
      if (status == 0){//重置
        let indexStr = '1';
        return {...state, curDetailTabsIndex: indexStr};
      }
      else {
        let index = Number(state.curDetailTabsIndex) + status;
        let indexStr = index+'';
        return {...state, curDetailTabsIndex: indexStr};
      }
    },

    changedShowStatus(state, {}) {
      let isShowDetail = !state.isShowDetail;
      return {...state, isShowDetail};
    },

    //保存循环周期信息
    saveLoopList(state, {payload: {data: loopList}}) {
      console.log(loopList);
      return {...state, loopList};
    },

    //保存服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}) {
      return {...state, systemTime};
    }
  },
  effects: {

    //查询循环周期
    *getLoopList({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(cycleService.getLoopList, value);
      if (code == 0) {
        yield put({
          type: "saveLoopList",
          payload: {
            data
          }
        })
      }
    },

    //获取服务器时间
    *getSystemTime({payload: values}, {call, put}){
      const {data: {code, data}} = yield  call(cycleService.getSystemTime, values);
      if (code == 0) {
        yield put({
          type: 'saveSystemTime',
          payload: {
            data
          }
        })
      }
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/meals/nutritionist/cycle') {

          //查询循环周期
          dispatch({type: 'getLoopList'});

          //获取服务器时间
          dispatch({type: 'getSystemTime'});
        }
      })
    }
  }
}
