
import * as usersService from '../services/users';
import { routerRedux } from 'dva/router'
import { local, session } from '../common/util/storage.js'

export default {
  namespace: 'layout',
  state: {
    clubs: [], // 地方中心数据
    projectList: null,
    subMenu: null,
  },

  subscriptions: {
    setup ({ dispatch }) {

    },

    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/login') {
          dispatch({ type: 'getEndemic' });
        }
      })
    }

  },
  effects: {
    // 获取地方中心的接口
    *getEndemic ({  payload, }, {call, put}) {
      const { data: { data, code, err}} = yield call(usersService.getEndemic)
      if (code == 0 && err == null) {
          yield put({
            type: 'querySuccess',
            payload: { data } ,
          })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/club'))
        }
      } else {
        throw err;
        if (location.pathname !== '/login') {
      //     let from = location.pathname
      //     if (location.pathname === '/dashboard') {
      //       from = '/dashboard'
      //     }
          window.location = `${location.origin}/login`
        }

      }
    },
    *getProjectList({ payload }, {call, put}) {
      const { data: { data, code, err}} = yield call(usersService.getProjectList)
      if (code == 0 && err == null) {
        yield put({
          type: 'getProListSuccess',
          payload: data ,
        });
        yield put({
          type: 'getCurrUserMenu',
          payload: { dataId : 3 },
        });
      } else {
        throw err || "请求出错";
      }
    },
    // 获取当用户，当前信息区域的某个模块的菜单
    *getCurrUserMenu({ payload:  value  }, {call, put}) {
      const { data: { data, code, err } }  = yield call(usersService.getCurrUserMenu, value);
      if (code == 0 && err == null) {
        yield put({
          type: 'getMenuSuccess',
          payload: data ,
        });
      } else {
        throw err || "请求出错";
      }
    },
    *setEndemic({ payload: { selClub } }, { call, put }) {
      const value = { endemicId : selClub.id };
      const { data: { data, code , err } }  = yield call(usersService.setEndemic, value);
      if (code == 0 && err == null) {
        // 保存地方中心
        session.set("endemic", selClub);
        yield put(routerRedux.push("/"))
        // 设置地方中心成功刷新数据
        yield put({
          type : 'getProjectList',
        });
      } else {
        console.log(err);
        throw err || "请求出错";
      }
    },
  },
  reducers: {
    querySuccess (state, { payload: { data: clubs } }) {
      return {
        ...state,
        clubs,
      }
    },
    getProListSuccess (state, { payload: projectList }) {
      return {
        ...state,
        projectList,
      }
    },
    getMenuSuccess (state, { payload: subMenu }) {
      return {
        ...state,
        subMenu,
      }
    },
  },
}
