import * as roomManagement from '../services/roomManagement';
import * as addCustomerInformation from '../services/addCustomerInformation';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { parse } from 'qs'

export default {
  namespace: 'roomManagement',
  state: {
    listData:[],
    detailData:'',
    FloorAry:[],
    MainFloorAry:[],
    AreaAry:[],
    TowardAry:[],
  },

  reducers: {
    setListData(state, { payload: todo }){
      return {...state,listData:todo.data};
    },
    setDetailData(state, { payload: todo }){
      return {...state,detailData:todo.data};
    },
    addMutDictData(state, { payload: todo }){
      if(todo.abName === 'LC'){
        return {...state,FloorAry:todo.data};
      }
      else if(todo.abName === 'ZFL'){
        return {...state,MainFloorAry:todo.data};
      }
      else if(todo.abName === 'QY'){
        return {...state,AreaAry:todo.data};
      }
      else if(todo.abName === 'CX'){
        return {...state,TowardAry:todo.data};
      }
      return {...state};
    },
  }
  ,
  effects: {
    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        abName:value.abName,
        softDelete: 0,
      };

      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {

        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
            data:data,
          }
        });
      }
    },
    *listByPage({ payload: values }, { call,put }) {
      let size = 10;
      let page = 1;

      const dict = {page:page,size:size}

      const { data: { data,code,err } } = yield call(roomManagement.listByPage, dict);
      if (code == 0) {
        yield put({type: 'setListData',payload:{data}});
      }
    },
    *addRoom({ payload: values }, { call,put }) {

      const { data: { code } } = yield call(roomManagement.addRoom, values);
      if (code == 0) {
        message.success('添加成功')
      }
    },
    *findById({ payload: values }, { call,put }) {

      const { data: { code,data } } = yield call(roomManagement.findById, parse(location.search.substr(1)));
      if (code == 0) {
        yield put({type: 'setDetailData',payload:{data}});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chamber/roomindex') {
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'LC',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'ZFL',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'QY',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'CX',
            }
          });
        }
      })
    }
  }
}


