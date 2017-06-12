import * as workPlanIndexService from '../services/workPlanIndex';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
export default {
  namespace: 'roomStatusManagement',
  state: {},

  reducers: {
  }
  ,
  effects: {

  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {

      })
    }
  }
}


