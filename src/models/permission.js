
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
    projectList: null,
  },
  reducers: {
    getRolesSuccess(state, {payload: {data, page, size, total}}) {
      return {...state, data, total};
    },
    // roleAddSuccess(state, {payload: { data }}) {
    //   return {...state, data};
    // }

    getProListSuccess (state, { payload: projectList }) {
      return {
        ...state,
        projectList,
      }
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
          payload : {page : 1 , size : 10}
        });
      } else {
        throw err || "请求出错";
      }
    },
    *getProjectList({ payload }, {call, put}) {
      const { data: { data : projectList, code, err}} = yield call(usersService.getProjectList)
      if (code == 0 && err == null) {
        const { record } = payload;

        if (projectList != null && projectList.length > 0) {
          let lastProject = projectList[projectList.length - 1];
          const value = {  projectId: lastProject.id,  roleId: record.id  }
          const data = yield call(usersService.getpermissionTree, value)

          console.log(data);

        }
        yield put({
          type: 'getProListSuccess',
          payload: projectList ,
        });
      } else {
        throw err || "请求出错";
      }
    },
  },
}
