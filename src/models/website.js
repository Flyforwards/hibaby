/**
 * Created by Administrator on 2017/7/11.
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { local,session } from 'common/util/storage.js';
import { parse } from 'qs';
import * as websiteBanner from '../services/website';

export default {
  namespace:websiteBanner,
  state:{

  },
  reducers:{

  },
  effects:{
    //新增banner图
    *addBanner({payload,values},{call,put}){
      const {data:{data, code}} =yield call(websiteBanner.addBanner,values);
      if(code == 0) {
          message.success("添加成功");
      }
    },
  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {

      })
    }
  }
}
