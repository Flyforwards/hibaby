import * as roomManagement from '../services/roomManagement';
import * as addCustomerInformation from '../services/addCustomerInformation';
import {message} from 'antd'
import {routerRedux} from 'dva/router';
import moment from 'moment';
import {parse} from 'qs'
export default {
  namespace: 'roomStatusManagement',
  state: {
    packageAry: [],
    roomList: '',
    selectValue: ['all', 0, 1, 2, 3, 4, 5, 6, 7],
    dayStatusData: '',
    FloorAry: '',
    MainFloorAry: '',
    AreaAry: '',
    TowardAry: '',
    roomState: 'day',
  },

  reducers: {

    setSelectValue(state, {payload: todo}){
      let listArray = [];
      if (state.dayStatusData) {
        for (let i = 0; i < state.dayStatusData.roomList.length; i++) {
          const dict = state.dayStatusData.roomList[i];
          for (let j = 0; j < todo.data.length; j++) {
            if (dict.status == todo.data[j]) {
              listArray.push(dict);
              break;
            }
          }
        }
      }

      return {...state, selectValue: todo.data, roomList: listArray};
    },
    setPackageAry(state, {payload: todo}){
      return {...state, packageAry: todo.data};
    },
    setDayStatusData(state, {payload: todo}){
      return {...state, dayStatusData: todo.data};
    },
    addMutDictData(state, {payload: todo}){
      if (todo.abName === 'LC') {
        return {...state, FloorAry: todo.data};
      }
      else if (todo.abName === 'ZFL') {
        return {...state, MainFloorAry: todo.data};
      }
      else if (todo.abName === 'QY') {
        return {...state, AreaAry: todo.data};
      }
      else if (todo.abName === 'CX') {
        return {...state, TowardAry: todo.data};
      }
      return {...state};
    },
    setRoomViewState(state, {payload: todo}){
      return {...state, roomState: todo.data};
    },
  }
  ,
  effects: {
    *listByMain({payload: values}, {call, put}) {
      const {data: {code, data}} = yield call(roomManagement.listByMain);
      if (code == 0) {
        yield put({type: 'setPackageAry', payload: {data}});
      }
    },
    *dayStatus({payload: values}, {call, put, select}) {
      const state = yield select(state => state.roomStatusManagement);
      const param = parse(location.search.substr(1))
      const defData = {useDate: moment().format()}
      const {data: {code, data}} = yield call(roomManagement.dayStatus, {...defData, ...param});
      if (code == 0) {
        yield put({type: 'setDayStatusData', payload: {data}});

        yield put({type: 'setSelectValue', payload: {data: state.selectValue,}});
      }
    },
    *dayStatusUpdate({payload: values}, {call, put}) {
      const defData = {useDate: moment().format()}
      const {data: {code, data}} = yield call(roomManagement.dayStatusUpdate, {...defData, ...values});
      if (code == 0) {
        const param = parse(location.search.substr(1))

        message.success('修改成功')
        yield put(routerRedux.push({
            pathname: '/chamber/roomstatusindex',
            query: param
          }
        ))
      }
    },
    *getDataDict({payload: value}, {call, put}){
      const parameter = {
        abName: value.abName,
        softDelete: 0,
      };
      const {data: {code, data}} = yield call(addCustomerInformation.getDataDict, parameter);
      if (code == 0) {
        yield put({
          type: 'addMutDictData',
          payload: {
            abName: value.abName,
            data: data,
          }
        });
      }
    },
    *roomViewStateChange({payload: value}, {call, put}){
      yield put({
        type: 'setRoomViewState',
        payload: {
          data: !value ? 'day' : 'month',
        }
      });
    },
  },

  subscriptions: {
    setup({dispatch, history})
    {
      return history.listen(({pathname, query}) => {
        if (pathname === '/chamber/roomstatusindex') {
          dispatch({type: 'dayStatus'});
          dispatch({
            type: 'getDataDict',
            payload: {
              "abName": 'LC',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload: {
              "abName": 'ZFL',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload: {
              "abName": 'QY',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload: {
              "abName": 'CX',
            }
          });
        }

      })
    }
  }
}


