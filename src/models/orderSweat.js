/**
 * Created by Flyforwards on 2017/9/10.
 */
import * as customerService from '../services/customer';
import * as serviceAssessment from '../services/serviceAssessment';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import * as orderSweat from '../services/orderSweat';
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
    total: 0,
    page: 1,
    size: 10,
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {

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
  },
  reducers: {
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
