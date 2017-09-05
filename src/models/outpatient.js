import * as usersService from '../services/users';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'outpatient',
  state: {

  },
  reducers: {


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
