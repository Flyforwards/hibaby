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
          for (let i = 1; i < 6; i++) {
            let dictTwo = { ...query, type: i, operatorItem: i }
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
        }
        if (pathname === '/service/child-check-in/detail' || pathname === '/service/child-check-in/edit') {
          let dict = { ...query, type: 3, operatorItem: 3 }
          dispatch({ type: 'getAssessmentByCustomerId', payload: dict });
        }
      });
    }
  },
  effects: {
    //根据客户id 得到婴儿信息
    *getBabymsgByCustomerId({paylaod:values},{call,put}){
      const {data:{data,code}} = yield call(serviceAssessment.getBabymsgByCustomerId,values);
      if(code == 0){
        yield put({
          type:'onSaveBabyMsg',
          paylaod:{
            data
          }
        })
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
      const { data:{ data,code}} = yield call(serviceAssessment.getBabyDataById,values);
      if(code == 0) {
        yield put({
          type:'onSaveBabyDataById',
          payload:{
            data
          }
        })
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
    const { data:{ data,code}} = yield call(serviceAssessment.onSaveBabyData,values);
         if(code == 0) {
           message.success("保存成功")
           yield put(routerRedux.push('/service/child-check-in'))
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

  },
  reducers: {
    //g根据客户id 得到婴儿信息
    onSaveBabyMsg(state,{payload:{data:BabyMsg}}){
      return { ...state,BabyMsg}
    },
    //根据客户id获取婴儿评估保存
    onSaveBabyAllData(state,{payload:{data:BabyAllData}}){
      return { ...state,BabyAllData }
    },
    //根据id查询婴儿入住评估详情
    onSaveBabyDataById(state,{payload:{data:BabyOneData}}){
      return { ...state, BabyOneData }
    },
    removeData(state, { payload: todo }){
      return {
        ...state,
        ChildCheckInData: null,
        ChildCheckInID: null,
      }
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
