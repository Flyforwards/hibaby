
import * as activityService from '../services/activity';
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import * as systemService from '../services/system';
export default {
  namespace: 'customer',
  state: {
    list: [],
    item: null,
    editItem: null,
    signUserList: [], // 预约用户列表
    editSignUserList: [], // 编辑
    userList:[], // 会员用户列表
    shipCards:[],
    fetusAry:[],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },

  },

  reducers: {

    getCustomerPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },

    memberShipCardSave(state, { payload: { shipCards }}) {
      return {...state, shipCards};
    },
    addMutDictData(state, { payload: todo }){
      if(todo.abName === 'YCC'){
        return {...state,fetusAry:todo.data};
      }
      return {...state};
    },
  },
  effects: {

    // 获取会员身份下拉选项， 也是卡种列表
    *getMemberShipCard({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(systemService.getMemberShipCard, values);
      if (code == 0) {
        yield put({
          type: 'memberShipCardSave',
          payload: { shipCards: data }
        })
      }
    },

    // 删除客户
    *deleteCustomer ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(customerService.deleteCustomer, values);
      if (code == 0) {
        message.success("删除客户成功");
        yield put({
          type: 'getCustomerPage',
        });
      }
    },
    // 获取用户列表
    *getCustomerPage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      console.log(values)
      const { data: { data, total, page, size, code } } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        yield put({
          type: 'getCustomerPageSave',
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

    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        abName:value.abName,
        softDelete: 0,
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {

        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
            data:data,
          }
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if (pathname === '/crm/customer') {
          dispatch({
            type: 'getCustomerPage',
            payload: query
          });
          dispatch({
            type: 'getMemberShipCard',
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'YCC',
            }
          });

        }
        // if (pathname === '/crm/customer/detail') {
        //   dispatch({
        //     type: 'getActivityById',
        //     payload: query
        //   });
        //   dispatch({
        //     type: 'getActivityCustomerPageList',
        //     payload: { activityId: query.dataId }
        //   })
        // }
        // if (pathname === '/crm/customer/edit') {
        //   dispatch({
        //     type: 'getActivityByIdEdit',
        //     payload: query
        //   });
        //
        //   dispatch({
        //     type: 'getActivityCustomerPageListEdit',
        //     payload: { activityId: query.dataId }
        //   })
        // }
      })
    }
  },
};
