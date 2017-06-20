/**
 * Created by wang on 2017/6/13.
 */

import { routerRedux } from 'dva/router';
import * as CustomerSerService from '../services/customerSer';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import * as systemService from '../services/system';

export default {
  namespace: 'phoneSystem',
  state: {
    list: [],
    item: null,
    editItem: null,
    signUserList: [], // 预约用户列表

  },

  reducers: {

    getActivityPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
    getDetailEditSuccess(state, { payload: { editItem }}) {
      return {...state, editItem};
    },

  },
  effects: {

    // // 获取会员身份下拉选项， 也是卡种列表
    // *getMemberShipCard({payload: values}, { call, put }) {
    //   const {data: { data, code} } = yield call(systemService.getMemberShipCard, values);
    //   if (code == 0) {
    //     yield put({
    //       type: 'memberShipCardSave',
    //       payload: { shipCards: data}
    //     })
    //   }
    // },
    //
    // // 预约会员用户
    // *saveMemberCustomer({ payload: values}, { call, put }) {
    //   const {data: {data,code}} = yield call(activityService.saveMemberCustomer, values);
    //   if (code == 0) {
    //     message.success("预约会员用户成功");
    //     if (values.from ) {
    //       yield put({
    //         type: 'getActivityPage',
    //       });
    //     } else {
    //       yield put({
    //         type: 'getActivityById',
    //         payload: { dataId: values.activityId}
    //       });
    //       yield put({
    //         type: 'getActivityCustomerPageList',
    //         payload: { activityId: values.activityId}
    //       })
    //
    //     }
    //   }
    // },

    *getByCurrentUser({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.getByCurrentUser, values);
      if (code == 0) {
        // yield put({
        //   type: 'memberShipCardSave',
        // })
        console.log(data);
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if (pathname === '/crm/phone-system') {
          dispatch({
            type: 'getByCurrentUser',
          });


        }
      })
    }
  },
};
