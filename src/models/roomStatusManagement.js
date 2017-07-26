import * as roomManagement from '../services/roomManagement';
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
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

/**
 * 获取某月天数
 * @param year
 * @param month
 * @returns {number}
 */
const getDays = (year, month) => {
  return (new Date(year, month, 0)).getDate();
};

let resideOperation = '';

export default {
  namespace: 'roomStatusManagement',
  state: {
    packageAry: [],
    roomList: '',
    selectValue: ['all', '0', '1', '2', '3', '4', '5', '6', '7'],
    shipCards:[],
    resultsRowHouses: '',
    dayStatusData: '',
    FloorAry: '',
    MainFloorAry: '',
    // 入住率
    occupancy:'',
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
    dateSelectList: [
      {year:moment().format('YYYY'),monthList:function (){
      const month = moment().format('M');
      let ary = [month];
      if(parseInt(month) + 1 <= 12){
        ary.push((parseInt(month) + 1).toString())
      }
      if(parseInt(month) + 2 <= 12){
        ary.push((parseInt(month) + 2).toString())
      }
      return(ary)
    }()
    }
    ],
    dateRulerList: [],
    floorSelect:null,
    dateSelectViews: [],
    //可编辑的  添加客户  加入的
    monthRoomUpdateList: [],// 保存状态有更新的用户
    //弹出的modal数据控制

    CustomerVisible: false,
    RowHousesVisible: false,
    RowHousesWayVisible: false,
    allCusList: '',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  reducers: {
    memberShipCardSave(state, { payload: { shipCards }}) {
      return {...state, shipCards};
    },
    setFloorSelect(state, {payload: data}) {
      return {...state,floorSelect:data };
    },
    setCustomerVisible(state, {payload: data}) {
      let dict = {CustomerVisible: data};
      return {...state, ...dict};
    },
    setRowHousesVisible(state, {payload: data}) {
      let dict = {RowHousesVisible: data};
      if (data === false) {
        dict.resultsRowHouses = ''
      }
      return {...state, ...dict};
    },
    setRowHousesWayVisible(state, {payload: data}) {
      return {...state, RowHousesWayVisible: data};
    },
    setCustomerPageSave(state, {payload: {list, pagination}}) {
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
      return {...state, allCusList: list, defSelectCustomers: ary, pagination: {...state.pagination, ...pagination}};
    },
    setSelectValue(state, {payload: todo}){

      let listArray = [];
      if (state.dayStatusData) {
        for (let i = 0; i < state.dayStatusData.roomList.length; i++) {
          const dict = state.dayStatusData.roomList[i];
          if(dict.isRepair == 1){
            if(todo.data.indexOf('1') != -1){
              listArray.push(dict);
            }
            continue;
          }
          for (let j = 0; j < todo.data.length; j++) {
           if (dict.status == todo.data[j]){
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
      else if (todo.abName === 'YCC') {
        return {...state, fetusAry: todo.data};
      }
      return {...state};
    },
    setResultsRowHouses(state, {payload: todo}){
      return {...state, resultsRowHouses: todo.data};
    },
    setRoomViewState(state, {payload: todo}){
      return {...state, roomState: !todo ? 'day' : 'month'};
    },
    setMonthStatusCustomers(state, {payload: todo}){
      return {
        ...state,
        monthStateCustomers: todo.data,
      };
    },

    setMonthRoomData(state, {payload:todo}){
      const {list,rate} = todo.data
      // 保留初始的数据, 用于保存预约状态时和当前状态比较, 深拷贝
      state.oldMonthRoomList = JSON.parse(JSON.stringify(list));

      return {...state, monthRoomList: list,occupancy:rate};
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

    userDragStart(state, {payload: data}){
      return {
        ...state,
        dragUser: data.dragUser,
      }
    },

    selectedYearChange(state, {payload: data}){
      let dateSelectList = state.dateSelectList;

      if (!state.dateSelectList[data.selectViewIndex]) {
        state.dateSelectList[data.selectViewIndex] = {
          monthList: [],
          year: state.defaultYear,
        }
      }

      state.dateSelectList[data.selectViewIndex].year = data.selectedYear;

      return {
        ...state,
        dateSelectList: dateSelectList,
      }
    },

    selectedMonthChange(state, {payload: data}){
      let dateSelectList = state.dateSelectList;

      if (!dateSelectList[data.selectViewIndex]) {
        dateSelectList[data.selectViewIndex] = {
          monthList: [],
          year: state.defaultYear,
        }
      }

      dateSelectList[data.selectViewIndex].monthList = data.selectedMonthList;

      return {
        ...state,
        dateSelectList: dateSelectList,
      }
    },



    deleteUserReducer(state, {payload: data}) {
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
              status,
            })
          }

          resideOperation.push({ "customerId": customerId,
            "customerName": customerName,
            "date":moment(room[j].date).format(),
            "roomId": roomId,
            "status": 4})

        }
      } else {
        for (let j = startIndex + 1; j <= endIndex; j++) {
          let customerList = room[j].customerList;
          for (let k = 0; k < customerList.length; k++) {
            if (customerList[k].customerId == customerId) {
              customerList.splice(k--, 1);
              resideOperation.push({ "customerId": customerId,
                "customerName": customerName,
                "date":moment(room[j].date).format(),
                "roomId": roomId,
                "status": 0})
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

      if(status == 4){

      }

      return {
        ...state,
        monthRoomList: monthRoomList
      }
    },
    addDateSelectView(state, {payload: data}){
      let dateSelectViews = state.dateSelectViews;
      dateSelectViews.push(data.dateSelectView);
      return {
        ...state,
        dateSelectViews: dateSelectViews
      }
    },

    deleteDateSelectView(state, {payload: data}){

      let dateSelectViews = state.dateSelectViews;

      let dateSelectList = state.dateSelectList;

      delete dateSelectList[data.index ]

      delete dateSelectViews[data.index -1]

      return {
        ...state,
        dateSelectViews: dateSelectViews,
        dateSelectList: dateSelectList,
      }
    },

    updateDateRulerList(state, {payload: data}) {

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
            days: getDays(year, month),
          })
        }
      }

      return {
        ...state,
        dateRulerList: dateRulerList,
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
                total: total,
              },
            },
          })
        }

      }
    },

    *netroomViewStateChange({payload: value}, {call, put,select}){
      const state = yield select(state => state.roomStatusManagement);
      const {dateSelectList,floorSelect} = state;

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
          monthList: Object.keys(years[year]),
        })
      }

      if (!param.length) {
        message.error("请选择时间");
        return;
      }


      let dict = {yearList:param}

      if(floorSelect){
        dict.floor = floorSelect;
      }

        const {data: {code, data}} = yield call(roomManagement.getMonthStatusCustomers,dict);

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
    },

    *monthRoomList({payload: value}, {call, put, select}){
      const state = yield select(state => state.roomStatusManagement);
      const {dateSelectList,floorSelect} = state;

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
          monthList: Object.keys(years[year]),
        })
      }

      if (!param.length) {
        message.error("请选择时间");
        return;
      }


      let dict = {yearList:param}

      if(floorSelect){
        dict.floor = floorSelect;
      }
      const {data: {data}} = yield call(roomManagement.getMonthRoomList, dict);

      yield put({
        type: 'updateDateRulerList',
        payload: {
          data: param,
        }
      });

      yield put({
        type: 'setMonthRoomData',
        payload: {
          data: data,
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
          toRoomName: state.monthRoomList[value.roomIndex].roomNo,
        };

        const {data: {code, data}} = yield call(roomManagement.resideMove, param);

        // 平移不成功, 返回
        if (code != 0) {
          return;
        }
      }

          if(state.dragUser.roomIndex == -1){
            const {data: {code, data}} = yield call(roomManagement.extendRoomUse, {roomId:state.monthRoomList[value.roomIndex].roomId,customerId:state.dragUser.customerId,});
            if (code == 0){
              if(data.status == 1){
                yield put({type: 'monthRoomUpdate',payload:'load'});
              }
              else {
                let payload = {
                  ...value,
                  status: state.dragUser.status,
                };

                if (state.dragUser.status == 4) {
                  payload.dayIndex = state.dragUser.startIndex;
                }

                // 添加新的
                yield put({
                  type: 'userDropReducer',
                  payload: {
                    ...payload,
                  }
                });

                if(state.dragUser.status !== 7){
                  yield put({type: 'monthRoomUpdate',payload:'load'});
                }
              }
            }
            else {
              return
            }
          }
          else{

            // 不是新拖入的, 删除之前的
            yield put({
              type: 'deleteUserReducer',
              payload: {
                ...value,
                startIndex: state.dragUser.startIndex,
                endIndex: state.dragUser.endIndex,
                customerId: state.dragUser.customerId,
                roomIndex: state.dragUser.roomIndex,
                status: state.dragUser.status,
              }
            });

            let payload = {
              ...value,
              status: state.dragUser.status,
            };

            if (state.dragUser.status == 4) {
              payload.dayIndex = state.dragUser.startIndex;
            }

            // 添加新的
            yield put({
              type: 'userDropReducer',
              payload: {
                ...payload,
              }
            });

            if(state.dragUser.status !== 7){
              yield put({type: 'monthRoomUpdate',payload:'load'});
            }
          }
    },

    *confirmCheckIn({payload: value}, {call, put, select}){

      let param = {
        customerId: value.customerId,
        date: timeToDate(value.startDate),
      };

      const {data: {code, data}} = yield call(roomManagement.confirmReside, param);
      if (code == 0) {
        message.success('入住成功')
        yield put({type: 'monthRoomList',})
      }
    },

    *monthRoomUpdate({payload: value}, {call, put, select}){

      const state = yield select(state => state.roomStatusManagement);


      let param = [];


      if (value && Object.keys(value).length && !value.ConfirmDict && !value.deleteUse && value !== 'load') {
          param = value;
      }
      else{
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
                status: 0, // 删除
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
                status: 7, // 预约
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

      const {data: {code, data}} = yield call(roomManagement.monthRoomUpdate, param);

      if (code == 0) {
        // 更新原始集合的状态
        message.success('保存成功')
        if(param === value){
          yield put({
            type: 'monthRoomList',
          })
        }
        else {
          if(value.ConfirmDict){
            yield put({
              type: 'confirmCheckIn',
              payload:value.ConfirmDict
            })
          }
          if(value.deleteUse){
            yield put({
              type: 'deleteUser',
              payload:value.deleteUse
            })
          }
          if(value === 'load'){
            yield put({type: 'monthRoomList'});
          }
        }

      }

    },
    *resideAddOrCut({payload: value}, {call, put}){

      if(resideOperation) {
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
        date: timeToDate(value.startDate),
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
    *getMemberShipCard({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(systemService.getMemberShipCard, values);
      if (code == 0) {
        yield put({
          type: 'memberShipCardSave',
          payload: { shipCards: data }
        })
      }
    },
  },


  subscriptions: {
    setup({dispatch, history})
    {
      return history.listen(({pathname, query}) => {
        if (pathname === '/chamber/roomstatusindex') {
          dispatch({type:"dayStatus"});
          if (Object.keys(query).length == 0) {
            dispatch({type:"getMemberShipCard"});
            dispatch({type:"listByMain"});
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
            dispatch({
              type: 'getDataDict',
              payload: {
                "abName": 'YCC',
              }
            });
          }
        }

      })
    }
  }
}


