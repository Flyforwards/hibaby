import * as roomManagement from '../services/roomManagement';
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import {message} from 'antd'
import {routerRedux} from 'dva/router';
import moment from 'moment';
import {parse} from 'qs'

// 时间毫秒数转日期: YYYY-MM-DD
const timeToDate = (time) => {
  if (!time) {
    return '';
  }

  try {
    let date = new Date(parseInt(time));

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return year + '-' + month + '-' + day;
  } catch (e) {
    console.log("日期转换时发生错误", e);
    return "";
  }
};

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
    oldMonthRoomList: [],
    monthRoomList: [],
    dragUser: null,
    selectedYear: new Date().getFullYear(),
    selectedMonthList: [],
    monthRoomUpdateList: [],// 保存状态有更新的用户
    //弹出的modal数据控制

    CustomerVisible:false,
    RowHousesVisible:false,
    allCusList: '',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  reducers: {
    setCustomerVisible(state, {payload: data}) {
      return {...state, CustomerVisible:data};
    },
    setRowHousesVisible(state, {payload: data}) {
      return {...state, RowHousesVisible:data};
    },

    setCustomerPageSave(state, {payload: {list, pagination}}) {
      return {...state, allCusList: list, pagination: {...state.pagination, ...pagination}};
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
      // 保留初始的数据, 用于保存预约状态时和当前状态比较, 深拷贝
      state.oldMonthRoomList = JSON.parse(JSON.stringify(todo.data));

      return {...state, monthRoomList: todo.data};
    },

    userDropReducer(state, {payload: data}){
      // 复制数组
      let monthRoomList = state.monthRoomList.concat();

      // 获取当前操作的用户
      let dragUser = state.dragUser;
      let roomIndex = parseInt(data.roomIndex);
      let startDayIndex = parseInt(data.dayIndex);

      let allDays = monthRoomList[roomIndex].useAndBookingList;

      for (let i = 0; i < dragUser.reserveDays; i++) {
        let dayIndex = startDayIndex + i;

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
            customerList[k].status = 5; // 确认入住
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
      const defData = {"customerId": -1, "customerName": ''}

      const {data: {code, data}} = yield call(roomManagement.arrangeRoom, {...defData, ...value});
      if (code == 0) {
        yield put({
          type: 'setResultsRowHouses',
          payload: {
            data: data,
          }
        });
      }
    },

    // 获取用户列表
    *getCustomerPage({payload: values}, {call, put}) {

      const defParam = {page: 1, size: 10}

      const {data: {data, total, page, size, code}} = yield call(customerService.getCustomerPage, {...defParam,...values});
      if (code == 0) {
        if (data.length == 0 && page > 1) {
          yield put({type: 'getCustomerPage', payload: {page: page - 1, size: 10}})

        } else {
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

      // 初始化更新集合
      let monthRoomUpdateList = state.monthRoomUpdateList = [];

      for (let i = 0; i < data.list.length; i++) {
        monthRoomUpdateList.push([]);
        for (let j = 0; j < data.list[i].useAndBookingList.length; j++) {
          monthRoomUpdateList[i].push([]);
        }
        // monthRoomUpdateList[i] = new Array(data.list[i].useAndBookingList.length).fill([]);
      }

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
    },

    // *confirmCheckIn({payload: value}, {call, put, select}){
    //   const {data: {code, data}} = yield call(roomManagement.confirmReside);
    // },

    *monthRoomUpdate({payload: value}, {call, put, select}){

      const state = yield select(state => state.roomStatusManagement);

      let monthRoomUpdateList = state.monthRoomUpdateList;
      let oldMonthRoomList = state.oldMonthRoomList;
      let monthRoomList = state.monthRoomList;

      // 第一层, 循环房间
      for (let i = 0; i < oldMonthRoomList.length; i++) {
        let oldRoom = oldMonthRoomList[i].useAndBookingList;
        let room = monthRoomList[i].useAndBookingList;
        // 第二层, 循环日期
        for (let j = 0; j < oldRoom.length; j++) {

          let oldUserList = oldRoom[j].customerList;
          let userList = room[j].customerList;

          if (oldUserList.length === 0 && userList.length === 0) {
            continue;
          }

          // 如果是已入住状态, 则跳过, 不处理


          // 如果原始集合里有, 新集合里没有, 则是删除
          if (userList.length === 0) {
            for (let k = 0; k < oldUserList.length; k++) {
              // 已入住, 不处理
              if (oldUserList[k].status == 5) {
                continue;
              }

              monthRoomUpdateList[i][j].push({
                customerId: oldUserList[k].customerId,
                customerName: oldUserList[k].customerName,
                date: timeToDate(oldRoom[j].date),
                roomId: oldMonthRoomList[i].roomId,
                roomNo: oldMonthRoomList[i].roomNo,
                status: 7, // 预约
              })
            }
          }

          // 如果原始集合没有, 新集合里有, 则是新增
          if (oldUserList.length === 0) {
            for (let k = 0; k < userList.length; k++) {

              // 已入住, 不处理
              if (userList[k].status == 5) {
                continue;
              }

              monthRoomUpdateList[i][j].push({
                customerId: userList[k].customerId,
                customerName: userList[k].customerName,
                date: timeToDate(oldRoom[j].date),
                roomId: oldMonthRoomList[i].roomId,
                roomNo: oldMonthRoomList[i].roomNo,
                status: 7, // 预约
              })
            }
          }

        }
      }

      // const {data: {code, data}} = yield call(roomManagement.monthRoomUpdate, param);
    },
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


