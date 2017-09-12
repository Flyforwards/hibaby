
import * as cardService from '../services/card';
import * as webCourseService from '../services/webCourse';
import * as customerService from '../services/customer';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { parse } from 'qs'

export default {
  namespace: 'course',
  state: {
    list: [], // 课程列表
    pagination: { // 课程分页
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    item: {},
    list2: [], // 预约人员列表
    pagination2: { // 预约人员分页
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  reducers: {

    getCourseListByPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
    getCourseCustomerListByPageSave(state, { payload: { list2, pagination2 }}) {
      return {...state, list2, pagination2: {  ...state.pagination2,...pagination2 }};
    },

  },
  effects: {
    *saveSerCourse({payload: values}, {call, put}) {
      const {data: { data, code} } = yield call(webCourseService.saveSerCourse, values);
      if (code == 0) {
        message.success("课程创建成功！");
        yield put(routerRedux.push('/service/order-course'));
      }
    },

    *getCourseListByPage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, total, page, size, code } } = yield call(webCourseService.getCourseListByPage, values);
      if (code == 0) {
        yield put({
          type: 'getCourseListByPageSave',
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

    // 详情
    *getSerCourseById({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(webCourseService.getSerCourseById, values);
      if (code == 0) {
        yield put({
          type: 'getDetailSuccess',
          payload: { item: data },
        })
      }
    },
    // 查询课程下预约人员列表
    *getCourseCustomerListByPage({ payload: values}, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const {data: { data, total, page, size, code } } = yield call(webCourseService.getCourseCustomerListByPage, values);
      if (code == 0) {
        yield put({
          type: 'getCourseCustomerListByPageSave',
          payload: {
            list2: data,
            pagination2: {
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
        if (pathname === '/service/order-course') {
          dispatch({
            type: 'getCourseListByPage',
            payload: query
          });
        }

        if (pathname === '/service/order-course/detail') {
          dispatch({
            type: 'getSerCourseById',
            payload: query
          });
          dispatch({
            type: 'getCourseCustomerListByPage',
            payload: query
          });
        }


      })
    }
  }
}
