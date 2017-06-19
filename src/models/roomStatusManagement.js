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
    monthStateCustomers: [],
    monthRoomList: [],
    dragUserIndex: 0,
    selectedYear: new Date().getFullYear(),
    selectedMonthList: [],
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
    setMonthStatusCustomers(state, {payload: todo}){
      return {...state, monthStateCustomers: todo.data};
    },
    setMonthRoomList(state, {payload: todo}){
      return {...state, monthRoomList: todo.data};
    },
    userDrop(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();
      let dragUser = state.monthStateCustomers[state.dragUserIndex];
      for (let i = 0; i < 28; i++) {
        let allDays = monthRoomList[parseInt(data.roomIndex)].useAndBookingList;
        let currentDay = allDays[parseInt(data.dayIndex) + i];

        if (!currentDay) {
          break;
        }

        if (currentDay.customerList) {
          currentDay.customerList.push(dragUser);
        }

      }

      return {...state, monthRoomList: monthRoomList};
    },
    userDragStart(state, {payload: data}){
      return {
        ...state,
        dragUserIndex: data.userIndex
      }
    },
    selectedYearChange(state, {payload: data}){
      return {
        ...state,
        selectedYear: data.selectedYear,
      }
    },
    selectedMonthChange(state, {payload: data}){
      return {
        ...state,
        selectedMonthList: data.selectedMonthList,
      }
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
      const param = parse(location.search.substr(1));
      const defData = {useDate: moment().format()}
      const {data: {code, data}} = yield call(roomManagement.dayStatus, {...defData, ...param});
      if (code == 0) {
        yield put({type: 'setDayStatusData', payload: {data}});

        yield put({type: 'setSelectValue', payload: {data: state.selectValue,}});
      }
    },
    *dayStatusUpdate({payload: values}, {call, put}) {
      const defData = {useDate: moment().format()};
      const {data: {code, data}} = yield call(roomManagement.getMonthStatusCustomers, {...defData, ...values});
      if (code == 0) {
        const param = parse(location.search.substr(1));

        message.success('修改成功');
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

      if (value) {
        const {data: {code, data}} = yield call(roomManagement.getMonthStatusCustomers);

        yield put({
          type: 'setMonthStatusCustomers',
          payload: {
            data: data,
          }
        });
      }
    },
    *monthRoomList({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);
      const selectedYear = state.selectedYear;
      const selectedMonthList = state.selectedMonthList;

      if (!selectedYear) {
        message.warn('请选择年份');
        return;
      }

      if (!selectedMonthList || !selectedMonthList.length) {
        message.warn('请选择月份');
        return;
      }

      if (selectedMonthList.length > 3) {
        message.warn('最多只能选择3个月份');
        return;
      }

      let param = [{
        year: selectedYear,
        monthList: selectedMonthList,
      }];

      const {data: {data}} = yield call(roomManagement.getMonthRoomList, param);
      yield put({
        type: 'setMonthRoomList',
        payload: {
          data: data.list,
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


