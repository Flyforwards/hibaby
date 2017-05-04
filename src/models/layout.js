
import * as usersService from '../services/users';
import { routerRedux } from 'dva/router'
export default {
  namespace: 'layout',
  state: {
    club:null,
  },

  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'getEndemic' });
    },
  },
  effects: {
    *getEndemic ({
      payload,
    }, {call, put}) {
      const { data: { data, code, err}} = yield call(usersService.getEndemic)

      if (code == 0 && err == null) {
          yield put({
            type: 'querySuccess',
            payload: data ,
          })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/demo/management'))
        }
      } else {
        if (location.pathname !== '/login') {
      //     let from = location.pathname
      //     if (location.pathname === '/dashboard') {
      //       from = '/dashboard'
      //     }
          window.location = `${location.origin}/login`
        }
      }
    },
  },
  reducers: {
    querySuccess (state, { payload: club }) {
      return {
        ...state,
        club,
      }
    },
  },
}
