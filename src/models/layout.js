
import * as usersService from '../services/users';
import * as loginService from '../services/login';
import { routerRedux } from 'dva/router'
import { local, session } from 'common/util/storage.js'

export default {
  namespace: 'layout',
  state: {
    clubs: [], // 地方中心数据
    projectList: null,
    subMenu: null,
  },

  subscriptions: {
    setup ({ dispatch }) {
        dispatch({ type: 'getEndemic' });
    },

  },
  effects: {

    // 获取地方中心的接口  全局验证是否登录
    *getEndemic ({  payload, }, {call, put}) {
      try {
        const { data: { data: clubs, code : code1, err: err1}} = yield call(usersService.getEndemic)
        if (code1 == 0 && err1 == null) {

          yield put({
            type: 'querySuccess',
            payload: { clubs } ,
          })

          const { data: { data, code, err}} = yield call(usersService.getCurrentUserSelectEndemic)
          // 判断当前用户是否选择了地方中心
          if (code === 0 && err === null) {
            // session.set("endemic", data)
            if (location.pathname === '/login') {
              yield put(routerRedux.push('/'))
            }
            // 未选择地方中心则选择地方中心
          } else {
            yield put(routerRedux.push('/club'))
          }

        } else {
          session.remove("token");
          session.remove("endemic");
          session.remove("isLogin");
          if (location.pathname !== '/login') {
            let from = location.pathname
            console.log(from)
            if (location.pathname === '/') {
              from = '/'
            }
            window.location = `${location.origin}/login?from=${from}`
          }
        }
      } catch(err) {

        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/') {
            from = '/'
          }
          window.location = `${location.origin}/login?from=${from}`
        }
        throw err;
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
        throw err || "请求出错";
      }
    },

    // 退出登录
    *logout({ payload }, { call, put }) {
      const { data: { data, code , err } }  = yield call(loginService.logout);
      if (code == 0 && err == null) {
        session.remove("isLogin");
        session.remove("token");
        session.remove("endemic");
       yield put(routerRedux.push('/login'))
      } else {
        throw err || "请求出错";
    }
},
  },
  reducers: {
    querySuccess (state, { payload: { clubs } }) {
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
