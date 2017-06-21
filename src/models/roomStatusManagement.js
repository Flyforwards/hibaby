import * as roomManagement from '../services/roomManagement';
import * as customerService from '../services/customer';
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
    resultsRowHouses: '',
    dayStatusData: '',
    FloorAry: '',
    MainFloorAry: '',
    AreaAry: '',
    TowardAry: '',
    roomState: 'day',
    monthStateCustomers: [],
    monthRoomList: [],
    dragUser: null,
    selectedYear: new Date().getFullYear(),
    selectedMonthList: [],
    allCusList:'',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },

  },

  reducers: {
    setCustomerPageSave(state, { payload: { list, pagination }}) {
      return {...state, allCusList:list, pagination: {  ...state.pagination,...pagination }};
    },
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

      return {...state, selectValue: todo.data, roomList: listArray || ''};
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
    setResultsRowHouses(state, {payload: todo}){
      return {...state, resultsRowHouses: todo.data};
    },
    setRoomViewState(state, {payload: todo}){
      return {...state, roomState: todo.data};
    },
    setMonthStatusCustomers(state, {payload: todo}){
      return {
        ...state,
        monthStateCustomers: todo.data
      };
    },
    setMonthRoomList(state, {payload: todo}){
      return {...state, monthRoomList: todo.data};
    },

    userDropReducer(state, {payload: data}){
      // 复制数组
      let monthRoomList = state.monthRoomList.concat();

      // 获取当前操作的用户
      let dragUser = state.dragUser;

      let allDays = monthRoomList[parseInt(data.roomIndex)].useAndBookingList;

      for (let i = 0; i < dragUser.reserveDays; i++) {
        let dayIndex = parseInt(data.dayIndex) + i;

        let currentDay = allDays[dayIndex];

        if (!currentDay || !currentDay.customerList) {
          break;
        }

        // 判断是否是连续时间
        if (dayIndex !== 0) {
          if (allDays[dayIndex].date - allDays[dayIndex - 1].date > 86400000) {
            break;
          }
        }

        // 如果该用户在当前房间内不存在, 则进行添加
        let isExit = false;

        for (let customer of currentDay.customerList) {
          if (customer.customerId === dragUser.customerId) {
            isExit = true;
            break;
          }
        }

        if (!isExit) {
          currentDay.customerList.push(dragUser);
        }
      }

      return {
        ...state,
        monthRoomList: monthRoomList
      };
    },

    userDragStart(state, {payload: data}){
      return {
        ...state,
        dragUser: data.dragUser,
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

    confirmCheckIn(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();
      let room = monthRoomList[data.roomIndex].useAndBookingList;
      let startIndex = parseInt(data.startIndex);
      let endIndex = parseInt(data.endIndex);

      for (let j = startIndex; j <= endIndex; j++) {
        let customerList = room[j].customerList;
        for (let k = 0; k < customerList.length; k++) {
          if (customerList[k].customerId == data.customerId) {
            customerList[k].status = 5;// 确认入住
            break;
          }
        }
      }

      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },

    deleteUser(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();
      let room = monthRoomList[data.roomIndex].useAndBookingList;

      let startIndex = parseInt(data.startIndex);
      let endIndex = parseInt(data.endIndex);
      for (let j = startIndex; j <= endIndex; j++) {
        let customerList = room[j].customerList;
        for (let k = 0; k < customerList.length; k++) {
          if (customerList[k].customerId == data.customerId) {
            delete customerList[k].status;
            customerList.splice(k, 1);
            break;
          }
        }
      }

      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },

    updateReserveDays(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();

      let room = monthRoomList[data.roomIndex].useAndBookingList;
      let startIndex = parseInt(data.startIndex);
      let endIndex = parseInt(data.endIndex);
      let customerId = data.customerId;
      let customerName = data.customerName;
      let type = data.type;

      if (type === "add") {
        for (let j = startIndex + 1; j <= endIndex; j++) {
          let customerList = room[j].customerList;
          customerList.push({
            customerId,
            customerName,
          })
        }
      } else {
        for (let j = startIndex + 1; j <= endIndex; j++) {
          let customerList = room[j].customerList;
          for (let k = 0; k < customerList.length; k++) {
            if (customerList[k].customerId == customerId) {
              delete customerList[k].status;
              customerList.splice(k, 1);
              break;
            }
          }
        }
      }

      // 更新入住天数
      let customersList = state.monthStateCustomers;
      for (let i = 0; i < customersList.length; i++) {
        let customer = customersList[i];
        if (customer.customerId == customerId) {
          customer.reserveDays = data.reserveDays;
        }
      }
      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },
  },

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
      const {data: {code, data, err}} = yield call(roomManagement.dayStatus, {...defData, ...param});
      if (code == 0) {
        yield put({type: 'setDayStatusData', payload: {data}});
        yield put({type: 'setSelectValue', payload: {data: state.selectValue,}});
      }
    },
    *dayStatusUpdate({payload: values}, {call, put}) {
      const defData = {useDate: moment().format()};
      const {data: {code, data}} = yield call(roomManagement.dayStatusUpdate, {...defData, ...values});
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
    *arrangeRoom({payload: value}, {call, put}){
      const defData = {useDate: moment().format()}

      value = {
        "beginDate": "2017-06-21T02:29:28.617Z",
        "customerId": 140,
        "customerName": 0,
        "days": 28,
        "jumpNo": 3,
        "packageInfoId": 32
      }

      const {data: {code, data}} = yield call(roomManagement.arrangeRoom,{...defData,...value});
      if (code == 0) {
        yield put({
          type: 'setResultsRowHouses',
          payload: {
            data: data,
          }
        });
        console.log(data)
      }
    },

    // 获取用户列表
    *getCustomerPage({ payload: values }, { call, put }) {

      const tt = {page:1,size:10}

      const { data: { data, total, page, size, code } } = yield call(customerService.getCustomerPage, tt);
      if (code == 0) {
        if(data.length == 0 && page > 1){
          yield put({type:'getCustomerPage',payload:{page:page -1,size:10}})

        }else{
          yield put({
            type: 'setCustomerPageSave',
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
            data: data.map((item) => {
              return {
                ...item,
                reserveDays: 28,
              }
            })
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
    *userDrop({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);

      // 删除之前的
      yield put({
        type: 'deleteUser',
        payload: {
          ...value,
          startIndex: state.dragUser.startIndex,
          endIndex: state.dragUser.endIndex,
          customerId: state.dragUser.customerId,
          roomIndex: state.dragUser.roomIndex,
        }
      });

      // 添加新的
      yield put({
        type: 'userDropReducer',
        payload: {
          ...value,
        }
      });
    }
  },

  subscriptions: {
    setup({dispatch, history})
    {
      return history.listen(({pathname, query}) => {
        if (pathname === '/chamber/roomstatusindex') {
          dispatch({type: 'dayStatus'});
          if (!query) {
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

        }

      })
    }
  }
}


