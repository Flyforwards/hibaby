
import * as activityService from '../services/activity';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'

export default {
  namespace: 'activity',
  state: {
    list: [],
    item: null,
    editData: null,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  reducers: {
    // //添加集团列表数据
    // saveDataSave(state, { payload: { data } }) {
    //   return  {...state, data };
    // },
    // //查看集团列表数据
    // checkDataSave(state, { payload: { data: item } }) {
    //   return  {...state, item };
    // },
    // //编辑集团列表数据
    // editDataSave (state, { payload: { data: item } }) {
    //   return { ...state, item}
    // },
    // // 编辑页面获取到的数据
    // getEditDataSave(state, { payload: { data: editData } }) {
    //   return  {...state, editData };
    // },
    //
    getActivityPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    getDetailSuccess(state, { payload: { item }}) {
      return {...state, item};
    },
  },
  effects: {
    // //添加集团列表数据
    *saveActivity({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(activityService.saveActivity, values);
      if (code == 0) {
        message.success("创建活动成功");
        yield put(routerRedux.push("/crm/activity"));
      }
    },
    //
    // //查看集团列表数据
    // *checkData({payload: values}, { call, put }) {
    //   const {data: {code,data,err}} = yield call(saveService.checkData, values);
    //   if (code == 0 && err == null) {
    //     yield put({
    //       type: 'checkDataSave',
    //       payload: {
    //         data,
    //       }
    //     });
    //   }
    // },
    // *getEditData({payload: values}, { call, put }) {
    //   const {data: {code,data,err}} = yield call(saveService.checkData, values);
    //   if (code == 0 && err == null) {
    //     yield put({
    //       type: 'getEditDataSave',
    //       payload: { data }
    //     });
    //   }
    // },
    // //编辑集团列表数据
    // *editData({payload: values}, { call, put }) {
    //   const {data: {data,code}} = yield call(saveService.editData, values);
    //   if (code == 0) {
    //     message.success("更改用户信息成功");
    //     yield put(routerRedux.push("/system/group-char"));
    //
    //   }
    // },
    //
    *saveOutsiderCustomer({ payload: values}, { call, put }) {
        const {data: {data,code}} = yield call(activityService.saveOutsiderCustomer, values);
        if (code == 0) {
          message.success("预约非会员用户成功");
          yield put(routerRedux.push("/crm/activity"));

        }
    },
    *deleteActivity ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.deleteActivity, values);
      if (code == 0) {
        message.success("删除活动成功");
        yield put(routerRedux.push("/crm/activity"));

      }
    },

    *getActivityById({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(activityService.getActivityById, values);
      if (code == 0) {
        yield put({
          type: 'getDetailSuccess',
          payload: { item: data},
        })
      }
    },

    *getActivityPage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, total, page, size, code } } = yield call(activityService.getActivityPageList, values);
      if (code == 0) {
        yield put({
          type: 'getActivityPageSave',
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

        // //查看集团列表数据
        // if (pathname === '/system/group-char/detail') {
        //   dispatch({
        //     type: 'checkData',
        //     payload: query
        //   });
        // }
        // //编辑集团列表数据
        // if (pathname === '/system/group-char/edit') {
        //   dispatch({
        //     type: 'getEditData',
        //     payload: query
        //   });
        // }
        if (pathname === '/crm/activity') {
          dispatch({
            type: 'getActivityPage',
            payload: query
          });
        }
        if (pathname === '/crm/activity/detail') {
          dispatch({
            type: 'getActivityById',
            payload: query
          });
        }
      })
    }
  },
};
