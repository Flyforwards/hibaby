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
    customerId : 101,
    medicalHealthInformation : null,//医疗健康档案
    nutritionHealthInformation : null,//营养健康档案
    skinHealthInformation : null,//美妍中心
    conclusionInformation : null,//医院小结
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/crm/customer/customerDetails'){
          for(let i=1 ;i<5; i++){
            dispatch({
              type: 'getHealthInformationListByCustomerId',
              payload:{
                customerId : 100,
                type : i
              }
            });
          }
        }
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
        yield put(routerRedux.push("/crm/activity"));
      }else{
        message.error(err);
      }
    },
    *getHealthInformationListByCustomerId({payload: values}, { call, put }){
      const {data: { data, code,err} } = yield call(healthInformationService.getHealthInformationListByCustomerId, values);
      if (code == 0) {
        // message.info("根据用户编号查询健康档案成功");
        console.log("根据用户编号查询健康档案成功==>",data);
        //更新state
        yield put({type:'setHealthInformation',payload:{data}} );
      }else{
        message.error(err);
      }
    }
  },
  //同步请求
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setHealthInformation(state, { payload: { data }}){
      if(data){
        let healthInfo = JSON.parse(data.healthInfo);
        if(data.type === 1){
          return { ...state, medicalHealthInformation : healthInfo };
        }else if(data.type === 2){
          return { ...state, nutritionHealthInformation : healthInfo };
        }else if(data.type === 3){
          return { ...state, skinHealthInformation : healthInfo };
        }else if(data.type === 4){
          return { ...state, conclusionInformation : healthInfo };
        }
        return {...state};
      }
      return {...state};
    },

  },

};
