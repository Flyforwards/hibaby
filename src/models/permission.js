
import * as systemService from '../services/system';
import * as usersService from '../services/users';
import { message } from 'antd';
import  { session } from 'common/util/storage.js';


// tissueProperty 3是部门 2是地方中心
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
    currentDeptTree: [],
    undisUserList: [], // 未分配角色的列表
    undisUserTotal: 0,
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
    // 获取角色下的用户列表成功
    getRoleUserPagSuccess(state, { payload: { data: userList, total: memberTotal } }) {
      return {...state, userList, memberTotal};
    },
    getDictionSuccess(state, { payload: { selClub: club, departmentLists: departmentList } }) {
      return {...state, club, departmentList};
    },

    // 获取当前地方中心组织架构树成功
    getDeptByEndemicSuccess(state, { payload: { data: currentDeptTree }}) {
      return {...state, currentDeptTree};
    },
    // 根据选择组织架构下的部门获取未分配的用户成功
    getUserByNodeIdSuccess(state, { payload: { data: undisUserList, total: undisUserTotal}}) {
      return {...state, undisUserList, undisUserTotal};
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
      const { page, pageSize, id, roleName } = values
      const { data: { data, code, err }} = yield call(systemService.roleEdit, { id, roleName });
      if (code == 0) {
        message.success('编辑角色成功');
        yield put({
          type : 'getRolesByPage',
          payload : {page : page || 1 , size : pageSize || 10 }
        });
      } else {
        throw err || "请求出错";
      }
    },
    *submitDelRole({ payload: values }, {call,put }) {
      const { page, pageSize, dataId } = values
      const { data: { data, code, err }} = yield call(systemService.roleDel, { dataId });
      if (code == 0) {
        message.success('删除角色成功');
        yield put({
          type : 'getRolesByPage',
          payload : { page : page || 0 , size : pageSize || 10 }
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
        // const selClub =  session.get("endemic");
        // const arg = { dataId: selClub.id };

        //  获取部门字典
        // const {data:  {data : departmentList, code , err }} =  yield call(usersService.getDeptListByEndemicId, arg)
        // if (code == 0 && err == null) {
        //   departmentLists = departmentList;
        // } else {
        //   throw err || "请求出错";
        // }

        // yield put({
        //   type: 'getDictionSuccess',
        //   payload: { selClub, departmentLists}
        // });
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
    *getDeptByCurrentEndemic({ payload: { roleId } },{call, put}) {
      const {data: {data, code , err}} =  yield call(usersService.getRoleDepartmentNodes, {})
      if (code == 0 && err == null) {
        if (data.nodes && data.nodes.length > 0) {
          const dept = data.nodes[0];
          const { id: nodeid , tissueProperty } = dept
          yield put({
            type: "getUserPageListByUserRole",
            payload: { roleId, nodeid, tissueProperty, page : 1, pageSize: 10 },
          })
        }
        yield put({
          type: "getDeptByEndemicSuccess",
          payload: { data }
        })
      } else {
        throw err || "请求出错";
      }
    },

    *DelUserRoleInput({ payload: values },{call, put}) {
      const { page, pageSize, userId, roleId} = values
      const {data: {data, code , err}} =  yield call(usersService.DelUserRoleInput, { userId,roleId })
      if (code == 0 && err == null) {
        // 解绑成功重新查询用户列表
        message.success("解绑用户成功")
        yield put({
          type: "getUserPageListByRoleId",
          payload: { page, pageSize,roleId }
        })
      } else {
        throw err || "请求出错";
      }
    },

    *getUserPageListByUserRole({ payload: values },{call, put}) {
      const {data: {data, code, total , err}} =  yield call(usersService.getUserPageListByUserRole, values)
      console.log(data, total);
      if (code == 0 && err == null) {
        yield put({
          type: "getUserByNodeIdSuccess",
          payload: { data, total }
        })
      } else {
        throw err || "请求出错";
      }
    },

  },
}
