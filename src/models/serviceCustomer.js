/**
 * Created by yangjingjing on 2017/8/16.
 */
import * as customerService from '../services/customer';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';

import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {
  namespace: 'serviceCustomer',
  state : {
    customerPageList : [],//客户信息分页数据
    total : 0,
    page : 1,
    size : 10,
    packageList:[],//主套餐列表
    shipCards:[],
    fetusAry:[],
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {

      });
    }
  },
  effects: {
    //获取客户信息分页数据
    *getCustomerPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        //更新state
        yield put({type:'setCustomerPageList',payload:{data,total,page,size}} );
      }
    },
    *listByMain({ payload: value },{ call, put }){
      const { data: { code, data } } = yield call(customerService.listByMain);
      if (code == 0) {
        yield put({
          type: 'setPackageList',
          payload: {
            data:data,
          }
        });
      }
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

    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        abName:value.abName,
        softDelete: 0,
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {
        console.log("data",data);
        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
            data:data,
          }
        });
      }
    },
  },
  reducers: {
    setCustomerPageList(state, { payload: {data: customerPageList, total, page, size} }){
      let customerData = {
        ...state,
        customerPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? customerPageList.length : (page - 1) * 10 + customerPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...customerData,range}
    },
    setPackageList(state, { payload: todo }){
      return {...state,packageList:todo.data};
    },
    memberShipCardSave(state, { payload: { shipCards }}) {
      return {...state, shipCards};
    },
    addMutDictData(state, { payload: todo }){
      if(todo.abName === 'YCC'){
        return {...state,fetusAry:todo.data};
      }
      return {...state};
    },
    clearAllProps(state){
      return { ...state,page : 1}
    }
  }

}
