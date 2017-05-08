
import * as systemService from '../services/system';

export default {
  namespace: 'pormission',
  state: {
    data: [],
    total: 0,
  },
  reducers: {
    getRolesSuccess(state, {payload: {data, page, size, total}}) {
      return {...state, data, total};
    }
  },
  effects: {
    *getRolesByPage({ payload: values }, {call,put }) {
      console.log("position");
      console.log(values);
      const { data: { data, total, page, size, code }} = yield call(systemService.getRolesByPage, values);
      if (code == 0) {
        yield put({
          type : 'getRolesSuccess',
          payload : { data, total, page, size}
        });
      }
    },
  },
}
