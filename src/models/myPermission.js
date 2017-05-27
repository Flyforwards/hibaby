
import * as systemService from '../services/system';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'
import { parse } from 'qs'

export default {
  namespace: 'myPermission',
  state: {
    list:[],
    item:{},
    permissions: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  reducers: {

    listByPageSave(state,{payload:{ list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },

    //删除内部权限列表数据
    delpermissionSave(state, { payload: { record }}) {

      state.selectedRows.remove(record);
      state.selectedRowKeys.remove(record.key);
      return {...state, };
    },

    permissionUpdata(state, {
      payload: {
        data,
        code
      }
    }) {
      let permissionUpdata = {...state,
        data,
        code
      };

      return permissionUpdata;
    },

    fromModalSave(state, { payload: { data, } }) {
      local.set("Dictionary",data)
      return {...state, data, };
    },

    SelectListSave(state, {  payload: {  data:permissions } }) {
      return {...state, permissions, };
    },

    checkDataSave(state, { payload: { data: item   } }) {
      return  {...state, item };
    },
  },
  effects: {
    //  添加
    *permissionAdd({payload: values}, { call, put }) {
      const { data: { data, code } } = yield call(systemService.permissionAdd, values);
      if (code == 0) {
        message.success("添加成功");
        yield put(routerRedux.push('/system/permission-inside'));
      }
    },

    // 删除
    *delpermission({ payload: values }, {call,put }) {
      const { page, pageSize, id} = values
      const { data: { data, code, err }} = yield call(systemService.delpermissionSave, { id });
      if (code == 0) {
        message.success('删除成功');
        yield put(routerRedux.push('/system/permission-inside'));
      } else {
        throw err || "请求出错";
      }
    },

    // 更新
    *permissionUpdataList({payload: values}, { call, put }) {
      const { data: {  data, code } } = yield call(systemService.permissionUpdata, values);
      if (code == 0) {
        message.success("修改成功");
        yield put(routerRedux.push('/system/permission-inside'));
      }
    },

    // 显示
    *listByPage({payload: values}, {call,put}) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data:{ data, total, page, size,code } } = yield call(systemService.listByPageSave, values);
      if (code == 0) {
        yield put({
          type: 'listByPageSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          }
        });
      }
    },

    *fromModal({ payload: values }, { call, put }) {
      const { data:{ data, code }  } = yield call(systemService.fromModal, values);
      if (code == 0) {
        yield put({
          type: 'fromModalSave',
          payload: { data }
        });
      }
    },

    *SelectList({ payload: values }, { call, put }) {
      const { data:{ data, code  } } = yield call(systemService.SelectListSave, values);
      if (code == 0) {
        yield put({
          type: 'SelectListSave',
          payload: { data, }
        });
      }
    },

    *checkData({ payload:values }, { call, put }) {
      const { data: { data, code } } = yield call(systemService.checkData, values);
      if (code == 0) {
        yield put({
          type: 'checkDataSave',
          payload: {
            data,
          }
        });

      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if(pathname === '/system/permission-inside') {
          dispatch({
            type: 'listByPage',
            payload: query
          });
          // 主模块列表
          dispatch({
            type: 'fromModal',
            payload: {}
          });

          dispatch({
            type: 'SelectList',
            payload: {}
          });
        }
      })
    }
  },
};
