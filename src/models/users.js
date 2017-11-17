import * as usersService from '../services/users';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    usersInfo: null,
    messageList: [],
    productionVisible: false,
    stayVisible: false,
    outVisible: false,
    freeVisible: false,
    checkOutVisible: false,
    hospitalList: [],
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
    getMessageListInfo(state, { payload: data }){
      return { ...state, messageList: data }
    },
    
    //通知单
    getProductionNotification(state, { payload: data }){
      return { ...state, productionNotification: data }
    },
    getOccupancyNotice(state, { payload: data }){
      return { ...state, occupancyNotice: data }
    },
    getdepartureNotice(state, { payload: data }){
      return { ...state, departureNotice: data }
    },
    
    getCheckOutNotice(state, { payload: data }){
      return { ...state, checkOutNotice: data }
    },
    getFreeNotice(state, { payload: data }){
      return { ...state, freeNotice: data }
    },
    
    
    changeProductionVisible(state, { payload: data }){
      return { ...state, productionVisible: data }
    },
    changeStayVisible(state, { payload: data }){
      return { ...state, stayVisible: data }
    },
    changeOutVisible(state, { payload: data }){
      return { ...state, outVisible: data }
    },
    changeCheckOutVisible(state, { payload: data }){
      return { ...state, checkOutVisible: data }
    },
    changeFreeVisible(state, { payload: data }){
      return { ...state, freeVisible: data }
    },
    
    //数据字典
    getHospital(state, { payload: data }){
      return { ...state, hospitalList: data }
    },
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
    },
    //根据id查询生产通知单
    *getProductionNotificationById({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getProductionNotificationById, values);
      if (code == 0) {
        yield put({
          type: 'getProductionNotification',
          payload: data
        });
        yield put({
          type: 'changeProductionVisible',
          payload: true
          
        })
      }
    },
    //根据id查询入住通知单
    *getOccupancyNoticeById({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getOccupancyNoticeById, values);
      if (code == 0) {
        yield put({
          type: 'getOccupancyNotice',
          payload: data
        });
        yield put({
          type: 'changeStayVisible',
          payload: true
          
        })
      }
    },
    //根据id查询外出通知单
    *getdepartureNoticeById({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getdepartureNoticeById, values);
      if (code == 0) {
        yield put({
          type: 'getdepartureNotice',
          payload: data
        });
        yield put({
          type: 'changeOutVisible',
          payload: true
          
        })
      }
    },
    //根据id查询退房通知单
    *getCheckOutNoticeById({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getCheckOutNoticeById, values);
      if (code == 0) {
        yield put({
          type: 'getCheckOutNotice',
          payload: data
        });
        yield put({
          type: 'changeCheckOutVisible',
          payload: true
          
        })
      }
    },
    //根据id查询自由通知单
    *getFreeNoticeById({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getFreeNoticeById, values);
      if (code == 0) {
        yield put({
          type: 'getFreeNotice',
          payload: data
        });
        yield put({
          type: 'changeFreeVisible',
          payload: true
          
        })
      }
    },
    
    //切换消息未读已读标识
    *changeMessageType({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.changeMessageType, values);
    },
    //数据字典
    *getDictionary({ payload: values }, { call, put, select }) {
      const { data: { code, data, err } } = yield call(usersService.getDictionary, values);
      if (code == 0) {
        if (values.abName == 'FMYY') {
          yield put({
            type: 'getHospital',
            payload: data
          });
        }
        
      }
    }
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/my-message') {
          dispatch({ type: 'getMessageList' });
          dispatch({ type: 'getDictionary', payload: { abName: 'FMYY', softDelete: 0 } });
          
        }
      })
    }
  }
};
