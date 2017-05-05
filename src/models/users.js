import * as usersService from '../services/users';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'users',
  state: {
  	list: [],
  	total: null,
  },
  reducers: {
  	save(state, {payload: {data: list, total, page}}) {
  		return {...state, list, total, page};

  	},
    customerSave(state,{payload:{data,code}}){
      let customerdata= {...state, data, code};
      return customerdata
    },
    positionSave(state,{payload:{data,code}}){
      let Positiondata= {...state, data, code};
      return Positiondata
    },
    loginSave(state, {payload: {data, code}}) {
      let logindata= {...state, data, code};
      return logindata;
    },
    testSave(state, {payload: {data, code}}) {
      let testdata= {...state, data, code};
      console.log(testdata)
      return testdata;
    },
    submitSave(state, {payload: {data, code}}) {
      let submitdata= {...state, data, code};
      console.log(submitdata)
      return submitdata;
    },
  },
  effects: {
  	*fetch({ payload: { page = 1 } }, { call, put }) {
  		const { data: {data}, headers } = yield call(usersService.fetch, { page });
  		yield put({ type: 'save', payload: { data } });
  	},
    *login({ payload: values }, { call, put }) {
      const  {data: {data, code}}  = yield call(usersService.login, values);
      if(code == 0) {

       yield put(routerRedux.push('/club'));
      }
      // yield put({ type: 'loginSave', payload: { data, code } });
    },
    *customer({ payload: values }, {call,put }){
      const {data: {data, code}} = yield call(usersService.customer,values);
      if(code == 0) {
        yield put({ type: 'customerSave', payload: { data } });
      }
    },
    *position({ payload: values }, {call,put }){
      const {data: {data, code}} = yield call(usersService.position,values);
      if(code == 0) {
        yield put({ type: 'positionSave', payload: { data, code } });
      }
    },
    *test({ payload: values }, { call, put }) {
      const  {data: {data, code}}  = yield call(usersService.test, values);

      yield put({ type: 'testSave', payload: { data, code } });
    },
    *findSubmit({ payload: values }, { call, put }) {
      const  {data: {data, code}}  = yield call(usersService.findSubmit, values);

      // yield put({ type: 'submitSave', payload: { data, code } });
      if(code == 0) {

       yield put(routerRedux.push('/login'));
      }
    },
    *findValue({ payload: values }, { call, put }) {
      const  {data: {data, code}}  = yield call(usersService.findValue, values);

      // yield put({ type: 'submitSave', payload: { data, code } });
      if(code == 0) {
      console.log('save findValue!')
      //yield put(routerRedux.push('/login'));
      }
    },

  },
  subscriptions: {
  	setup({dispatch, history}) {
  		return history.listen(({pathname, query}) => {
  			if(pathname === '/users') {
  				dispatch({type: 'fetch', payload: query});
  			}
        if(pathname === '/customer/Customer') {
          dispatch({type: 'customer', payload: {}});
        }
        if(pathname === '/organization') {
          dispatch({type: 'position', payload: {}});
        }
  		})
  	}
  },
};


