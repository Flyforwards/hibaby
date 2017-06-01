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

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
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
  },
  //同步请求
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    getHealthInformation(state, { payload: { id }}){
      let healthInformation = { ...state, healthInformationId : id }
      return healthInformation;
    }


  },

};
