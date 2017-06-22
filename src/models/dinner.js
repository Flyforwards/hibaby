
import * as activityService from '../services/activity';
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs';
import * as dinnerService from '../services/dinner';
import * as systemService from '../services/system';
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'dinner',
  state: {
    list: [],
    item: null,
    editItem: null,
    packageList: [],//主套餐列表
    signUserList: [], // 预约用户列表
    editSignUserList: [], // 编辑
    userList: [], // 会员用户列表
    shipCards: [],
    fetusAry: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },

  },

  reducers: {
    //得到餐单打印的基本条例
    getMenuWord(state,{payload:{data}}) {
      let menuCode = [];
    },


    //查询打印餐单信息
    getPrintData(state, {payload: {data: printMsg}}){
      return {...state, printMsg}
    },
    //根据客户Id查询禁忌食材
    getTabooData(state, {payload: {data: tabooData}}){
      return {...state, tabooData}
    },
    // //保存客户禁忌食材
    // setTabooData(state, {payload: {data: saveTabooData}}){
    //   return { ...state, saveTabooData }
    // },
    //根据客户id查询信息
    saveCustomerMsg(state, {payload: {data: customerData}}){
      return {...state, customerData}
    },
    //根据筛选条件查询成单信息客户列表
    saveCustomerList(state, {payload: {list, pagination}}) {
      return {...state, list, pagination: {...state.pagination, ...pagination}};
    },
    //获取服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}){
      return {...state, systemTime}
    },
    memberShipCardSave(state, {payload: {shipCards}}) {
      return {...state, shipCards};
    },
    addMutDictData(state, {payload: todo}){
      if (todo.abName === 'YCC') {
        return {...state, fetusAry: todo.data};
      }
      return {...state};
    },
    setPackageList(state, {payload: todo}){
      return {...state, packageList: todo.data};
    },
  },
  effects: {

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

    // 删除客户
    *deleteCustomer ({payload: values}, {call, put}) {
      const {data: {data, code}} = yield call(customerService.deleteCustomer, values);
      if (code == 0) {
        message.success("删除客户成功");
        yield put({
          type: 'getCustomerPage',
        });
      }
    },
    // // 获取用户列表
    // *getCustomerPage({ payload: values }, { call, put }) {
    //   values = parse(location.search.substr(1));
    //   if (values.page === undefined) {
    //     values.page = 1;
    //   }
    //   if (values.size === undefined) {
    //     values.size = 10;
    //   }
    //   const { data: { data, total, page, size, code } } = yield call(customerService.getCustomerPage, values);
    //   if (code == 0) {
    //     //if(data.length == 0 && page > 1){
    //     //  yield put(routerRedux.push(`/crm/customer?page=${page -1}&size=10`))
    //
    //     //}else{
    //       yield put({
    //         type: 'saveCustomerList',
    //         payload: {
    //           list: data,
    //           pagination: {
    //             current: Number(page) || 1,
    //             pageSize: Number(size) || 10,
    //             total: total,
    //           },
    //         },
    //       })
    //     }
    //
    //   }
    // },

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

    *listByMain({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(customerService.listByMain);
      if (code == 0) {
        yield put({
          type: 'setPackageList',
          payload: {
            data: data,
          }
        });
      }
    },

    //查询客户餐单打印信息
    *getPrintMsg({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(dinnerService.getPrintMsg, value);
      if (code == 0) {
        yield put({
          type: 'getPrintData',
          payload: {
            data,
          }
        });
      }
    },
    //根据客户Id查询禁忌食材
    *getTabooFood({payload: value}, {call, put}){
      const dataId = queryURL("dataId");
      const values = {...value, dataId}
      const {data: {code, data}} = yield call(dinnerService.getTabooFood, values);
      if (code == 0) {
        yield put({
          type: 'getTabooData',
          payload: {
            data,
          }
        });
      }
    },
    //保存客户禁忌食材
    *setTabooFood({payload: value}, {call, put}){
      const {data: {code}} = yield call(dinnerService.saveTabooFood, value);
      if (code == 0) {
        message.success("保存成功");
        history.go(-1);
        yield put({
          type: 'getTabooFood',
        })
      }
    },
    //根据客户Id查询客户信息
    *getCustomerMsg({payload: value}, {call, put}){
      const {data: {code, data}} = yield call(dinnerService.getCustomerById, value);
      if (code == 0) {
        yield put({
          type: "saveCustomerMsg",
          payload: {
            data,
          }
        })
      }
    },
    //根据筛选条件查询成单客户基本信息列表
    *getCustomerList({payload: values}, {call, put}){
      values = parse(location.search.substr(1));
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const {data: {data, total, page, size, code}} = yield call(dinnerService.getCustomerList, values);
      if (code == 0) {
        // if(data.length == 0 && page > 1){
        //   yield put(routerRedux.push(`/crm/customer?page=${page -1}&size=10`))
        //
        // }else{
        yield put({
          type: 'saveCustomerList',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
        //  }
      }
    },
    //获取服务器时间
    *getSystemTime({payload: values}, {call, put}){
      const {data: {code, data}} = yield  call(dinnerService.getSystemTime, values);
      if (code == 0) {
        yield put({
          type: 'saveSystemTime',
          payload: {
            data,
          }
        })
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if (pathname === '/meals/nutritionist/dinner') {
          dispatch({
            type:'getCustomerList',
          })
          //dispatch({type: 'getCustomerPage',});
          dispatch({type: 'listByMain',});
          dispatch({type: 'getMemberShipCard',});
          dispatch({ type: 'getDataDict',payload:{"abName": 'YCC',}});
        }
        if(pathname === '/meals/nutritionist/taboo/export') {
          dispatch({
            type:'getSystemTime',
          })
        }
        if(pathname === '/print'){
          dispatch({
            type:'getSystemTime',
          })
        }
        if(pathname === '/meals/nutritionist/taboo'){
          //禁忌
          dispatch({
            type:"getTabooFood",
            payload:{
              "dataId":query.dataId,
            }
          });
          dispatch({
            type:"getCustomerMsg",
            payload:{
              "dataId":query.dataId,
            }
          });
        }
      })
    }
  },
};
