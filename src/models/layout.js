
import * as usersService from '../services/users';
import * as loginService from '../services/login';
import { routerRedux } from 'dva/router'
import { local, session } from 'common/util/storage.js'

export default {
  namespace: 'layout',
  state: {
    clubs: [], // 地方中心数据
    projectList: [],
    subMenu: [],
    projectTree: [],
    userInfo: null,
    selectIndex: 0,
    permissionAlias: [],
  },

  subscriptions: {
    setup ({ dispatch }) {
        dispatch({ type: 'getCurrentUserEndemic' });
    },

  },
  effects: {

    // 获取当前用户可以访问的地方中心的接口  全局验证是否登录
    *getCurrentUserEndemic ({  payload, }, {call, put}) {
      try {
        const { data: { data: clubs, code : code1, err: err1}} = yield call(usersService.getCurrentUserEndemic)
        if (code1 == 0 && err1 == null) {
          session.set("clubs", clubs);
          // 查询用户信息
          const { data: { data: userInfo, code: code2, err: err2}} = yield call(usersService.getCurrentUserInfo)
          if (code2 ===0 && err2 === null) {
            session.set("userInfo", userInfo);
            yield put({
              type: 'getUserInfoSuccess',
              payload: { userInfo }
            })
          }

          // 获取当前用户当前选择地方中心的权限别名列表
          const { data: { data: permissionAlias, code: code5, err: err5}} = yield call(usersService.currentUserPermissionAliasList)
          if (code5 ===0 && err5 === null) {
            yield put({
              type: 'permissionAliasSave',
              payload: { permissionAlias }
            })
          }
          yield put({
            type: 'querySuccess',
            payload: { clubs } ,
          })

          const { data: { data: selEndemic, code: code3, err: err3}} = yield call(usersService.getCurrentUserSelectEndemic);
          // 判断当前用户是否选择了地方中心
          if (code3 === 0 && err3 === null) {
            session.set("endemic", selEndemic)
            if (location.pathname === '/login') {
              yield put(routerRedux.push('/'))
            }
            // 未选择地方中心则选择地方中心
          } else {
            if (clubs !== null && clubs.length === 1) {
              const endemic = clubs[0];
              const { data: { code: code4, err: err4}} = yield call(usersService.setEndemic, { endemicId: endemic.id });
              if (code4 === 0 && err4 === null) {
                session.set("endemic", endemic)
                yield put(routerRedux.push('/'));
              } else {
                yield put(routerRedux.push('/club'));
              }
            } else {
              yield put(routerRedux.push('/club'));
            }

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
    // 获取主模块信息
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
          type : 'getProjectAndModuleTree',
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
    // 获取主模块和菜单树
    *getProjectAndModuleTree({ payload }, {call, put}) {
      const { data: { data, code, err}} = yield call(usersService.getProjectAndModuleTree)
      if (code == 0 && err == null) {
        const paths = location.pathname.split("/");
        let projectInx = 0;
        if (paths.length >= 2) {
          const path1 = paths[1];
          if (data != null && data.length>0) {
            data.map((record, index)=>{
              if (record.path == path1) {
                projectInx = index;
              }
            });
          }
        }
        session.set("projectAndModuleTree", data);
        // 选择头部主模块
        yield put({
          type: 'updateSelectProject',
          payload: { selectIndex : projectInx, }
        })

        // 更新左侧菜单
        if (data != null && data.length>0) {
          const project = data[projectInx];
          yield put({
            type: 'changeMenu',
            payload: { subMenu: project.moduleList || [] }
          })
        }
        // 更新头部主模块
        yield put({
          type: 'getProjectTreeSuccess',
          payload: data,
        });

        // 添加白名单 先只对菜单目录做权限管理
        if (location.pathname != "/" && paths.length == 3) {
          let havePer = false
          // 判断路由权限
          if (data !==null && data.length>0 ) {
            data.map((record)=>{
              record.moduleList.map((item)=>{
                if (item.children.length > 0) {
                  item.children.map((re)=>{
                    if (location.pathname == re.path) {
                      havePer = true;
                    }
                  })
                } else {
                  if (location.pathname == item.path) {
                    havePer = true;
                  }
                }
              });
            })
          }
          if (!havePer) {
            yield put(routerRedux.replace("/noJurisdiction"))
          }
        }

      } else {
        throw err || "请求出错";
      }
    },
    // 获取主模块和菜单树
    *pushModule({ payload: { moduleList, selectIndex } }, {call, put}) {
      yield put({
        type: 'updateSelectProject',
        payload: { selectIndex }
      })
      if (moduleList != null && moduleList.length > 0) {
        const module = moduleList[0];
        if (module.children === null || module.children.length == 0) {
          yield put(routerRedux.push(module.path));
        } else {
          const subModule = module.children[0];
          yield put(routerRedux.push(subModule.path));
        }
      } else {
        yield put(routerRedux.push('/welcome'));
      }
      yield put({
        type: "changeMenu",
        payload: { subMenu: moduleList || [] },
      })
    },
  },

  reducers: {
    changeMenu (state, { payload: { subMenu } }) {
      return {
        ...state,
        subMenu,
      }
    },
    updateSelectProject (state, { payload: { selectIndex } }) {
      return {
        ...state,
        selectIndex,
      }
    },
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
    getUserInfoSuccess (state, { payload: { userInfo } }) {
      return {
        ...state,
        userInfo,
      }
    },
    getProjectTreeSuccess (state, { payload: projectTree }) {
      return {
        ...state,
        projectTree,
      }
    },
    permissionAliasSave (state, { payload: { permissionAlias } }) {
      return {
        ...state,
        permissionAlias,
      }
    },
  },
}
