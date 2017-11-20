/**
 * 订单管理
 * Created by lhw on 2017/11/16.
 */
import * as orderService from '../services/order';

import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {
  namespace: 'order',
  state: {
    orderList:[],
    orderPage:1,
    orderSize:10,
    orderTotal:0,
    balancePaymentslist:[],
    balancePaymentsPage:1,
    balancePaymentsSize:10,
    balancePaymentsTotal:0
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {

      });
    }
  },
  //调用服务器端接口
  effects: {
    *getOrderList({payload : values}, { call, put ,select}){
      const state = yield select(state => state.order)
      if (values.page === undefined) {
        values.page = state.orderPage;
      }
      if (values.size === undefined) {
        values.size = state.orderSize;
      }

      try {
        const {data} = yield call(orderService.getOrderList, values);
        yield put({type:'savaOrderList',payload:data} );
      }
      catch (err){
        console.log(err)
      }
    },
    *getOrderDetail({payload : values}, { call, put }){
      const {data} = yield call(orderService.getOrderDetail, values);
      if (code == 0) {
        //更新state
        // yield put({type:'savaOrderList',payload:values.data} );
      }
    },

    *getBalancePaymentslist({payload : values}, { call, put }){
      try {
        const {data} = yield call(orderService.getBalancePaymentslist, values);

        yield put({type:'savaBalancePaymentslist',payload:data} );

      }
      catch (err){
        console.log(err)
      }
    },
    *orderSubmit({payload : values}, { call, put }){
      try {
        const {data: { data, code,err} } = yield call(orderService.orderSubmit(), values);

      }
      catch (e){}
    },

    *orderPay({payload : values}, { call, put }){
      try {
        const {data: { data, code,err} } = yield call(orderService.orderPay(), values);

      }
      catch (e){}

    },
  },
  //同步请求，更新state
  reducers: {
    savaOrderList(state,{ payload: todo }) {
      return {...state, orderList:todo.data,orderSize:todo.size,orderPage:todo.page,orderTotal:todo.total};
    },
    savaBalancePaymentslist(state,{ payload: todo }) {
      return {...state, balancePaymentslist:todo.data,balancePaymentsSize:todo.size,balancePaymentsPage:todo.page,balancePaymentsTotal:todo.total};
    },
  }
};
