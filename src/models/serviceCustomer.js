/**
 * Created by yangjingjing on 2017/8/16.
 */
import * as customerService from '../services/customer';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {
  namespace: 'serviceCustomer',
  state : {
    customerPageList : [],//客户信息分页数据
    total : 0,
    page : 1,
    size : 10,
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {

      });
    }
  },
  effects: {
    //获取客户信息分页数据
    *getCustomerPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        //更新state
        yield put({type:'setCustomerPageList',payload:{data,total,page,size}} );
      }
    },
  },
  reducers: {
    setCustomerPageList(state, { payload: {data: customerPageList, total, page, size} }){
      let customerData = {
        ...state,
        customerPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? customerPageList.length : (page - 1) * 10 + customerPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...customerData,range}
    },
  }

}
