/**
 * 健康档案
 * Created by yangjingjing on 2017/6/1.
 */
import * as healthInformationService from '../services/healthInformation';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'healthInformation',

  state: {
    medicalHealthInformation : null,//医疗健康档案
    nutritionHealthInformation : null,//营养健康档案
    skinHealthInformation : null,//美妍中心
    conclusionInformation : null,//医院小结
    saveDone:false,
    type:null,
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/crm/customer/customerDetails'){
          if(query.dataId){
            for(let i=1 ;i<5; i++){
              dispatch({
                type: 'getHealthInformationListByCustomerId',
                payload:{
                  customerId : query.dataId,
                  type : i
                }
              });
            }
          }
        };
      });
    },
  },
  //异步请求
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *saveHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.saveHealthInformation, values);
      if (code == 0) {
        message.success("创建健康档案成功");
        yield put({type:'setSaveDone',payload:{data}} );
      }
    },
    *updateHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.updateCustomerHealth, values);
      if (code == 0) {
        message.success("修改健康档案成功");
        yield put({type:'setSaveDone',payload:{data}} );
      }
    },
    *getHealthInformationListByCustomerId({payload: values}, { call, put }){
      const {data: { data, code,err} } = yield call(healthInformationService.getHealthInformationListByCustomerId, values);
      if (code == 0) {
        // message.info("根据用户编号查询健康档案成功");
        //console.log("根据用户编号查询健康档案成功==>",data);
        //更新state
        yield put({type:'setHealthInformation',payload:{data,type:values.type}} );
      }
    }
  },
  //同步请求
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setHealthInformation(state, { payload: { data,type }}){
      if(type === 1){
        return { ...state, medicalHealthInformation : data };
      }else if(type === 2){
        return { ...state, nutritionHealthInformation : data };
      }else if(type === 3){
        return { ...state, skinHealthInformation : data };
      }else if(type === 4){
        return { ...state, conclusionInformation : data };
      }
      return {...state};
    },
    setSaveDone(state, { payload: { data }}){
      if(data){
        let healthInfo = JSON.parse(data.healthInfo);
        let saveDone = true;
        let type = data.type;
        if(data.type === 1){
          return {...state,saveDone:saveDone,type:type, medicalHealthInformation : data}
        }else if(data.type === 2){
          return {...state,saveDone:saveDone,type:type, nutritionHealthInformation : data}
        }else if(data.type === 3){
          return {...state,saveDone:saveDone,type:type, skinHealthInformation : data}
        }else if(data.type === 4){
          return {...state,saveDone:saveDone,type:type, conclusionInformation : data}
        }
        return {...state};
      }
      return {...state};
    },
    deleteConclusionInformation(state, { payload: data }){
      let arr = state.conclusionInformation;
      for(var i=0; i<arr.length; i++) {
        if(arr[i].name == data.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,conclusionInformation:arr};
    }
  }

};
