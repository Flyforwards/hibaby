/**
 * 游泳预约
 * Created by yangjingjing on 2017/9/11.
 */
import * as orderSwimming from '../services/orderSwimming';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js';
import { parse } from 'qs';
import moment from  'moment'

export default {
  namespace: 'swimming',
  state: {
    indexData:[],
    detailData:null,
  },
  subscriptions: {
    setup({dispatch,history}) {
      return history.listen(({ pathname, query }) => {
      });
    }
  },
  effects: {
    *getSwimmingRooms({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(orderSwimming.getSwimmingRooms, values);
      if (code == 0) {
        yield put({type:'setIndexData',payload:{data}} );

      }
    },
    *changeSwimmingState({payload : values}, { call, put,select }){
      const {data: { code,err} } = yield call(orderSwimming.changeSwimmingState, values);
      if (code == 0) {
        message.info("状态修改成功");
      }
    },
    *getSwimmingRoomsInfo({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(orderSwimming.getSwimmingRoomsInfo, values);
      if (code == 0) {
        yield put({type:'setSwimmingRoomsInfo',payload:{data}} );
      }
    }
  },
  reducers: {
    setIndexData(state, { payload: {data: data} }){
      return {...state,indexData: data.list}
    },
    setSwimmingRoomsInfo(state, { payload: {data: data} }){
      return {...state,detailData: data}
    },
  }
}
