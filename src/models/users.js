import * as usersService from '../services/users';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    usersInfo: null,
    messageList:[]
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    setUsersInfo(state, { payload: todo }){
      return { ...state, usersInfo: todo.data };
    },
    setUsersInfoChi(state, { payload: data }){
      let usersInfo = state.usersInfo;
      usersInfo = { ...usersInfo, ...data };
      return { ...state, usersInfo: usersInfo };
    },
    getMessageListInfo(state,{payload:data}){
      return{...state, messageList: data}
    }
    
  },
  effects: {
    // 加载登录用户信息
    *getCurrentUserInfo({ payload: values }, { call, put }) {
      const { data: { code, data, err } } = yield call(usersService.getCurrentUserInfo);
      if (code == 0) {
        
        yield put({ type: 'setUsersInfo', payload: { data } });
        yield put({ type: 'getCurrentUserEndemic' });
        
        
        if (data.entrys[0]) {
          
          yield put({
            type: 'getPositionByDeptId',
            payload: { dataId: data.entrys[0].deptId, positionId: data.entrys[0].positionId }
          });
        }
        
      }
    },
    
    *getCurrentUserEndemic({ payload: values }, { call, put, select }) {
      
      const state = yield select(state => state.users);
      
      const usersInfo = state.usersInfo;
      
      const { data: { code, data, err } } = yield call(usersService.getCurrentUserEndemic);
      if (code == 0) {
        
        yield put({ type: 'setUsersInfoChi', payload: { locCenter: data[0].name } });
        
        if (usersInfo.entrys[0]) {
          yield put({
            type: 'getDeptListByEndemicId',
            payload: { dataId: data[0].id, deptId: usersInfo.entrys[0].deptId }
          });
        }
      }
    },
    *getPositionByDeptId({ payload: values }, { call, put }) {
      
      const { data: { code, data, err } } = yield call(usersService.getPositionByDeptId, { dataId: values.dataId });
      if (code == 0) {
        for (let i = 0; i < data.length; i++) {
          if (values.positionId === data[i].id) {
            yield put({ type: 'setUsersInfoChi', payload: { position: data[i].name } });
            return;
          }
        }
      }
    },
    *getDeptListByEndemicId({ payload: values }, { call, put }) {
      const { data: { code, data, err } } = yield call(usersService.getDeptListByEndemicId, values);
      if (code == 0) {
        for (let i = 0; i < data.length; i++) {
          if (values.deptId === data[i].id) {
            yield put({ type: 'setUsersInfoChi', payload: { dept: data[i].name } });
            return;
          }
        }
      }
    },
    *modifyUser({ payload: values }, { call, put, select }) {
      const state = yield select(state => state.users);
      
      const usersInfo = state.usersInfo;
      
      let dict = { ...values, userEntryId: usersInfo.entrys[0].id }
      
      const { data: { code, data, err } } = yield call(usersService.modifyUser, dict);
      if (code == 0) {
        yield put({ type: 'setUsersInfoChi', payload: values });
      }
    },
    //加载登录用户消息列表
    *getMessageList({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getMessageList, values);
      if (code == 0) {
        yield put({ type: 'getMessageListInfo', payload: data });
      }
    }
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if(pathname === '/user/my-message') {
          dispatch({
            type:'getMessageList'
          })
        }
      })
    }
  }
};
