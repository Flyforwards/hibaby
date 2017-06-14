/**
 * Created by Flyforwards on 2017/6/13.
 */

import * as cardService from '../services/printCustomer';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'printCustomer',
  state: {
    showOne:false,
    showTwo:false,
    showThree:false,
    healthPrint:false,
  },
  reducers: {
    //打印信息报存
    saveBaseData(state, { payload: { data: baseData } }){
      return { ...state, baseData}
    },
    saveExtendData(state, { payload: { data: extendData } }){
      return { ...state, extendData}
    },
    //改变Tab
    setAddCustomerTab(state, { payload: todo }){
      return {...state,healthPrint:todo};
    },
    //改变状态值1
    switchShowOne(state) {
      return {
        ...state,
        showOne: !state.showOne,
      }
    },
    //改变状态值2
    switchShowTwo(state) {
      return {
        ...state,
        showTwo: !state.showTwo,
      }
    },
    //改变状态值3
    switchShowThree(state) {
      return {
        ...state,
        showThree: !state.showThree,
      }
    },
  },
  effects: {
    //查看获取根据客户ID查询客户基本信息
    *getPrintBase({ payload:values }, { call, put, select }){
      const dataId =queryURL('dataId')
      const value = { ...values,dataId}
      const { data: { code, data } } = yield call(cardService.getPrintBase, value);
      if ( code == 0) {
        yield put({
          type:'saveBaseData',
          payload: {
            data
          }
        });
      }
    },
    //查看获取根据客户ID查询客户扩展信息
    *getPrintExtend({ payload:values }, { call, put, select }){
      const dataId =queryURL('dataId')
      const value = { ...values,dataId}
      const { data: { code, data } } = yield call(cardService.getPrintExtend, value);
      if ( code == 0) {
        yield put({
          type:'saveExtendData',
          payload: {
            data
          }
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if(pathname === '/crm/customer/printCustomerPage'){
          dispatch({
            type:'getPrintBase',
          })
          dispatch({
            type:'getPrintExtend',
          })

        }
      })
    }
  }
}


