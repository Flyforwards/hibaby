/**
 * Created by Flyforwards on 2017/6/1.
 */

import * as cardService from '../services/membershipcard';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'membershipcard',
  state: {
    fetching:false,
    activeKey:"1",
    chargeVisible:false,
    commonVisible:{},
    trigger: false,
    timeDate:'',
    postValues: {},
    getSuccess:false,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
    renewRecordPagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
    refundRecordPagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
  },
  reducers: {
    //分页
    getCardPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    setAddCustomerTab(state, { payload: todo }){
      return {...state,getSuccess:todo};
    },
    //续费记录分页
    getRenewPageSave(state, { payload: { list, renewRecordPagination }}) {
      return {...state, list, renewRecordPagination: {  ...state.renewRecordPagination,...renewRecordPagination }};
    },
    //退费记录分页
    getRefundPageSave(state, { payload: { list, refundRecordPagination }}) {
      return {...state, list, refundRecordPagination: {  ...state.refundRecordPagination,...refundRecordPagination }};
    },

    // getCardInfo(state, { payload: { data: cardInfo, total } }) {
    //   let getCardInfo = { ...state, cardInfo, total }
    //   return getCardInfo;
    // },
    //
    //
    // postCard(state, { payload: { values: postValues } }){
    //   let postCardInfo = { ...state, postValues }
    //   return postCardInfo;
    // },
    //会员卡信息
    cardKindInfo(state, { payload: { data: cardKind } }){
      let cardKindInfo = { ...state, cardKind }
      return cardKindInfo;
    },

    //余额信息
    cardBalanceInfo(state, { payload: { data: cardBalance } }){
      let cardBalanceInfo = { ...state, cardBalance }
      return cardBalanceInfo;
    },

    //会员卡级别
    levelInfo(state, { payload: { data: level } }){
      let levelInfo = { ...state, level }
      return levelInfo;
    },
    //
    //扣费记录
    FeeDuction(state, { payload: { data: feeRecord } }){
      let FeeDuctionInfo = { ...state, feeRecord }
      return FeeDuctionInfo;
    },

    //续费记录
    renewRecord(state, { payload: { data: renewRecord } }){
      let renewRecordInfo = { ...state, renewRecord }
      return renewRecordInfo;
    },
    //退费记录
    refundRecord(state, { payload: { data: refundRecord } }){
      let refundRecordInfo = { ...state, refundRecord }
      return refundRecordInfo;
    },
    //销卡
    cancelCardInfo(state, { payload: { data: cancelCardCode } }){
      let cancelCardInfo = { ...state, cancelCardCode }
      return cancelCardInfo;
    },
    //扣费
    getReturnState(state, { payload: { data: codeValue } }){
      return { ...state, codeValue,chargeVisible:false, }
    },

    //改变状态
    switchChargeState(state) {
      return {
        ...state,
        chargeVisible: !state.chargeVisible,
      }
    },
    //改变状态 commonModal
    switchCommonState(state, {payload: {commonVisible, trigger}}) {
      return {
        ...state,
        commonVisible,
        trigger
      }
    },

    //商品信息
    goodsInfo(state, { payload: { data: goodsInfoList } }){
      let goodsInfo = { ...state, goodsInfoList,fetching:false, }
      return goodsInfo;
    },
    //打印基础信息
    savePrintBaseMsg(state, {payload: {data: printBaseMsg}}){
      return { ...state, printBaseMsg }
    },
    //服务器时间
    saveSystemTime(state, {payload: {data: systemTime}}){
      return { ...state, systemTime }
    },
    //某日账单时间
    getTimeDate(state, {payload: {data: timeDates}}){
      const times = new Date(timeDates).format("yyyy年MM月dd日")
      return { ...state, times }
    },
    //某日账单时间
    getTimeDates(state, {payload: {data: startTims}}){
      if(startTims.startTime == startTims.endTime) {
        const times = new Date(startTims.startTime).format("yyyy年MM月dd日")
        return { ...state, times }
      }else{
        const times = `${new Date(startTims.startTime).format("yyyy年MM月dd日")} - ${new Date(startTims.endTime).format("yyyy年MM月dd日")}`
        return { ...state, times }
      }
    },
    //保存打印账单信息
    savePrintAccount(state, {payload: {data: printList}}){
      return { ...state, printList }
    },
  //改变tab值
    getChangeTabKey(state, {payload: {activeKeys}}){
      return {
        ...state,
        activeKey:activeKeys ,
      }
    },


  },
  effects: {
    //销卡
    *cancelCard({ payload: values }, { call, put,select }) {
      const { data: { code,data,err } } = yield call(cardService.cancelCard, values);
      const {type} = values;
      let {commonVisible, trigger} = yield select(state => state.membershipcard);
      if (commonVisible[type] == undefined) {
        commonVisible[type] = 0;
      }
      if (code == 0) {
        message.success("销卡成功")
        commonVisible[type] = commonVisible[type] + 1;
        yield put({
          type:'switchCommonState',
          payload: {commonVisible, trigger: !trigger}
        });
        yield put({
          type:'cancelCardInfo',
          payload: {
            data
          }
        });
        yield put({
          type:'getRefundRecord',
          payload: {
            "page":1,
            "size":10,
            "sortField": "refundTime ",
            "sortOrder": "AESC"
          }
        });
        yield put({
          type:'getCardInfo',
        });
        yield put({
          type:'getBalanceInfo',
        });
        yield put({
          type:'getChangeTabKey',
          payload:{
            activeKeys:"3",
          }
        });
      }
    },
    //退费
    *returnsAmount({ payload: values }, { call, put, select }) {
      const { data: { code,data,err } } = yield call(cardService.returnsAmount, values);
      const {type} = values;
      let {commonVisible, trigger} = yield select(state => state.membershipcard);
      if (commonVisible[type] == undefined) {
        commonVisible[type] = 0;
      }
      if (code == 0) {
        message.success("退费成功")
        commonVisible[type] = commonVisible[type] + 1;
        yield put({
          type:'switchCommonState',
          payload: {commonVisible, trigger: !trigger}
        });
        //退费记录
        yield put({
          type:'getRefundRecord',
          payload: {
            "page":1,
            "size":10,
            "sortField": "refundTime ",
            "sortOrder": "AESC"
          }
        });

        yield put({
          type:'getCardInfo',
        });
        yield put({
          type:'getBalanceInfo',
        });
        yield put({
          type:'getChangeTabKey',
          payload:{
            "activeKeys":"3",
          }
        });
      }
    },

    //续费
    *renewAmount({ payload: values }, { call, put, select }) {
      const { data: { code,data,err } } = yield call(cardService.renewAmount, values);
      const {type} = values;
      let {commonVisible, trigger} = yield select(state => state.membershipcard);
      if (commonVisible[type] == undefined) {
        commonVisible[type] = 0;
      }
      if (code == 0) {
        message.success("续费成功")
        commonVisible[type] = commonVisible[type] + 1;
        //退费记录
        yield put({
          type:'getRenewRecord',
          payload: {
            "page":1,
            "size":10,
            "sortField": "refundTime ",
            "sortOrder": "AESC"
          }
        });

        yield put({
          type:'getCardInfo',
        });
        yield put({
          type:'getBalanceInfo',
        });
        yield put({
          type:'switchCommonState',
          payload: {commonVisible, trigger: !trigger}
        });
        yield put({
          type:'getChangeTabKey',
          payload:{
            activeKeys:"2",
          }
        });
        yield put({
          type:'addCustomer/getCustomerExtendById',
        });
      }
    },

    //扣费
    *getFeeDeduction({ payload: values }, { call, put, select }) {
      const { data: { code, data,err } } = yield call(cardService.chargingAmount, values);
      if (code == 0) {
          message.success("已购买")
        yield put({
          type:'switchChargeState',
        })
        yield put({
          type:'getFeeDuctionRecord',
          payload:{
            "page":1,
            "size":10,
            "sortField": "deductionTime",
            "sortOrder": "AESC"
          }
        })
        yield put({
          type:'getCardInfo',
        });
        yield put({
          type:'getBalanceInfo',
        });
        yield put({
          type:'getChangeTabKey',
          payload:{
            "activeKeys":"1",
          }
        });
      }
    },

    //查询扣费记录
    *getFeeDuctionRecord({ payload:values }, { call,put,select }){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId

      const value = {...values, customerId}
      const { data: { code, data ,page,size,total} } = yield call(cardService.getDeductionRecord, value);
      if ( code == 0) {
        yield put({
          type:'FeeDuction',
          payload: {
            data
          }
        });
        yield put({
          type: 'getCardPageSave',
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

    //查看续费记录
    *getRenewRecord({ payload:values }, { call,put,select}){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId
      const value = { ...values,customerId}
      const { data: { code, data ,page,size,total} } = yield call(cardService.getRenew, value);
      if ( code == 0) {
        yield put({
          type:'renewRecord',
          payload: {
            data
          }
        });
        yield put({
          type: 'getRenewPageSave',
          payload: {
            list: data,
            renewRecordPagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },

    //查看退费记录
    *getRefundRecord({ payload:values }, { call, put, select }){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId
      const value = { ...values,customerId}
      const { data: { code, data ,page,size,total} } = yield call(cardService.getRefund, value);
      if ( code == 0) {
        yield put({
          type:'refundRecord',
          payload: {
            data
          }
        });
        yield put({
          type: 'getRefundPageSave',
          payload: {
            list: data,
            refundRecordPagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },
    //查询客户会员卡信息
    *getCardInfo({ payload: values }, { call, put,select }) {
      const state = yield select(state => state.addCustomer);
      const dataId = state.dataDetailId
      const value = {...values, dataId}
      const { data: { code, data,} } = yield call(cardService.getCustomerMembershipcard, value);
      if (code == 0) {
        yield put({
          type: 'cardKindInfo',
          payload: {
            data,
          }
        });
      }
    },
    //查询余额信息
    *getBalanceInfo({ payload: values }, { call, put, select }) {
      const state = yield select(state => state.addCustomer);
      const dataId = state.dataDetailId
      const value = {...values, dataId}
      const { data: { code, data,} } = yield call(cardService.getCustomerBalance, value);
      if (code == 0) {
        yield put({
          type: 'cardBalanceInfo',
          payload: {
            data,
          }
        });
      }
    },

    //获取会员卡级别
    *getLevelInfo({ payload: values }, { call, put }) {
      const { data: { code, data } } = yield call(cardService.getLevel, values);
      if (code == 0) {
        yield put({
          type: 'levelInfo',
          payload: {
            data
          }
        });
      }
    },

    //获取商品信息
    *getGoodsList({ payload: values },{ call, put,select }){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId
      const value = {...values, customerId}
      const { data: {code,data,err}} = yield call(cardService.getGoodsList,value);
      if(code == 0) {
        yield put({
          type:'goodsInfo',
          payload: {
            data
          }
        })
      }
    },
    //获取打印基础信息
    *getPrintBaseMsg({payload:values},{call,put,select}){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId
      const value = {...values, customerId}
      const { data: { code,data}} = yield call(cardService.getPrintBaseMsg,value);
      if(code == 0){
        yield put({
          type:'savePrintBaseMsg',
          payload:{
            data
          }
        })
        yield put({
          type:'getTimeDates',
          payload:{
            data:values,
          }
        })
        // yield put({type:'setAddCustomerTab',payload:true});
      }
    },
    //服务器时间
    *getSystemTime({payload:value},{call,put}){
      const { data: { code,data}} = yield  call(cardService.getSystemTime,value);
      if(code == 0) {
        yield put({
          type:'saveSystemTime',
          payload:{
            data
          }
        });
        yield put({
          type:'getPrintBaseMsg',
          payload:{
            "startTime":new Date(data).format('yyyy-MM-dd'),
            "endTime":new Date(data).format('yyyy-MM-dd'),
          }
        })
        yield put({
          type:'getPrintAccount',
          payload:{
            "startTime":new Date(data).format('yyyy-MM-dd'),
            "endTime":new Date(data).format('yyyy-MM-dd'),
          }
        })
        yield put({
          type:'getTimeDates',
          payload:{
          data
          }
        })
      }
    },

    //获取账单打印信息
    *getPrintAccount({payload:values},{call,put,select}){
      const state = yield select(state => state.addCustomer);
      const customerId = state.dataDetailId
      const value = {...values, customerId}
      const { data: { code,data}} = yield  call(cardService.getPrintAccountList,value);
      if(code == 0) {
        yield put({
          type:'savePrintAccount',
          payload:{
            data
          }
        });
      }
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if(pathname === '/crm/customer/printPage'){
          // dispatch({
          //   type:'getPrintBaseMsg',
          //   payload:{
          //     startTime:new Date().format('yyyy-MM-dd'),
          //     endTime:new Date().format('yyyy-MM-dd')
          //   }
          // })
          dispatch({
            type:'getSystemTime',
          })
        }
      })
    }
  }
}


