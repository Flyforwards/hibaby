/**
 * Created by Flyforwards on 2017/9/10.
 */
import * as customerService from '../services/customer';
import * as serviceAssessment from '../services/serviceAssessment';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import * as orderSweat from '../services/orderSweat';
import moment from  'moment'
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'orderSweat',
  state: {
    total: 0,
    page: 1,
    size: 10,
    currentDate:'',
    detailCurrentDate:'',
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if(pathname === '/service/order-sweat') {
          dispatch({
            type:'getSystemTime'
          })
        }
        if(pathname === '/service/order-sweat/detail') {
          dispatch({
            type:'getSweatingRoomsInfo',
            payload:{
              ...query,
              'type':1
            }
          })
        }
      });
    }
  },
  effects: {
    //取消预约
    *cancelSweating({paylaod: value},{call, put,select}){
      const { data:{ code,data}} = yield call(orderSweat.cancelSweating,value);
      const state = yield select(state => state.orderSweat)
      if(code == 0 ) {
        message.success("取消预约成功");
        yield put({
          type:'getSweatingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":state.detailCurrentDate,
            "type":1,
          }
        })
      }
    },
    //开启预约
    *openSweating({payload:value},{call,put,select}) {
      const { data:{ code, data}} = yield call(orderSweat.openSweating,value);
      const state = yield select(state => state.orderSweat)
      if(code == 0) {
        message.success("预约开启成功")
        yield put({
          type:'getSweatingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":state.detailCurrentDate,
            "type":1,
          }
        })
      }
    },
    //关闭预约
    *closeSweating({payload:value},{call,put,select}) {
      const { data:{code, data}} = yield call(orderSweat.closeSweating,value);
      const state = yield select(state => state.orderSweat)
      if(code == 0) {
        message.success("预约关闭成功")
        yield put({
          type:'getSweatingRoomsInfo',
          payload:{
            "appointmentId":queryURL("appointmentId"),
            "date":state.detailCurrentDate,
            "type":1,
          }
        })
      }
    },
    //根据日期查询房间详情
    *getSweatingRoomsInfo({payload:value},{call,put}) {
      const { data:{code,data}} = yield call(orderSweat.getSweatingRoomsInfo,value);
      if(code == 0) {
        yield put({
          type:'saveSweatRoomsInfo',
          payload:{
            data
          }
        })
        if(value.tabs){
         return ;
        }else{
          yield put({
            type:'saveDetailDate',
            payload:{
              detailCurrentDates:value.date
            }
          })
        }

      }
    },
   //切换上线离线状态
    *changeSweatingState({payload:value},{call,put,select}) {
      const {data: {code, data}} = yield call(orderSweat.changeSweatingState,value);
      const state = yield select(state => state.orderSweat)
      if(code == 0) {
        message.success("切换成功")
        yield put({
          type:'getSweatingRooms',
          payload:{
            'date':state.currentDate
          }
        })
      }
    },
    //根据日期查询房间列表
    *getSweatingRooms({payload:value},{call,put}) {
      const { data: { code, data}} = yield call(orderSweat.getSweatingRooms,value);
      if(code == 0) {
        yield put({
          type:'saveRoomList',
          payload:{
            data
          }
        });
        yield put({
          type:'saveDate',
          payload:{
            currentDates:value.date
          }
        })
      }
    },
    //服务器时间
    *getSystemTime({payload:value},{call,put}){
      const { data: { code,data}} = yield  call(orderSweat.getSystemTime,value);
      if(code == 0) {
        yield put({
          type:'saveSystemTime',
          payload:{
            data
          }
        });
        yield put({
          type:'getSweatingRooms',
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
      }
    },
  },
  reducers: {
    addMutDictData(state, { payload: todo }){
      if (todo.abName === 'YCC') {
        return { ...state, fetusAry: todo.data };
      }
      else if (todo.abName === 'YC') {
        return { ...state, gravidityAry: todo.data };
      }
      return { ...state };
    },
    //服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}){
      return { ...state, systemTime }
    },
    //根据日期查询房间列表
    saveRoomList(state, {payload:{data:roomsList}}){
      return { ...state,roomsList}
    },
    //保存日期
    saveDate(state,{payload:{currentDates}}){
      return { ...state,currentDate:currentDates}
    },
    //保存详情页日期
    saveDetailDate(state,{payload:{detailCurrentDates}}){
      return { ...state,detailCurrentDate:detailCurrentDates}
    },
    //根据日期查询房间详情
    saveSweatRoomsInfo(state,{payload:{data:roomsInfo}}) {
      return { ...state,roomsInfo}
    }
  }

}
