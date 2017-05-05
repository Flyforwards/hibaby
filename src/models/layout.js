
import * as usersService from '../services/users';
import { routerRedux } from 'dva/router'
import { local, session } from '../common/util/storage.js'

export default {
  namespace: 'layout',
  state: {
    club: null,
    projectList: null,
    subMenu: null,
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
          yield put(routerRedux.push('/club'))
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
    *getProjectList({ payload }, {call, put}) {
      const { data: { data, code, err}} = yield call(usersService.getProjectList)
      if (code == 0) {
        yield put({
          type: 'getProListSuccess',
          payload: data ,
        });
        // if (location.pathname != "/demo/management") {
        //   yield put(routerRedux.push("/demo/management"));
        // }
        yield put({
          type: 'getCurrUserMenu',
          payload: { dataId : 3 },
        });
      } else {
      }
    },
    // 获取当用户，当前信息区域的某个模块的菜单
    *getCurrUserMenu({ payload:  value  }, {call, put}) {
      const { data: { data, code } }  = yield call(usersService.getCurrUserMenu, value);
      if (code == 0) {
        yield put({
          type: 'getMenuSuccess',
          payload: data ,
        });
      }
    },
    *setEndemic({ payload: { selClub } }, { call, put }) {
      const value = { endemicId : selClub.id };
      const { data: { data, code } }  = yield call(usersService.setEndemic, value);
      if (code == 0) {
        // 保存地方中心
        session.set("endemic", selClub);
        yield put(routerRedux.push("/"))
        // 设置地方中心成功刷新数据
        yield put({
          type : 'getProjectList',
        });
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
