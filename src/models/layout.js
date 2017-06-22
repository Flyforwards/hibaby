
import * as usersService from '../services/users';
import * as loginService from '../services/login';
import * as systemService from '../services/system';
import { routerRedux } from 'dva/router'
import { local, session } from 'common/util/storage.js'

// 个人中心菜单
const userModuleList = [
  {"id":100,"name":"个人档案","path":"/user/information","icon":"user","projectId":1,"permissionId":0,"children":[]},
  {"id":101,"name":"我的消息","path":"/user/my-message","icon":"file-text","projectId":1,"permissionId":0,"children":[]},
  {"id":102,"name":"工作计划","path":"/user/work-plan","icon":"calculator","projectId":1,"permissionId":0,"children":[]},
  {"id":103,"name":"修改密码","path":"/user/reset-password","icon":"key","projectId":1,"permissionId":0,"children":[]}]

export default {
  namespace: 'layout',
  state: {
    clubs: [], // 地方中心数据列表
    projectList: [],
    subMenu: [],
    projectTree: [],
    userInfo: {},
    selectIndex: 0,
    permissionAlias: [],
    systemTime: 0,
    endemic: {}, // 用户选择的地方中心
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
        const { data: { data: clubs, code : code1 }} = yield call(usersService.getCurrentUserEndemic)
        if (code1 == 0) {
          session.set("clubs", clubs);
          // 查询用户信息
          const { data: { data: userInfo, code: code2}} = yield call(usersService.getCurrentUserInfo)
          if (code2 ===0) {
            session.set("userInfo", userInfo);
            yield put({
              type: 'getUserInfoSuccess',
              payload: { userInfo }
            })
          }
          yield put({
            type: 'querySuccess',
            payload: { clubs } ,
          })
          try {
            const {data: {data: selEndemic, code: code3}} = yield call(usersService.getCurrentUserSelectEndemic);
            // 判断当前用户是否选择了地方中心
            if (code3 === 0) {
              // 获取按钮权限
              yield put({
                type: "currentUserPermissionAliasList"
              })
              session.set("endemic", selEndemic)
              yield put({
                type: 'selectEndemic',
                payload: { endemic: selEndemic }
              })
              if (location.pathname === '/login') {
                yield put(routerRedux.push('/'))
              }
              try {
                const {data: {code: code5, data}} = yield call(usersService.getByCurrentUser,);
                if (code5 == 0) {
                  window.executeAction('doLogin', data );//执行登陆 ccic2里面的js类
                }
              } catch (err) {

              }
            }
            // 未选择地方中心则选择地方中心
          } catch (err) {
            if (clubs !== null && clubs.length === 1) {
              const endemic = clubs[0];
              try {
                const {data: {code: code4}} = yield call(usersService.setEndemic, {endemicId: endemic.id});
                if (code4 === 0) {
                  session.set("endemic", endemic)
                  yield put({
                    type: 'selectEndemic',
                    payload: { endemic }
                  })
                  // 获取按钮权限
                  yield put({
                    type: "currentUserPermissionAliasList"
                  })
                  yield put(routerRedux.push('/'));
                  try {
                    const {data: {code: code5, data}} = yield call(usersService.getByCurrentUser,);
                    if (code5 == 0) {
                      window.executeAction('doLogin', data );//执行登陆 ccic2里面的js类
                    }
                  } catch (err) {

                  }
                }
              } catch (err) {
                yield put(routerRedux.push('/club'));
              }
            } else {
              yield put(routerRedux.push('/club'));
            }
          }

        }
      } catch(err) {
        session.remove("token");
        session.remove("endemic");
        session.remove("isLogin");
        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/') {
            from = '/'
          }
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    // 获取当前用户可以访问的地方中心列表
    *getCurrentUserEndemicList ({  payload, }, {call, put}) {
        const {data: {data: clubs, code : code}} = yield call(usersService.getCurrentUserEndemic)
        if (code == 0) {
          session.set("clubs", clubs);
          yield put({
            type: 'querySuccess',
            payload: { clubs } ,
          })
        }
    },

    // 获取当前用户当前选择地方中心的权限别名列表
    *currentUserPermissionAliasList({ payload }, {call, put}){
      const { data: { data: permissionAlias, code: code5, err: err5}} = yield call(usersService.currentUserPermissionAliasList)
      if (code5 ===0 && err5 === null) {
        yield put({
          type: 'permissionAliasSave',
          payload: { permissionAlias }
        })
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
      }
    },
    // 获取当用户，当前信息区域的某个模块的菜单
    *getCurrUserMenu({ payload:  value  }, {call, put}) {
      const { data: { data, code, err } }  = yield call(usersService.getCurrUserMenu, value);
      if (code == 0) {
        yield put({
          type: 'getMenuSuccess',
          payload: data ,
        });
      }
    },

    // 设置地方中心
    *setEndemic({ payload: { selClub } }, { call, put }) {
      const value = { endemicId : selClub.id };
      const { data: { data, code , err } }  = yield call(usersService.setEndemic, value);
      if (code == 0) {
        // 保存地方中心
        session.set("endemic", selClub);
        yield put({
          type: 'selectEndemic',
          payload: { endemic: selClub }
        })
        yield put(routerRedux.push("/"))
        // 设置地方中心成功刷新数据
        yield put({
          type : 'getProjectAndModuleTree',
        });
        // 获取地方中心权限别名列表 即按钮权限
        yield put({
          type: "currentUserPermissionAliasList"
        })
      }
    },

    // 退出登录
    *logout({ payload }, { call, put }) {
      const { data: { data, code , err } }  = yield call(loginService.logout);
      if (code == 0 && err == null) {
        session.removeAll();
       yield put(routerRedux.push('/login'));
      }
    },

    // 获取服务器时间
    *getSystemTime ({ payload }, { call, put }) {
      const { data: { data, code } }  = yield call(systemService.getSystemTime);
      if (code == 0) {
        yield put({
          type: 'getTimeSuccess',
          payload: { systemTime: data }
        });

      }
    },

    // 获取主模块和菜单树
    *getProjectAndModuleTree({ payload }, {call, put}) {
      const { data: { data, code }} = yield call(usersService.getProjectAndModuleTree)
      if (code == 0) {
        const paths = location.pathname.split("/");
        let projectInx = -1;
        if (paths.length >= 2) {
          const path1 = paths[1];
          if (path1.length == 0) {
            projectInx = 0;
          }
          if (data != null && data.length>0) {
            data.map((record, index)=>{
              if (record.path == path1) {
                projectInx = index;
              }
            });
          }
        } else {
          projectInx = 0;
        }
        session.set("projectAndModuleTree", data);

        // 更新头部主模块
        yield put({
          type: 'getProjectTreeSuccess',
          payload: data,
        });

        // 选择头部主模块
        yield put({
          type: 'updateSelectProject',
          payload: { selectIndex : projectInx, }
        })

        // 更新左侧菜单
        if (data != null && data.length>0) {
          if (projectInx == -1) {
            yield put({
              type: 'changeMenu',
              payload: { subMenu: userModuleList }
            })
          } else {
            const project = data[projectInx];
            yield put({
              type: 'changeMenu',
              payload: { subMenu: project.moduleList || [] }
            })
          }
        }

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
          // 个人中心不做权限控制
          userModuleList.map(item=>{
            if (location.pathname == item.path) {
              havePer = true;
            }
          })
          if (!havePer) {
            yield put(routerRedux.replace("/noJurisdiction"))
          }
        }
      }
    },
    // 刷新菜单页面
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

    *pushUser({ payload }, {call, put}) {
      yield put({
        type: 'updateSelectProject',
        payload: { selectIndex: -1 }
      })

      yield put({
        type: "changeMenu",
        payload: { subMenu: userModuleList },
      })

      yield put(routerRedux.push('/user/information'));
    },
  },


  reducers: {
    // 设置地方中心
    selectEndemic (state, { payload: { endemic } }) {
      return { ...state, endemic, }
    },
    changeMenu (state, { payload: { subMenu } }) {
      return { ...state, subMenu, }
    },
    updateSelectProject (state, { payload: { selectIndex } }) {
      return { ...state, selectIndex, }
    },
    querySuccess (state, { payload: { clubs } }) {
      return { ...state, clubs, }
    },
    getProListSuccess (state, { payload: projectList }) {
      return { ...state, projectList, }
    },
    getMenuSuccess (state, { payload: subMenu }) {
      return { ...state, subMenu, }
    },
    getUserInfoSuccess (state, { payload: { userInfo } }) {
      return {  ...state, userInfo, }
    },
    getProjectTreeSuccess (state, { payload: projectTree }) {
      return { ...state, projectTree, }
    },
    permissionAliasSave (state, { payload: { permissionAlias } }) {
      return { ...state, permissionAlias, }
    },
    getTimeSuccess (state, { payload: { systemTime } }) {
      return { ...state, systemTime }
    },
  },
}
