
import * as CustomerSerService from '../services/customerSer';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import * as systemService from '../services/system';
import moment from 'moment'
export default {
  namespace: 'customerVis',
  state: {
    list: [],
    // departments: [],
    item: {},
    date: moment()
    // editItem: null,
    // pagination: {
    //   showQuickJumper: true,
    //   showTotal: total => `共 ${total} 条`,
    //   current: 1,
    //   total: null,
    // },
  },

  reducers: {

    getCustomerVisSave(state, { payload: { list }}) {
      return {...state, list};
    },
    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
    changeDate(state, { payload: { date }}) {
      return {...state, date };
    },

    removeItemFromList(state, { payload: { itemId }}) {
      const list = state.list.filter(record => record.id != itemId);
      console.log(list);
      return {...state, list };
    },

  },
  effects: {


    // 创建客户投诉
    *saveCustomerVis({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.saveCustomerVis, values);
      if (code == 0) {
        message.success("创建客户参观信息成功");
        yield put(routerRedux.push('/crm/customer-vis'));
      }
    },

    // 保存用户参观编辑信息，传需要删除的id过去
    *saveCustomerVisEdit({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.saveCustomerVisEdit, values);
      if (code == 0) {
        message.success("保存客户参观信息成功");
        yield put(routerRedux.push('/crm/customer-vis'));
      }
    },


    // 删除客户参观记录
    *deleteCustomerVis ({ payload: values}, { call, put }) {
      const {data: { code }} = yield call(CustomerSerService.deleteCustomerVis, values);
      if (code == 0) {
        message.success("删除客户参观信息成功");
        yield put(routerRedux.push('/crm/customer-vis'));
      }
    },


    // 详情
    *getCustomerVisById({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(CustomerSerService.getCustomerVisById, values);
      if (code == 0) {
        yield put({
          type: 'getDetailSuccess',
          payload: { item: data},
        })
      }
    },





    *getCustomerVisByDate({ payload: values }, { call, put, select }) {
      const { visDate } = values;
      if (!visDate) {
        const date = yield select (state => (state.customerVis.date))
        values =   { visDate: date.format('YYYY-MM-DD')}
      }

      const { data: {data, code} } = yield call(CustomerSerService.getCustomerVisListByDate, values);
      if (code == 0) {
        yield put({
          type: 'getCustomerVisSave',
          payload: {
            list: data,
          },
        })

      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/crm/customer-vis') {
          dispatch({
            type: 'getCustomerVisByDate',
            payload: {}
          });
        }

        if (pathname === '/crm/customer-vis/detail') {
          dispatch({
            type: 'getCustomerVisById',
            payload: query
          });

        }
      })
    }
  },
};
