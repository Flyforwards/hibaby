import * as outpatient from '../services/outpatient';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { parse } from 'qs'
import moment from  'moment'


export default {
  namespace: 'outpatient',
  state: {
    clinicRoomsInfoAry:{}
  },
  reducers: {
    savaClinicRooms(state, { payload: todo }){
      return { ...state, clinicRooms: todo.list };
    },
    savaClinicRoomsInfo(state, { payload: todo }){
      let clinicRoomsInfoAry = {...state.clinicRoomsInfoAry}
      clinicRoomsInfoAry[todo.date] = todo
      return { ...state, clinicRoomsInfoAry};
    },
    savaClinicHistory(state, { payload: todo }){
      return { ...state, clinicHistory: todo };
    },

  },
  effects: {
    //根据日期查询门诊列表
    *getClinicRooms({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(outpatient.getClinicRooms, values);
        yield put({
          type: 'savaClinicRooms',
          payload: data
        });
      }
      catch (err) {
      }
    },
    *changeClinicState({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(outpatient.changeClinicState, values);
        message.success("修改成功");
      }
      catch (err) {
      }
    },
    *getClinicRoomsInfo({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(outpatient.getClinicRoomsInfo, values);
        yield put({
          type: 'savaClinicRoomsInfo',
          payload: {...data,date:values.date}
        });
      }
      catch (err) {
      }
    },

    *cancelClinic({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(outpatient.cancelClinic, values);
        message.success("取消成功");

        let query = parse(location.search.substr(1))
        routerRedux.push({
          pathname:'/service/order-outpatient/detail',
          query: {...query,date:dateString}
        })
      }
      catch (err) {
      }
    },

    *getClinicHistory({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(outpatient.getClinicHistory, values);
        yield put({
          type: 'savaClinicHistory',
          payload: {...data,date:values.date}
        });
      }
      catch (err) {
      }
    },



  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        let date = moment().format('YYYY-MM-DD')
        if(query.date){
          date = query.date
        }
        if (pathname === '/service/order-outpatient') {
          dispatch({ type: 'getClinicRooms',payload:{date} });
        }
        if (pathname === '/service/order-outpatient/history') {
          dispatch({ type: 'getClinicHistory'});
        }
        if (pathname === '/service/order-outpatient/detail') {
          dispatch({ type: 'getClinicRoomsInfo',payload:{appointmentId:query.appointmentId,date} });
        }

      })
    }
  },
};
