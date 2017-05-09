
import * as systemService from '../services/system';

export default {
  namespace: 'pormission',
  state: {
    data: [],
    code: 0,
    total: 0,
    role: null,
  },
  reducers: {
    getRolesSuccess(state, {payload: {data, page, size, total}}) {
      return {...state, data, total};
    },
    // roleAddSuccess(state, {payload: { data }}) {
    //   return {...state, data};
    // }
  },
  effects: {
    *getRolesByPage({ payload: values }, {call,put }) {
      const { data: { data, total, page, size, code }} = yield call(systemService.getRolesByPage, values);
      if (code == 0) {
        yield put({
          type : 'getRolesSuccess',
          payload : { data, total, page, size}
        });
      }
    },
    *submitCreateRole({ payload: values }, {call,put }) {

      const { data: { data, code }} = yield call(systemService.roleAdd, values);
      if (code == 0) {
        yield put({
          type : 'getRolesByPage',
        });
      }
    },
    *submitEditRole({ payload: values }, {call,put }) {

      const { data: { data, code }} = yield call(systemService.roleEdit, values);
      if (code == 0) {
        yield put({
          type : 'getRolesByPage',
          payload : {page : 1 , size : 10}
        });
      }
    },
    *submitDelRole({ payload: values }, {call,put }) {

      const { data: { data, code }} = yield call(systemService.roleDel, values);
      if (code == 0) {
        yield put({
          type : 'getRolesByPage',
          payload : {page : 1 , size : 10}
        });
      }
    },
  },
}
