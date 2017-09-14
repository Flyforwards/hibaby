/**
 * 游泳预约
 * Created by yangjingjing on 2017/9/11.
 */
import * as orderSwimming from '../services/orderSwimming';
import * as orderSweat from '../services/orderSweat';

import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js';
import { parse } from 'qs';
import moment from  'moment'
import { format,queryURL } from '../utils/index.js';


export default {
  namespace: 'swimming',
  state: {
    indexData:[],
    detailData:null,
    currentDate:'',
    detailCurrentDate:'',
    total: 0,
    page: 1,
    size: 10,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
  },
  subscriptions: {
    setup({dispatch,history}) {
      return history.listen(({ pathname, query }) => {
        if(pathname === '/service/order-swimming') {
          dispatch({
            type:'getSystemTime'
          })
        }
        if(pathname === '/service/order-swimming/detail') {
          dispatch({
            type:'getSwimmingRoomsInfo',
            payload:{
              ...query,
              'type':1
            }
          })
        }
        if(pathname === '/service/order-swimming/history') {
          dispatch({
            type:'getSystemTime'
          });
          dispatch({
            type:'getAppointmentByType',
            payload:{
              "type":2
            }
          })
        }
      });
    }
  },
  effects: {
    //获取系统时间
    *getSystemTime({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(orderSweat.getSystemTime);
      if (code == 0) {
        if(location.pathname === '/service/order-swimming'){
          yield put({
            type:'saveSystemTime',
            payload:{
              data
            }
          });
          yield put({
            type:'getSwimmingRooms',
            payload:{
              "date": moment(data).format("YYYY-MM-DD")
            }
          });
          yield put({
            type:'saveDate',
            payload:{
              currentDates:moment(data).format("YYYY-MM-DD")
            }
          })
        }else{
          yield put({
            type:'getSwimmingHistory',
            payload:{
              "appointmentId":queryURL("appointmentId"),
              "page":1,
              "size":10,
              "sortField": "time",
              "sortOrder": "AESC",
              "startDate":moment(data).format("YYYY-MM-DD"),
              "endDate":moment(data).format("YYYY-MM-DD"),
            }
          });
          yield put({
            type:'getSwimmingUtilization',
            payload:{
              "appointmentId":queryURL("appointmentId"),
              "page":1,
              "size":10,
              "sortField": "time",
              "sortOrder": "AESC",
              "startDate":moment(data).format("YYYY-MM-DD"),
              "endDate":moment(data).format("YYYY-MM-DD"),
            }
          })
        }
      }
    },
    *getSwimmingRooms({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(orderSwimming.getSwimmingRooms, values);
      if (code == 0) {
        yield put({type:'setIndexData',payload:{data}} );
        yield put({
          type:'saveDate',
          payload:{
            currentDates:values.date
          }
        })
      }
    },
    *changeSwimmingState({payload : values}, { call, put,select }){
      const {data: { code,err} } = yield call(orderSwimming.changeSwimmingState, values);
      if (code == 0) {
        message.info("状态修改成功");
        const state = yield select(state => state.swimming)
        yield put({
          type:'getSwimmingRooms',
          payload:{
            'date':state.currentDate
          }
        })
      }
    },
    *getSwimmingRoomsInfo({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(orderSwimming.getSwimmingRoomsInfo, values);
      if (code == 0) {
        yield put({type:'setSwimmingRoomsInfo',payload:{data}} );
        if(values.tabs){
          return;
        }else{
          yield put({
            type:'saveDetailDate',
            payload:{
              detailCurrentDates:values.date
            }
          })
        }

      }
    },
    //取消预约
    *cancelSwimming({paylaod: value},{call, put,select}){
      const { data:{ code,data}} = yield call(orderSwimming.cancelSwimming,value);
      const state = yield select(state => state.swimming)
      if(code == 0 ) {
        message.success("取消预约成功");
        yield put({
          type:'getSwimmingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":value.date,
            "type":1,
            "tabs":true,
          }
        })
      }
    },
    //开启预约
    *openSwimming({payload:value},{call,put,select}) {
      const { data:{ code, data}} = yield call(orderSwimming.openSwimming,value);
      const state = yield select(state => state.swimming)
      if(code == 0) {
        message.success("预约开启成功")
        yield put({
          type:'getSwimmingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":value.date,
            "type":1,
            "tabs":true,

          }
        })
      }
    },
    //关闭预约
    *closeSwimming({payload:value},{call,put,select}) {
      const { data:{code, data}} = yield call(orderSwimming.closeSwimming,value);
      const state = yield select(state => state.swimming)
      if(code == 0) {
        message.success("预约关闭成功")
        yield put({
          type:'getSwimmingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":value.date,
            "type":1,
            "tabs":true,

          }
        })
      }
    },
    //获取房间列表
    *getAppointmentByType({payload:value},{call,put}){
      const { data:{code,data}} = yield call(orderSweat.getAppointmentByType,value);
      if(code == 0) {
        yield put({
          type:'saveRoomsAllList',
          payload:{
            data
          }
        })
      }
    },
    //查询使用率
    *getSwimmingUtilization({payload:value},{call,put}){
      const { data:{code, data}} = yield call(orderSwimming.getSwimmingUtilization,value);
      if(code == 0) {
        yield put({
          type:'saveSwimmingUtilization',
          payload:{
            data
          }
        })
      }
    },
    //查询历史记录
    *getSwimmingHistory({payload:value},{call,put}){
      const { data:{code,data,page,size,total}} = yield call(orderSwimming.getSwimmingHistory,value);
      if(code == 0) {
        yield put({
          type:'saveHistoryList',
          payload:{
            data
          }
        })
        yield put({
          type: 'getHistoryPageSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },


  },
  reducers: {
    //服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}){
      return { ...state, systemTime }
    },
    setIndexData(state, { payload: {data: data} }){
      return {...state,indexData: data.list}
    },
    setSwimmingRoomsInfo(state, { payload: {data: data} }){
      return {...state,detailData: data}
    },
    //保存日期
    saveDate(state,{payload:{currentDates}}){
      return { ...state,currentDate:currentDates}
    },
    //保存详情页日期
    saveDetailDate(state,{payload:{detailCurrentDates}}){
      return { ...state,detailCurrentDate:detailCurrentDates}
    },
    //房间总数
    saveRoomsAllList(state,{payload:{data:roomsAllList}}) {
      return { ...state,roomsAllList}
    },
    //使用率
    saveSwimmingUtilization(state,{payload:{data:usePersent}}) {
      return { ...state,usePersent}
    },
    //保存历史记录
    saveHistoryList(state,{payload:{data:historyList}}) {
      return { ...state,historyList}
    },
    //分页
    getHistoryPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
  }
}
