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
    item: {},
    modalVisible: false,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },

    users:[],
    userPagination:{
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...{ payload }, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    getListByPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },

    getListByUserPageSave(state, { payload: { users, userPagination }}) {
      return {...state, users, pagination: {  ...state.userPagination,...userPagination }};
    },

    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
    getDetailEditSuccess(state, { payload: { editItem }}) {
      return {...state, editItem};
    },

  },
  effects: {

    *phoneSystemSave({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.phoneSystemSave, values);
      if (code == 0) {
        message.success('保存客服信息成功');
        yield call(routerRedux.push('/crm/phone-system')  )
      }
    },


    *listByPage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, total, page, size, code } } = yield call(CustomerSerService.listByPage, values);
      if (code == 0) {
        yield put({
          type: 'getListByPageSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },

    *getUserListByPage({ payload: values }, { call, put }) {
      if (!values.page) {
        values.page = 1;
      }
      if (!values.size) {
        values.size = 10;
      }
      const { data: { data, total, page, size, code } } = yield call(CustomerSerService.listByUserPage, values);
      if (code == 0) {
        yield put({
          type: 'getListByUserPageSave',
          payload: {
            users: data,
            userPagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/crm/phone-system') {
          dispatch({
            type: 'listByPage'
          })
        }
      })
    }
  },
};
