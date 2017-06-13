
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

    // getDetailEditSuccess(state, { payload: { editItem }}) {
    //   return {...state, editItem};
    // },
    //
    // getCustomerSave(state, { payload: { userList, noAppointmentPagination }}) {
    //   return {...state, userList, noAppointmentPagination: {  ...state.noAppointmentPagination,...noAppointmentPagination }};
    // },
    //
    // getSignCustomerSave(state, { payload: { signUserList, signPagination }}) {
    //   return {...state, signUserList, signPagination:{  ...state.signPagination,...signPagination } };
    // },
    // getSignCustomerSaveEdit(state, { payload: { editSignUserList, editSignPagination }}) {
    //   return {...state, editSignUserList, editSignPagination:{  ...state.editSignPagination,...editSignPagination } };
    // },
    // memberShipCardSave(state, { payload: { shipCards }}) {
    //   return {...state, shipCards};
    // },
    //
    // getDepartmentSuccess(state, { payload: { departments }}) {
    //   return {...state, departments};
    // },
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

    *saveCustomerVisEdit({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.saveCustomerVisEdit, values);
      if (code == 0) {
        message.success("保存客户参观信息成功");
        yield put(routerRedux.push('/crm/customer-vis'));
      }
    },

    //
    // *confirmTreatmentFinish({payload: values}, { call, put }) {
    //   const {data: { data, code} } = yield call(CustomerSerService.confirmTreatmentFinish, values);
    //   if (code == 0) {
    //     message.success("投诉完成处理");
    //     yield put({
    //       type: 'getCustomerCompById',
    //       payload: values,
    //     });
    //   }
    // },
    //
    // // 删除投诉记录
    // *deleteCustomerComp ({ payload: values}, { call, put }) {
    //   const {data: {data,code}} = yield call(CustomerSerService.deleteCustomerComp, values);
    //   if (code == 0) {
    //     message.success("删除投诉信息成功");
    //     yield put({
    //       type: 'getCustomerCompPage',
    //     });
    //   }
    // },
    //
    // // 部门负责人提交处理结果
    // *submitTreatmentResult ({ payload: values}, { call, put }) {
    //   const {data: {data,code}} = yield call(CustomerSerService.submitTreatmentResult, values);
    //   if (code == 0) {
    //     message.success("提交处理结果成功");
    //     yield put(routerRedux.push('/crm/customer-comp'));
    //   }
    // },
    //
    //
    // // 详情页删除
    // *deleteCustomerCompFromDetail ({ payload: values}, { call, put }) {
    //   const {data: {data,code}} = yield call(CustomerSerService.deleteCustomerComp, values);
    //   if (code == 0) {
    //     message.success("删除投诉信息成功");
    //     yield put(routerRedux.push('/crm/customer-comp'));
    //   }
    // },
    //
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
    //
    // // 获取当前地方中心的部门列表
    // *getCurrentEndemicDeptList({ payload: values}, { call, put }) {
    //   const {data: {data, code}} = yield call(systemService.getCurrentEndemicDeptList, values);
    //   if (code == 0) {
    //     yield put({
    //       type: 'getDepartmentSuccess',
    //       payload: { departments: data }
    //     })
    //   }
    // },




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

        // if (pathname === '/crm/customer-comp/add') {
        //   dispatch({
        //     type: 'getCurrentEndemicDeptList',
        //   });
        // }
        if (pathname === '/crm/customer-vis/detail') {
          dispatch({
            type: 'getCustomerVisById',
            payload: query
          });
          // dispatch({
          //   type: 'getCurrentEndemicDeptList',
          // });
        }
      })
    }
  },
};
