
import * as systemService from '../services/system';
import * as usersService from '../services/users';
import { message } from 'antd';
import  { session } from 'common/util/storage.js';

export default {
  namespace: 'permission',
  state: {
    data: [],
    code: 0,
    total: 0,
    role: 0,
    permissionList: null,
    userList: null,
    club: null,
    departmentList:[],
    memberTotal: 0,
    currentOrganizationTree: [],
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
    getRoleUserPagSuccess(state, { payload: { data: userList, total:memberTotal } }) {
      return {...state, userList, memberTotal};
    },
    getDictionSuccess(state, { payload: { selClub: club, departmentLists: departmentList } }) {
      return {...state, club, departmentList};
    },
    getOrganizationTree(state, { payload: { data: currentOrganizationTree, club }}) {
      return {...state, club, currentOrganizationTree};
    }

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

    // 根据角色Id 请求成员列表
    *getUserPageListByRoleId({ payload: values }, {call, put}) {
      const  { first }  = values;
      if (first) {
        let departmentLists =[];
        const selClub =  session.get("endemic");
        const arg = { dataId: selClub.id };
        //  获取部门字典
        const {data:  {data : departmentList, code , err }} =  yield call(usersService.getDeptListByEndemicId, arg)
        if (code == 0 && err == null) {
          departmentLists = departmentList;
        } else {
          throw err || "请求出错";
        }

        yield put({
          type: 'getDictionSuccess',
          payload: { selClub, departmentLists}
        });
        //  获取职位字典

      }

      const {data: {data, total , code , err}} =  yield call(usersService.getUserPageListByRoleId, values)
      if (code == 0 && err == null) {
        yield put({
          type : 'getRoleUserPagSuccess',
          payload : { data, total,}
        });
      } else {
        throw err || "请求出错";
      }
    },
    // 给角色分配权限
    *configRolePermission({ payload: values }, {call, put}) {
      const {data: {data, code , err}} =  yield call(usersService.configRolePermission, values)
      if (code == 0 && err == null) {
        console.log(data);
      } else {
        throw err || "请求出错";
      }
    },

    // 获取当前地区的部门信息
    *getDeptListByEndemicId({ payload },{call, put}) {
      const club =  session.get("endemic");
      const values = { dataId: club.id };
      const {data: {data, code , err}} =  yield call(usersService.getDeptListByEndemicId, values)
      if (code == 0 && err == null) {
        yield put({
          type: "getOrganizationTree",
          payload: { data, club }
        })
      } else {
        throw err || "请求出错";
      }
    },

  },
}
