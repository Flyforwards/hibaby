/**
 * 菜品管理
 * Created by yangjingjing on 2017/6/1.
 */
import * as dishesService from '../services/dishes';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'dishes',

  state: {

  },
  //加载页面
  subscriptions: {

  },
  //调用服务器端接口
  effects: {
    //获取组织架构的列表
    *getNodesList({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(dishesService.getDepartmentNodes, values);
      if (code == 0) {
        yield put({
          type: 'getNodesList',
          payload: {
            data,
            code
          }
        });
      }
    },

  },
  //同步请求，更新state
  reducers: {

  }

};
