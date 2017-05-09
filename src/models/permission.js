
import * as systemService from '../services/system';
import * as usersService from '../services/users';
import { message } from 'antd';

export default {
  namespace: 'permission',
  state: {
    data: [],
    code: 0,
    total: 0,
    role: null,
    permissionList: null,
    userList: null,
  },
  reducers: {
    getRolesSuccess(state, {payload: {data, page, size, total}}) {
      return {...state, data, total};
    },
    // roleAddSuccess(state, {payload: { data }}) {
    //   return {...state, data};
    // }
    getTreeSuccess(state, { payload: { data: permissionList } }) {
      return {...state, permissionList};
    },
    getRoleUserPagSuccess(state, { payload: { data: userList, total } }) {
      return {...state, userList, total};
    },
  },
  effects: {
    *getRolesByPage({ payload: values }, {call,put }) {
      const { data: { data, total, page, size, code, err }} = yield call(systemService.getRolesByPage, values);
      if (code == 0) {
        yield put({
          type : 'getRolesSuccess',
          payload : { data, total, page, size }
        });
      } else {
        throw err || "请求出错";
      }
    },
    *submitCreateRole({ payload: values }, {call,put }) {

      const { data: { data, code, err }} = yield call(systemService.roleAdd, values);
      if (code == 0) {
        message.success('创建角色成功');
        yield put({
          type : 'getRolesByPage',
          payload : {page : 1 , size : 10}
        });
      } else {
        throw err || "请求出错";
      }
    },
    *submitEditRole({ payload: values }, {call,put }) {

      const { data: { data, code, err }} = yield call(systemService.roleEdit, values);
      if (code == 0) {
        message.success('编辑角色成功');
        yield put({
          type : 'getRolesByPage',
          payload : {page : 1 , size : 10}
        });
      } else {
        throw err || "请求出错";
      }
    },
    *submitDelRole({ payload: values }, {call,put }) {
      message.success('删除角色成功');
      const { data: { data, code, err }} = yield call(systemService.roleDel, values);
      if (code == 0) {
        yield put({
          type : 'getRolesByPage',
          payload : { page : 1 , size : 10 }
        });
      } else {
        throw err || "请求出错";
      }
    },
    *treeByRoleID({ payload }, {call, put}) {
      const  { record } = payload
      const values = { dataId : record.id }
      const {data: {data , code , err}} =  yield call(usersService.treeByRoleID, values)
      if (code == 0 && err == null) {
        yield put({
          type : 'getTreeSuccess',
          payload : { data }
        });
      } else {
        throw err || "请求出错";
      }
    },
    *getUserPageListByRoleId({ payload: values }, {call, put}) {
      const {data: {data, total , code , err}} =  yield call(usersService.getUserPageListByRoleId, values)
      if (code == 0 && err == null) {
        yield put({
          type : 'getRoleUserPagSuccess',
          payload : { data, total }
        });
      } else {
        throw err || "请求出错";
      }
    },
  },
}
