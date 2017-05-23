
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
    editItem: null,
    signUserList: [], // 预约用户列表
    editSignUserList: [], // 编辑
    userList:[], // 签到用户列表
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
    getDetailEditSuccess(state, { payload: { editItem }}) {
      return {...state, editItem};
    },
    getSignCustomerSave(state, { payload: { signUserList }}) {
      return {...state, signUserList};
    },
    getCustomerSave(state, { payload: { userList }}) {
      return {...state, userList};
    },
    getSignCustomerSaveEdit(state, { payload: { editSignUserList }}) {
      return {...state, editSignUserList};
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

    // 获取预约人员列表
    *getActivityCustomerPageList ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.getActivityCustomerPageList, { activityId: values.dataId });
      if (code == 0) {
        console.log(data)
        yield put({
          type: 'getSignCustomerSave',
          payload: { signUserList: data }
        })
      }
    },
    // 获取预约人员列表编辑
    *getActivityCustomerPageListEdit({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.getActivityCustomerPageList, { activityId: values.dataId });
      if (code == 0) {
        console.log(data)
        yield put({
          type: 'getSignCustomerSaveEdit',
          payload: { editSignUserList: data }
        })
      }
    },

    // 根据筛选条件查询未预约的客户基本信息分页列表
    *getNoAppointmentCustomerPageList ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.getNoAppointmentCustomerPageList, { activityId: values.dataId });
      if (code == 0) {
        console.log(data)
        yield put({
          type: 'getCustomerSave',
          payload: { userList: data }
        })
      }
    },
    // 预约会员用户
    *saveMemberCustomer({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.saveMemberCustomer, values);
      if (code == 0) {
        message.success("预约会员用户成功");
        // 先跳转首页后面再改
        yield put(routerRedux.push("/crm/activity"));

      }
    },
    // 预约非会员用户
    *saveOutsiderCustomer({ payload: values}, { call, put }) {
        const {data: {data,code}} = yield call(activityService.saveOutsiderCustomer, values);
        if (code == 0) {
          // 先跳转首页后面再改
          message.success("预约非会员用户成功");
          yield put(routerRedux.push("/crm/activity"));

        }
    },
    // 删除预约客户
    *deleteUserFromActivity({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.deleteActivityCustomer, values);
      if (code == 0) {
        // 先跳转首页后面再改
        message.success("删除预约客户成功");
        // 采用重新请求的方式刷新数据
        // yield put({
        //   type: 'deleteUserSave',
        //   payload: values,
        // })
      }
    },
    // 删除活动
    *deleteActivity ({ payload: values}, { call, put }) {
      const {data: {data,code}} = yield call(activityService.deleteActivity, values);
      if (code == 0) {
        message.success("删除活动成功");
        yield put(routerRedux.push("/crm/activity"));

      }
    },
    // 详情
    *getActivityById({ payload: values}, { call, put }) {
      const {data: {data, code}} = yield call(activityService.getActivityById, values);
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
          dispatch({
            type: 'getActivityCustomerPageList',
            payload: query
          })
        }
        if (pathname === '/crm/activity/edit') {
          dispatch({
            type: 'getActivityByIdEdit',
            payload: query
          });

          dispatch({
            type: 'getActivityCustomerPageListEdit',
            payload: query
          })
        }
      })
    }
  },
};
