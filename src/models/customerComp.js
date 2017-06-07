
import * as CustomerSerService from '../services/customerSer';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import * as systemService from '../services/system';

export default {
  namespace: 'customerComp',
  state: {
    list: [],
    departments: [],
    item: {},
    editItem: null,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  reducers: {

    getCustomerCompSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
    getDetailEditSuccess(state, { payload: { editItem }}) {
      return {...state, editItem};
    },

    getCustomerSave(state, { payload: { userList, noAppointmentPagination }}) {
      return {...state, userList, noAppointmentPagination: {  ...state.noAppointmentPagination,...noAppointmentPagination }};
    },

    getSignCustomerSave(state, { payload: { signUserList, signPagination }}) {
      return {...state, signUserList, signPagination:{  ...state.signPagination,...signPagination } };
    },
    getSignCustomerSaveEdit(state, { payload: { editSignUserList, editSignPagination }}) {
      return {...state, editSignUserList, editSignPagination:{  ...state.editSignPagination,...editSignPagination } };
    },
    memberShipCardSave(state, { payload: { shipCards }}) {
      return {...state, shipCards};
    },

    getDepartmentSuccess(state, { payload: { departments }}) {
      return {...state, departments};
    },
  },
  effects: {


    // 创建客户投诉
    *saveCustomerComp({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(CustomerSerService.saveCustomerComp, values);
      if (code == 0) {
        message.success("创建客诉信息成功");
        yield put(routerRedux.push('/crm/customer-comp'));
      }
    },



    // 删除活动 列表页删除
    *deleteCustomerComp ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(CustomerSerService.deleteCustomerComp, values);
      if (code == 0) {
        message.success("删除投诉信息成功");
        yield put({
          type: 'getCustomerCompPage',
        });
      }
    },

    // 部门负责人提交处理结果
    *submitTreatmentResult ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(CustomerSerService.submitTreatmentResult, values);
      if (code == 0) {
        message.success("提交处理结果成功");
        yield put(routerRedux.push('/crm/customer-comp'));
      }
    },



    // 删除活动 列表页删除
    *deleteCustomerCompFromDetail ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(CustomerSerService.deleteCustomerComp, values);
      if (code == 0) {
        message.success("删除投诉信息成功");
        yield put(routerRedux.push('/crm/customer-comp'));
      }
    },

    // 详情
    *getCustomerCompById({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(CustomerSerService.getCustomerCompById, values);
      if (code == 0) {
        yield put({
          type: 'getDetailSuccess',
          payload: { item: data},
        })
      }
    },

    // 获取编辑数据
    *getActivityByIdEdit({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(activityService.getActivityById, values);
      if (code == 0) {
        yield put({
          type: 'getDetailEditSuccess',
          payload: { editItem: data },
        })
      }
    },
    // 编辑活动保存
    *updateActivity({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(activityService.updateActivity, values);
      if (code == 0) {
        message.success("活动保存成功")
        const query = parse(location.search.substr(1))
        yield put(routerRedux.push({
          pathname: '/crm/activity/detail',
          query
        }))
      }
    },
    // 获取当前地方中心的部门列表
    *getCurrentEndemicDeptList({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(systemService.getCurrentEndemicDeptList, values);
      if (code == 0) {
        yield put({
          type: 'getDepartmentSuccess',
          payload: { departments: data }
        })
      }
    },




    *getCustomerCompPage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, total, page, size, code } } = yield call(CustomerSerService.getCustomerCompList, values);
      if (code == 0) {
        yield put({
          type: 'getCustomerCompSave',
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

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if (pathname === '/crm/customer-comp') {
          dispatch({
            type: 'getCustomerCompPage',
            payload: query
          });

        }

        if (pathname === '/crm/customer-comp/add') {
          dispatch({
            type: 'getCurrentEndemicDeptList',
          });
        }
        if (pathname === '/crm/customer-comp/detail') {
          dispatch({
            type: 'getCustomerCompById',
            payload: query
          });
          dispatch({
            type: 'getCurrentEndemicDeptList',
          });
        }
        // if (pathname === '/crm/activity/edit') {
        //   dispatch({
        //     type: 'getActivityByIdEdit',
        //     payload: query
        //   });
        //
        //   dispatch({
        //     type: 'layout/getSystemTime',
        //   });
        //
        //   dispatch({
        //     type: 'getActivityCustomerPageListEdit',
        //     payload: { activityId: query.dataId }
        //   })
        //
        //   dispatch({
        //     type: 'getMemberShipCard',
        //   })
        // }
      })
    }
  },
};
