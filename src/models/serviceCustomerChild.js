/**
 * Created by Flyforwards on 2017/8/29.
 */
import * as customerService from '../services/customer';
import * as serviceAssessment from '../services/serviceAssessment';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import moment from  'moment'
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'serviceCustomerChild',
  state: {
    customerPageList: [],//客户信息分页数据
    total: 0,
    page: 1,
    size: 10,
    packageList: [],//主套餐列表
    shipCards: [],
    fetusAry: [],
    PuerperaBodyList: [],
    babyNursingList: [],//婴儿护理记录列表
    InsideBabySwimList: null,//对内婴儿游泳记录集合
    describeInfo: [],
    query: {},
    describeChildrenInfo:[],
    describeDiagnosisInfo:[],
    describeObstetricInfo:[],
    describePuerperaInfo:[],
    describeButlerInfo:[],
    describeNutritionInfo:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (query.customerid) {
          let dict = { dataId: query.customerid }
          dispatch({ type: 'getCustomerInfoByCustomerId', payload: dict });
        }
        if (pathname === '/service/customer/detail') {
            let dictTwo = {dataId:query.customerid, type: 3, operatorItem: 3 }
            dispatch({ type: 'getChilddataBycustomerId', payload: dictTwo });
        }
        if (pathname === '/service/child-check-in/detail') {
          let dict = { dataId: query.customerid, type: 3, operatorItem: 3 }
          dispatch({type:'getBabymsgByCustomerId',payload:dict})
          //dispatch({ type: 'getChilddataBycustomerId', payload: dict });

        }
        if(pathname === '/service/child-check-in/edit') {
          if(queryURL('id')){
            let dict = { dataId: query.customerid, type: 3, operatorItem: 3 }
            dispatch({type:'getBabymsgByCustomerId',payload:dict})
            dispatch({
              type:'getBabyDataById',
              payload:{
                "dataId":queryURL('id'),
                "operatorItem":3,
                "babyId":queryURL('babyId')
              }
            })
          }else{

          }
        }
      });
    }
  },
  effects: {
    //根据客户id 得到婴儿信息
    *getBabymsgByCustomerId({payload:values},{call,put}){
      const {data:{data,code}} = yield call(serviceAssessment.getBabymsgByCustomerId,values);
      if(code == 0){
        yield put({
          type:'onSaveBabyMsg',
          payload:{
            data
          }
        })
        if(data.length > 0){
          yield put({
            type:'getChilddataBycustomerId',
            payload:{
              'dataId': values.dataId,
              'type': 3,
              'operatorItem': 3
            }
          })
        }else{
          message.error("没有婴儿信息")
          yield put(routerRedux.push('/service/child-check-in'))
        }
      }
    },
    //根据客户id查询查询婴儿入住详情
    *getChilddataBycustomerId({ payload: values},{call, put}){
      const { data:{data,code}} = yield call(serviceAssessment.getBabydataByCustomerid,values);
      if(code == 0) {
          yield put({
            type:'onSaveBabyAllData',
            payload:{
              data
            }
          })
      }
    },
    //根据id查询婴儿入住评估详情
    *getBabyDataById({payload:values},{call,put}) {
      try {
        const { data:{ data,code}} = yield call(serviceAssessment.getBabyDataById,values);
        if(code == 0) {
          yield put({
            type:'onSaveBabyDataById',
            payload:{
              data
            }
          })
        }
      }
      catch (err){
        message.error(err.message)
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/child-check-in/detail?customerid=${query.customerid}`))
      }

    },
  //根据Id 删除婴儿入住评估
    *onDeleteBabydata({payload:values},{call,put}) {
      const {data:{data,code}} = yield call(serviceAssessment.onDeleteBabydata,values);
        if(code == 0) {
          message.success("删除成功")
          yield put(routerRedux.push('/service/child-check-in'))
        }
    },
  //保存或者编辑婴儿入住评估
  *onSaveBabyData({payload:values},{call, put}){
    const { data:{ data,code,err}} = yield call(serviceAssessment.onSaveBabyData,values);
         if(code == 0) {
           message.success("保存成功")
           yield put(routerRedux.push('/service/child-check-in'))
         }else{
           message.error(err)
         }
    },

    *getCustomerInfoByCustomerId({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getCustomerInfoByCustomerId, values);
        yield put({
          type: 'savaCustomerInfo',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    *getDataDict({ payload: value }, { call, put }){
      const parameter = {
        abName: value.abName,
        softDelete: 0
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict, parameter);
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

  },
  reducers: {
    //g根据客户id 得到婴儿信息
    onSaveBabyMsg(state,{payload:{data:BabyMsg}}){
      return { ...state,BabyMsg}
    },
    //根据客户id获取婴儿评估保存
    onSaveBabyAllData(state,{payload:{data:BabyAllData}}){
      if(BabyAllData.length>1){
        let BabyId =BabyAllData[0].babyId;
        let hostId = BabyAllData[0].id;
        return { ...state,BabyAllData ,BabyId,hostId}
      }else{
        return { ...state,BabyAllData ,BabyId:BabyAllData[0].babyId,hostId:BabyAllData[0].id}
      }
    },
    //根据id查询婴儿入住评估详情
    onSaveBabyDataById(state,{payload:{data:BabyOneData}}){
      return { ...state, BabyOneData }
    },
    removeData(state, { payload: data }){
      return {
        ...state,
        BabyAllData: null,
        BabyId: null,
        hostId:null,
        BabyOneData:null,
        baseInfoDict: null,
      }
    },
    savaCustomerInfo(state, { payload: todo }){
      return { ...state, baseInfoDict: todo }
    },
    addMutDictData(state, { payload: todo }){
      if (todo.abName === 'YCC') {
        return { ...state, fetusAry: todo.data };
      }
      else if (todo.abName === 'YC') {
        return { ...state, gravidityAry: todo.data };
      }
      return { ...state };
    }
  }

}
