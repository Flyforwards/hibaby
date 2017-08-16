import * as serviceAssessment from '../services/serviceAssessment';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'

export default {
  namespace: 'serviceAssessment',
  state: {

  },
  reducers: {


  },
  effects: {
    //保存或编辑评估
    // 评估类型，1：产妇入住前评估，2：产妇入住评估，3：婴儿入住评估，4：中医见诊记录单，5：营养产后入住评估
    // assessmentInfo (string, optional): 评估内容 ,
    // customerId (integer, optional): 客户id ,
    // id (integer, optional): 主键ID ,
    // type (integer, optional): 评估类型，1：产妇入住前评估，2：产妇入住评估，3：婴儿入住评估，4：中医见诊记录单，5：营养产后入住评估
    *saveAssessment({payload: values}, { call, put }) {
      try {
        const {data: {data,code}} = yield call(serviceAssessment.saveAssessment, values);
        message.success("保存成功");
        console.log(data)
      }
      catch (err){
        console.log(err)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

      })
    }
  },
};
