import * as roomManagement from '../services/roomManagement';
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import { message, Modal } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { parse } from 'qs'

let zIndexCount = 100;

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

/**
 * 获取某月天数
 * @param year
 * @param month
 * @returns {number}
 */
const getDays = (year, month) => {
  return (new Date(year, month, 0)).getDate();
};

function defaultDateList() {
  const currMonth = parseInt(moment().format('M'));
  let  defaultDateList = []
  defaultDateList.push(
    {
      year: moment().format('YYYY'),
      monthList: function () {
        let ary = [`${currMonth}`];
        if (currMonth + 1 <= 12) {
          ary.push((currMonth + 1).toString())
        }
        if (currMonth + 2 <= 12) {
          ary.push((currMonth + 2).toString())
        }
        return (ary)
      }()
    },
  )

  if (currMonth >= 11){
    defaultDateList.push(
      {
        year: (parseInt(moment().format('YYYY'))+1).toString(),
        monthList: function () {
          let ary = [];
          if (currMonth === 11){
            ary.push((currMonth+2-12).toString())
          }
          else if (currMonth === 12){
            ary.push((currMonth+1-12).toString())
            ary.push((currMonth+2-12).toString())
          }
          return (ary)
        }()
      },
    )
  }
  return defaultDateList;
}

let resideOperation = '';
let eq = false;

export default {
  namespace: 'roomStatusManagement',
  state: {
    modalH: false,
    selectMem: '',
    manualSelect: '',
    packageAry: [],
    roomList: '',
    boxW:9,
    selectValue: ['all', '0', '1', '2', '3', '4', '5', '6', '7'],
    shipCards: [],
    resultsRowHouses: '',
    dayStatusData: '',
    FloorAry: '',
    MainFloorAry: '',
    // 入住率
    occupancy: '',
    fetusAry: '',
    AreaAry: '',
    TowardAry: '',
    roomState: 'day',
    monthStateCustomers: [],
    defSelectCustomers: [],
    oldMonthRoomList: [],
    monthRoomList: [],
    dragUser: null,
    defaultYear: moment().format('YYYY'),
    dateSelectList: defaultDateList(),
    dateRulerList: [],
    QuickStayVisible:false,
    floorSelect: null,
    dateSelectViews: [],
    //可编辑的  添加客户  加入的
    monthRoomUpdateList: [],// 保存状态有更新的用户
    //弹出的modal数据控制

    CustomerVisible: false,
    createCustomerVisible: false,
    RowHousesVisible: false,
    RowHousesWayVisible: false,
    allCusList: '',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }
  },

  reducers: {
    memberShipCardSave(state, { payload: { shipCards } }) {
      return { ...state, shipCards };
    },
    removeData(state, { payload: data }) {
      return {
        ...state, dateSelectList: defaultDateList(), dateSelectViews: []
      };
    },
    setFloorSelect(state, { payload: data }) {
      return { ...state, floorSelect: data };
    },
    setCustomerVisible(state, { payload: data }) {
      let dict = { CustomerVisible: data };
      return { ...state, ...dict };
    },

    createCustomerVisible(state, { payload: data }) {
      let dict = { createCustomerVisible: data };
      return { ...state, ...dict };
    },


    setRowHousesVisible(state, { payload: data }) {
      let dict = { RowHousesVisible: data[0] };
      let selectMem = data[1]
      if (data === false) {
        dict.resultsRowHouses = ''
      }
      return { ...state, ...dict, selectMem };
    },

    setQuickStayVisible(state, { payload: data }) {
      return { ...state, QuickStayVisible:data };
    },

    setManualSelect(state, { payload: data }) {

      return { ...state, manualSelect: data };
    },
    setRowHousesWayVisible(state, { payload: data }) {
      return { ...state, RowHousesWayVisible: data };
    },
    setCustomerPageSave(state, { payload: { list, pagination } }) {
      let ary = [];
      for (let i = 0; i < state.monthStateCustomers.length; i++) {
        const dict = state.monthStateCustomers[i];
        for (let j = 0; j < list.length; j++) {
          const subDict = list[j];
          if (subDict.id == dict.customerId) {
            ary.push(j);
            break;
          }
        }
      }
      return {
        ...state,
        allCusList: list,
        defSelectCustomers: ary,
        pagination: { ...state.pagination, ...pagination }
      };
    },
    setSelectValue(state, { payload: todo }){

      let listArray = [];
      if (state.dayStatusData) {
        for (let i = 0; i < state.dayStatusData.roomList.length; i++) {
          const dict = state.dayStatusData.roomList[i];
          if (dict.isRepair == 1) {
            if (todo.data.indexOf('1') != -1) {
              listArray.push(dict);
            }
            continue;
          }
          for (let j = 0; j < todo.data.length; j++) {
            if (dict.status == todo.data[j]) {
              listArray.push(dict);
              break;
            }
          }
        }
      }

      return { ...state, selectValue: todo.data, roomList: listArray || '' };
    },
    setPackageAry(state, { payload: todo }){
      return { ...state, packageAry: todo.data };
    },
    setDayStatusData(state, { payload: todo }){
      return { ...state, dayStatusData: todo.data };
    },
    setActBox(state, { payload: todo }){
      return { ...state, actBox: todo };
    },
    addMutDictData(state, { payload: todo }){
      if (todo.abName === 'LC') {
        return { ...state, FloorAry: todo.data };
      }
      else if (todo.abName === 'ZFL') {
        return { ...state, MainFloorAry: todo.data };
      }
      else if (todo.abName === 'QY') {
        return { ...state, AreaAry: todo.data };
      }
      else if (todo.abName === 'CX') {
        return { ...state, TowardAry: todo.data };
      }
      else if (todo.abName === 'YCC') {
        return { ...state, fetusAry: todo.data };
      }
      return { ...state };
    },
    setResultsRowHouses(state, { payload: todo }){
      return { ...state, resultsRowHouses: todo.data };
    },
    setRoomViewState(state, { payload: todo }){
      return { ...state, roomState: !todo ? 'day' : 'month' };
    },
    setMonthStatusCustomers(state, { payload: todo }){
      return {
        ...state,
        monthStateCustomers: todo.data
      };
    },

    setMonthRoomData(state, { payload: todo }){
      const { list, rate } = todo.data
      // 保留初始的数据, 用于保存预约状态时和当前状态比较, 深拷贝
      state.oldMonthRoomList = JSON.parse(JSON.stringify(list));
      //
      const roomLists = [...list];
      let day_length = roomLists && roomLists != '' ? roomLists[0].useAndBookingList.length:'';
      let _unit_u = ($(".monthRoomRightBox").width())/day_length;

      let boxW = _unit_u > 9 ? _unit_u : 9

      return { ...state, monthRoomList: list, occupancy: rate ,boxW};
    },

    userDropReducer(state, { payload: data }){
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
          if (customer.customerId === dragUser.customerId && dragUser.status == customer.status) {
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

    userDragStart(state, { payload: data }){
      return {
        ...state,
        dragUser: data.dragUser
      }
    },

    selectedYearChange(state, { payload: data }){
      let dateSelectList = state.dateSelectList;

      state.dateSelectList[data.selectViewIndex].year = data.selectedYear;

      return { ...state, dateSelectList: dateSelectList }
    },

    selectedMonthChange(state, { payload: data }){
      let dateSelectList = state.dateSelectList;

      dateSelectList[data.selectViewIndex].monthList = data.selectedMonthList;

      return { ...state, dateSelectList: dateSelectList }
    },


    deleteUserReducer(state, { payload: data }) {
      let monthRoomList = state.monthRoomList.concat();

      if (monthRoomList[data.roomIndex]) {
        let room = monthRoomList[data.roomIndex].useAndBookingList;
        let startIndex = parseInt(data.startIndex);
        let endIndex = parseInt(data.endIndex);

        for (let j = startIndex; j <= endIndex; j++) {
          let customerList = room[j].customerList;
          for (let k = 0; k < customerList.length; k++) {
            if (customerList[k].customerId == data.customerId && data.status == customerList[k].status) {
              customerList.splice(k--, 1);
              break;
            }
          }
        }
      }

      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },

    moveReserveDays(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();
      let {oldStartIndex, unit, oldEndIndex, roomIndex, customerId, customerName, reserveDays, status} = data
      let room = monthRoomList[roomIndex].useAndBookingList;
      let roomId = monthRoomList[roomIndex].roomId;

      if(reserveDays < 1){
        reserveDays = 1
      }

      for (let i = oldStartIndex;i<room.length;i++){
        let roomX = room[i]

        for (let j = 0;j<roomX.customerList.length;j++){
          let customer = roomX.customerList[j]
          if (customer.customerId === customerId){
            roomX.customerList.splice(j,1)
            continue
          }

        }
      }

      for (let i = oldStartIndex;i<oldStartIndex+reserveDays;i++){
        let roomX = room[i]
        roomX.customerList.push({customerId,customerName,isRepair:"0",status})
      }


      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },

    updateReserveDays(state, {payload: data}){
      let monthRoomList = state.monthRoomList.concat();

      //用来增减入住用户的
      resideOperation = [];

      let room = monthRoomList[data.roomIndex].useAndBookingList;
      let roomId = monthRoomList[data.roomIndex].roomId;
      let startIndex = parseInt(data.startIndex);
      let endIndex = parseInt(data.endIndex);
      let customerId = data.customerId;
      let customerName = data.customerName;
      let status = data.status;
      let type = data.type;

      if (type === "add") {
        for (let j = startIndex + 1; j <= endIndex; j++) {
          // 不连续的时间
          if (room[j].date - room[j - 1].date > 86400000) {
            break;
          }

          let customerList = room[j].customerList;

          // 如果用户已存在, 则不进行添加
          let noUser = true;
          for (let customer of customerList) {
            if (customer.customerId === customerId) {
              noUser = false;
              break;
            }
          }

          if (noUser) {
            customerList.push({
              customerId,
              customerName,
              status
            })
          }

          resideOperation.push({
            "customerId": customerId,
            "customerName": customerName,
            "date": moment(room[j].date).format(),
            "roomId": roomId,
            "status": 4
          })

        }
      } else {

        for (let j = startIndex+1;j<=endIndex;j++){
          resideOperation.push({
            "customerId": customerId,
            "customerName": customerName,
            "date": moment(room[j].date).format(),
            "roomId": roomId,
            "status": 0
          })
        }

      }

      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },
    addDateSelectView(state, { payload: data }){

      let dateSelectViews = state.dateSelectViews;

      let dateSelectList = state.dateSelectList;

      dateSelectViews.push(data.dateSelectView);

      dateSelectList.push({ year: moment().format('YYYY'), monthList: [] });

      return { ...state, dateSelectViews, dateSelectList }
    },

    changeModalH(state, { payload: data }){

      return {
        ...state,
        modalH: data
      }
    },

    //房间微调  房间号 客户id 方向
    roomFinetuning(state, { payload: data }){
      let {customerId,startIndex,endIndex,direction,status,customerName,roomIndex,ActBox} = data
      customerId = parseInt(customerId)
      startIndex = parseInt(startIndex)
      endIndex = parseInt(endIndex)
      status = parseInt(status)
      roomIndex = parseInt(roomIndex)

      // 复制数组
      let monthRoomList = state.monthRoomList.concat();

      let allDays = monthRoomList[roomIndex].useAndBookingList;

      let removeIndedx = direction === "left" ? endIndex : startIndex;
      let addIndex = direction === "left" ? startIndex-1 : endIndex+1;


      if (!allDays[removeIndedx]||!allDays[addIndex]){
        message.error("数据超出边界")
        return state
      }

      let customerList = allDays[removeIndedx].customerList;
      for (let k = 0; k < customerList.length; k++) {
        if (customerList[k].customerId == customerId && status == customerList[k].status) {
          customerList.splice(k, 1);
          break;
        }
      }


      let customerListTwo = allDays[addIndex].customerList;
      customerListTwo.push({customerId,customerName,status})
      ActBox.dataset.startIndex = `${parseInt(startIndex)+(direction === "left" ? -1 : 1)}`;
      ActBox.dataset.endIndex = `${parseInt(endIndex)+(direction === "left" ? -1 : 1)}`;
      return {...state,monthRoomList};

    },

    roomChange(state, { payload: data }){
      let {customerId,startIndex,endIndex,direction,status,customerName,roomIndex,ActBox} = data
      customerId = parseInt(customerId)
      startIndex = parseInt(startIndex)
      endIndex = parseInt(endIndex)
      status = parseInt(status)
      roomIndex = parseInt(roomIndex)



      let monthRoomList = state.monthRoomList.concat();

      if (monthRoomList[data.roomIndex]) {
        let room = monthRoomList[data.roomIndex].useAndBookingList;
        let startIndex = parseInt(data.startIndex);
        let endIndex = parseInt(data.endIndex);

        for (let j = startIndex; j <= endIndex; j++) {
          let customerList = room[j].customerList;
          for (let k = 0; k < customerList.length; k++) {
            if (customerList[k].customerId == data.customerId && data.status == customerList[k].status) {
              customerList.splice(k--, 1);
              break;
            }
          }
        }
      }


      let tempRoom = monthRoomList[roomIndex+(direction === "up" ? -1 : 1)];

      if (!tempRoom){
        message.error("数据超出边界")
        return state;
      }

      let allDays = tempRoom.useAndBookingList;


      for (let i = startIndex; i <= endIndex; i++) {
        let dayIndex = i;

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
          if (customer.customerId === customerId && status == customer.status) {
            isExit = true;
            break;
          }
        }

        if (!isExit) {
          currentDay.customerList.push({customerId,customerName,status});
        }
      }


      ActBox.dataset.roomIndex = `${parseInt(roomIndex)+(direction === "up" ? -1 : 1)}`;

      return {...state,monthRoomList};

    },

    FastRowHouses(state, { payload: data }){
      let {customerId,startDate,customerName,roomIndex,days} = data

      roomIndex = parseInt(roomIndex)

      let monthRoomList = state.monthRoomList.concat();

      let tempRoom = monthRoomList[roomIndex];

      let allDays = tempRoom.useAndBookingList;

      let startIndex = 0

      for (let i = 0;i<allDays.length;i++){
        if (allDays[i].date == startDate){
          startIndex = i;
          break;
        }
      }

      for (let i = 0; i < days; i++) {
        let dayIndex = startIndex + i;

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
          if (customer.customerId === customerId && status == customer.status) {
            isExit = true;
            break;
          }
        }

        if (!isExit) {
          currentDay.customerList.push({customerId,customerName,status});
        }
      }

      return {...state,monthRoomList};
    },

    deleteDateSelectView(state, { payload: data }){

      let dateSelectViews = state.dateSelectViews;

      let dateSelectList = state.dateSelectList;

      delete dateSelectList[data.index]

      delete dateSelectViews[data.index - 1]

      return {
        ...state,
        dateSelectViews: dateSelectViews,
        dateSelectList: dateSelectList
      }
    },

    updateDateRulerList(state, { payload: data }) {

      let dateRulerList = [];
      let dateObj = {};
      let sortYears = [];

      for (let d of data.data) {
        dateObj[d.year] = d.monthList;
        sortYears.push(d.year)
      }

      sortYears.sort((a, b) => a - b);

      for (let year of sortYears) {
        for (let month of dateObj[year]) {
          month = month < 10 ? '0' + month : month;
          dateRulerList.push({
            date: year + '-' + month,
            days: getDays(year, month)
          })
        }
      }

      return {
        ...state,
        dateRulerList: dateRulerList
      }
    },
    //服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}){
      return { ...state, systemTime }
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
        yield put({type: 'setSelectValue', payload: {data: state.selectValue}});
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
        softDelete: 0
      };
      const {data: {code, data}} = yield call(addCustomerInformation.getDataDict, parameter);
      if (code == 0) {
        yield put({
          type: 'addMutDictData',
          payload: {
            abName: value.abName,
            data: data
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
            data: data
          }
        });
      }
    },

    // 获取用户列表
    *getCustomerPage({payload: values}, {call, put}) {

      const defParam = {page: 1, size: 5}

      const {data: {data, total, page, size, code}} = yield call(customerService.getCustomerPage, {...defParam, ...values});
      if (code == 0) {
        if (data.length == 0 && page > 1) {
          yield put({type: 'getCustomerPage', payload: {page: page - 1, size: 5}})

        } else {
          yield put({
            type: 'setCustomerPageSave',
            payload: {
              list: data,
              pagination: {
                current: Number(page) || 1,
                pageSize: Number(size) || 5,
                total: total
              }
            }
          })
        }

      }
    },

    *netroomViewStateChange({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);
      const {dateSelectList, floorSelect} = state;

      // 去重
      let years = {};

      for (let dateSelect of dateSelectList) {
        if (!dateSelect) {
          continue;
        }

        if (!years[dateSelect.year]) {
          years[dateSelect.year] = {};
        }

        for (let month of dateSelect.monthList) {
          years[dateSelect.year][month] = "";
        }
      }

      // 扁平化
      let param = [];

      for (let year in years) {
        param.push({
          year: year,
          monthList: Object.keys(years[year])
        })
      }

      if (!param.length) {
        message.error("请选择时间");
        return;
      }


      let dict = {yearList: param}

      if (floorSelect) {
        dict.floor = floorSelect;
      }

      const {data: {code, data}} = yield call(roomManagement.getMonthStatusCustomers, dict);

      yield put({
        type: 'setMonthStatusCustomers',
        payload: {
          data: data.map((item) => {
            return {
              ...item,
              reserveDays: 28
            }
          })
        }
      });
    },

    *monthRoomList({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);
      const {dateSelectList, floorSelect} = state;


      // 去重
      let years = {};

      for (let dateSelect of dateSelectList) {
        if (!dateSelect) {
          continue;
        }

        if (!years[dateSelect.year]) {
          years[dateSelect.year] = {};
        }

        for (let month of dateSelect.monthList) {
          years[dateSelect.year][month] = "";
        }
      }

      // 扁平化
      let param = [];

      for (let year in years) {
        param.push({
          year: year,
          monthList: Object.keys(years[year])
        })
      }

      if (!param.length) {
        message.error("请选择时间");
        return;
      }


      let dict = {yearList: param}

      if (floorSelect) {
        dict.floor = floorSelect;
      }
      const {data: {data}} = yield call(roomManagement.getMonthRoomList, dict);

      yield put({
        type: 'updateDateRulerList',
        payload: {
          data: param
        }
      });

      yield put({
        type: 'setMonthRoomData',
        payload: {
          data: data
        }
      });
    },

    *userDrop({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);

      // 如果已入住, 开始的时间保持不变
      if (state.dragUser.status == 4) {
        // 先调用平移接口
        let param = {
          customerId: state.dragUser.customerId,
          customerName: state.dragUser.customerName,
          beginDate: timeToDate(state.dragUser.startDate),
          endDate: timeToDate(state.dragUser.endDate),
          fromRoomId: state.monthRoomList[state.dragUser.roomIndex].roomId,
          fromRoomName: state.monthRoomList[state.dragUser.roomIndex].roomNo,
          toRoomId: state.monthRoomList[value.roomIndex].roomId,
          toRoomName: state.monthRoomList[value.roomIndex].roomNo
        };

        const {data: {code, data}} = yield call(roomManagement.resideMove, param);

        // 平移不成功, 返回
        if (code != 0) {
          return;
        }
      }

      if (state.dragUser.roomIndex == -1) {
        const {data: {code, data}} = yield call(roomManagement.extendRoomUse, {
          roomId: state.monthRoomList[value.roomIndex].roomId,
          customerId: state.dragUser.customerId
        });
        if (code == 0) {
          if (data.status == 1) {
            yield put({type: 'monthRoomUpdate', payload: 'load'});
          }
          else {
            let payload = {
              ...value,
              status: state.dragUser.status
            };

            if (state.dragUser.status == 4) {
              payload.dayIndex = state.dragUser.startIndex;
            }

            // 添加新的
            yield put({
              type: 'userDropReducer',
              payload: {
                ...payload
              }
            });

            if (state.dragUser.status !== 7) {
              yield put({type: 'monthRoomUpdate', payload: 'load'});
            }
          }
        }
        else {
          return
        }
      }
      else {

        // 不是新拖入的, 删除之前的
        yield put({
          type: 'deleteUserReducer',
          payload: {
            ...value,
            startIndex: state.dragUser.startIndex,
            endIndex: state.dragUser.endIndex,
            customerId: state.dragUser.customerId,
            roomIndex: state.dragUser.roomIndex,
            status: state.dragUser.status
          }
        });

        let payload = {
          ...value,
          status: state.dragUser.status
        };

        if (state.dragUser.status == 4) {
          payload.dayIndex = state.dragUser.startIndex;
        }

        // 添加新的
        yield put({
          type: 'userDropReducer',
          payload: {
            ...payload
          }
        });

        if (state.dragUser.status !== 7) {
          yield put({type: 'monthRoomUpdate', payload: 'load'});
        }
      }
    },

    *confirmCheckIn({payload: value}, {call, put, select}){

      let param = {
        customerId: value.customerId,
        date: timeToDate(value.startDate)
      };

      const {data: {code, data}} = yield call(roomManagement.confirmReside, param);
      if (code == 0) {
        message.success('入住成功')
        yield put({type: 'monthRoomList'})
      }
    },

    *monthRoomUpdate({payload: value}, {call, put, select}){

      const state = yield select(state => state.roomStatusManagement);


      let param = [];


      if (value && Object.keys(value).length && !value.ConfirmDict && !value.deleteUse && value !== 'load') {
        param = value;
      }
      else {
        let monthRoomUpdateList = state.monthRoomUpdateList = [];
        let oldMonthRoomList = state.oldMonthRoomList;
        let monthRoomList = state.monthRoomList;

        // 第一层, 循环房间
        for (let i = 0; i < oldMonthRoomList.length; i++) {
          monthRoomUpdateList[i] = [];

          let oldRoom = oldMonthRoomList[i].useAndBookingList;
          let room = monthRoomList[i].useAndBookingList;
          // 第二层, 循环日期
          for (let j = 0; j < oldRoom.length; j++) {
            monthRoomUpdateList[i][j] = [];

            let oldUserList = oldRoom[j].customerList;
            let userList = room[j].customerList;

            if (oldUserList.length === 0 && userList.length === 0) {
              continue;
            }

            let copyOldUserList = JSON.parse(JSON.stringify(oldUserList));
            let copyUserList = JSON.parse(JSON.stringify(userList));

            // 先去除已入住的, 此接口不关注已入住的状态
            for (let k = 0; k < copyOldUserList.length; k++) {
              if (copyOldUserList[k].status == 4) {
                copyOldUserList.splice(k--, 1);
              }
            }

            for (let k = 0; k < copyUserList.length; k++) {
              if (copyUserList[k].status == 4) {
                copyUserList.splice(k--, 1);
              }
            }

            // 如果两个集合中都存在, 则说明没有变化, 在集合中删掉
            for (let m = 0; m < copyOldUserList.length; m++) {
              for (let n = 0; n < copyUserList.length; n++) {
                if (copyOldUserList[m].customerId == copyUserList[n].customerId) {
                  copyOldUserList.splice(m--, 1);
                  copyUserList.splice(n--, 1);
                  break;
                }
              }
            }

            // 如果原始集合里有, 新集合里没有, 则是删除
            for (let k = 0; k < copyOldUserList.length; k++) {
              monthRoomUpdateList[i][j].push({
                customerId: copyOldUserList[k].customerId,
                customerName: copyOldUserList[k].customerName,
                date: timeToDate(oldRoom[j].date),
                roomId: oldMonthRoomList[i].roomId,
                roomNo: oldMonthRoomList[i].roomNo,
                status: 0 // 删除
              })
            }

            // 如果原始集合没有, 新集合里有, 则是新增
            for (let k = 0; k < copyUserList.length; k++) {
              monthRoomUpdateList[i][j].push({
                customerId: copyUserList[k].customerId,
                customerName: copyUserList[k].customerName,
                date: timeToDate(oldRoom[j].date),
                roomId: oldMonthRoomList[i].roomId,
                roomNo: oldMonthRoomList[i].roomNo,
                status: 7 // 预约
              })
            }
          }
        }

        // 将[房间][日期][用户]的结构转为[用户,用户]的结构

        for (let i = 0; i < monthRoomUpdateList.length; i++) {
          for (let j = 0; j < monthRoomUpdateList[i].length; j++) {
            for (let k = 0; k < monthRoomUpdateList[i][j].length; k++) {
              param.push(monthRoomUpdateList[i][j][k]);
            }
          }
        }
      }

      try {
        const {data: {code, data}} = yield call(roomManagement.monthRoomUpdate, param);
        if (param === value) {
          yield put({
            type: 'monthRoomList'
          })
        }
        else {
          if (value.ConfirmDict) {
            yield put({
              type: 'confirmCheckIn',
              payload: value.ConfirmDict
            })
          }
          else if (value.deleteUse) {
            yield put({
              type: 'deleteUser',
              payload: value.deleteUse
            })
          }
          else {
            yield put({type: 'monthRoomList'});
          }
        }


        if (state.modalH) {
          yield put({type: 'changeModalH', payload: false});
          if (data) {
            if (typeof data === 'object') {
              let str = ''
              for (let i = 0; i < data.length; i++) {
                str += data[i]
                str += '    '
              }

              Modal.success({
                title: '保存成功',
                content: str
              });

            }
          }
        }

      }
      catch (e) {

      }
    },
    *resideAddOrCut({payload: value}, {call, put}){

      if (resideOperation) {
        try {
          const {data: {code, data}} = yield call(roomManagement.resideAddOrCut, resideOperation);
          message.success('入住信息更新成功')

        }
        catch (err) {
          yield put({type: 'monthRoomList'});
          throw err
        }
      }
    },
    *deleteUser({payload: value}, {call, put}){

      let param = {
        customerId: value.customerId,
        date: timeToDate(value.startDate)
      }

      const {data: {code, data}} = yield call(roomManagement.cancelBooking, param);

      // 调用接口失败
      if (code != 0) {
        return;
      }
      message.success('删除成功')
      // 删除视图中的用户

      yield put({type: 'monthRoomList'});
      yield put({type: 'netroomViewStateChange'});
    },
    // 获取会员身份下拉选项， 也是卡种列表
    *getMemberShipCard({payload: values}, {call, put}) {
      const {data: {data, code}} = yield call(systemService.getMemberShipCard, values);
      if (code == 0) {
        yield put({
          type: 'memberShipCardSave',
          payload: {shipCards: data}
        })
      }
    },


    //客户快速入口（日房态里面的创建客户）
    *fastEntry({payload: values}, {call, put, select}) {

      const {data: {data, code}} = yield call(addCustomerInformation.fastEntry, values);
      if (code == 0) {
        message.success('创建成功')
        yield put({
          type: 'createCustomerVisible',
          payload: false
        })


        const state = yield select(state => state.roomStatusManagement);

        data.customerName = data.name;
        data.customerId = data.id;
        state.monthStateCustomers = state.monthStateCustomers.concat([data])

        yield put({
          type: 'setMonthStatusCustomers',
          payload: {data: state.monthStateCustomers}
        })
      }

    },
    //获取服务器时间
    *getSystemTime({payload: value}, {call, put}){
      const {data: {code, data}} = yield  call(roomManagement.getSystemTime, value);
      if (code == 0) {
        yield put({
          type: 'saveSystemTime',
          payload: {
            data
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chamber/roomstatusindex') {

          dispatch({ type: "dayStatus" });
          if (Object.keys(query).length == 0) {
            dispatch({ type: "getMemberShipCard" });
            dispatch({type:"getSystemTime"});
            dispatch({ type: "listByMain" });
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'LC'
              }
            });
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'ZFL'
              }
            });
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'QY'
              }
            });
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'CX'
              }
            });
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'YCC'
              }
            });
          }
        }

      })
    }
  }
}
