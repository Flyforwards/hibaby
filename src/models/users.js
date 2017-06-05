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

  },
  effects: {


  },
  subscriptions: {
  	setup({dispatch, history}) {
  		return history.listen(({pathname, query}) => {
  		})
  	}
  },
};
