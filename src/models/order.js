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
    *getOrderList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(orderService.getOrderList(), values);
      if (code == 0) {
        //更新state
        yield put({type:'savaOrderList',payload:values.data} );
      }
    },
  },
  //同步请求，更新state
  reducers: {
    savaOrderList(state,data) {
      return {...state, orderList:data};
    },
  }
};
