import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as cycleService from '../services/cycle';

export default {
  namespace: 'cyclePage',
  state: {
    isShowDetail: false,
    curTabsIndex: 0,
    curDetailTabsIndex: 0,
    systemTime: '',
    loopDatas: {},
    loopSecondDatas: {},
    loopThirdDatas: {},
    loopWeekDatas: {}
  },
  reducers: {

    changedTabActivity(state, { payload: { status} }) {
      let index = Number(state.curTabsIndex) + status;
      if (index == 3){
        index = 0;
      }
      if (index == -1){
        index = 2;
      }
      return {...state, curTabsIndex: index};
    },

    changedDetailTabActivity(state, { payload: { status} }) {
      let index = Number(state.curDetailTabsIndex) + status;
      if (index == 3){
        index = 0;
      }
      if (index == -1){
        index = 2;
      }
      return {...state, curDetailTabsIndex: index};
    },

    changedShowStatus(state, {}) {
      let isShowDetail = !state.isShowDetail;
      return {...state, isShowDetail};
    },

    //保存循环周期信息
    saveLoopList(state, {payload: {data}}) {
      console.log('第一页');
      console.log(data);
      return {...state, loopDatas:data};
    },

    //保存循环周期房间送餐信息
    saveloopRoomDishesList(state, {payload: {data}}) {
      console.log('第三页');
      console.log(data);
      return {...state, loopThirdDatas:data};
    },

    //保存循环周期菜品信息
    saveloopDishesList(state, {payload: {data}}) {
      console.log('第二页');
      console.log(data);
      return {...state, loopSecondDatas:data};
    },

    //保存单个循环详情
    saveloopListByWeek(state, {payload: {data}}) {
      console.log('单个循环详情');
      console.log(data);
      return {...state, loopWeekDatas:data};
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

    //查询循环周期房间送餐信息
    *getLoopRoomDishesList({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(cycleService.getLoopRoomDishesList, value);
      if (code == 0) {
        yield put({
          type: "saveloopRoomDishesList",
          payload: {
            data
          }
        })
      }
    },

    //查询循环周期菜品界面
    *getLoopDishesList({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(cycleService.getLoopDishesList, value);
      if (code == 0) {
        yield put({
          type: "saveloopDishesList",
          payload: {
            data
          }
        })
      }
    },

    //查询单个循环周期详情
    *getLoopListByWeek({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(cycleService.getLoopListByWeek, value);
      if (code == 0) {
        yield put({
          type: "saveloopListByWeek",
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
